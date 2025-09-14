//Código elaborado por Zam (Azamijs)

require('./settings.js')
const { default: makeWASocket,  generateWAMessage,  downloadContentFromMessage,  emitGroupParticipantsUpdate,  emitGroupUpdate,  /* makeInMemoryStore, */  prepareWAMessageMedia, MediaType,  WAMessageStatus, AuthenticationState, GroupMetadata, initInMemoryKeyStore, MiscMessageGenerationOptions,  useMultiFileAuthState, BufferJSON,  WAMessageProto,  MessageOptions,	 WAFlag,  WANode,	 WAMetric,	 ChatModification,  MessageTypeProto,  WALocationMessage,  ReconnectMode,  WAContextInfo,  proto,	 WAGroupMetadata,  ProxyAgent,	 waChatKey,  MimetypeMap,  MediaPathMap,  WAContactMessage,  WAContactsArrayMessage,  WAGroupInviteMessage,  WATextMessage,  WAMessageContent,  WAMessage,  BaileysError,  WA_MESSAGE_STATUS_TYPE,  MediaConnInfo,   generateWAMessageContent, URL_REGEX,  Contact, WAUrlInfo,  WA_DEFAULT_EPHEMERAL,  WAMediaUpload,  mentionedJid,  processTime,	 Browser,  MessageType,  Presence,  WA_MESSAGE_STUB_TYPES,  Mimetype,  relayWAMessage,	 Browsers,  GroupSettingChange,  delay,  DisconnectReason,  WASocket,  getStream,  WAProto,  isBaileys,  AnyMessageContent,  generateWAMessageFromContent, fetchLatestBaileysVersion,  processMessage,  processingMutex,  jidDecode,  areJidsSameUser } = require('@whiskeysockets/baileys')
let pino = require('pino')
const path = require('path');
const fs = require('fs')
const axios = require('axios')
const { exec, spawn, execSync } = require('child_process')
const speed = require('performance-now')
const chalk = require('chalk')
const cfonts = require('cfonts')
const os = require('os')
const yargs = require('yargs/yargs')
const _ = require('lodash')
const moment = require('moment')
const gradient = require('gradient-string')
const readline = require('readline')
const { tmpdir } = require('os')
const { join } = require('path')
const Datastore = require('@seald-io/nedb');
const PhoneNumber = require('awesome-phonenumber')
const { smsg, sleep } = require('./lib/func')
const { readdirSync, statSync, unlinkSync } = require('fs')
const { say } = cfonts

const color = (text, color) => {
  return !color ? chalk.green(text) : color.startsWith('#') ? chalk.hex(color)(text) : chalk.keyword(color)(text)
}

const question = (text) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout })
  return new Promise((resolve) => {
    rl.question(text, (ans) => { rl.close(); resolve(ans) })
  })
}

const usePairingCode = true
const girastamp = speed()
const latensi = speed() - girastamp

// --- makeInMemoryStore fallback safe (no reassign to const) ---
let makeInMemoryStoreFactory = (typeof (/*maybe undefined*/ require('@whiskeysockets/baileys').makeInMemoryStore) === 'function')
  ? require('@whiskeysockets/baileys').makeInMemoryStore
  : null

if (makeInMemoryStoreFactory === null) {
  console.warn('[WARN] makeInMemoryStore no existe en esta versión de Baileys. Usando fallback mínimo.')
  makeInMemoryStoreFactory = (opts = {}) => {
    const store = {
      chats: new Map(),
      contacts: new Map(),
      messages: new Map(),
      bind: (ev) => {}, // no-op
      readFromFile: async () => {},
      writeToFile: async () => {},
      toJSON: () => ({
        chats: Object.fromEntries(store.chats),
        contacts: Object.fromEntries(store.contacts),
        messages: Object.fromEntries(store.messages)
      }),
      fromJSON: (json) => {
        if (!json) return
        try {
          if (json.chats) store.chats = new Map(Object.entries(json.chats))
          if (json.contacts) store.contacts = new Map(Object.entries(json.contacts))
          if (json.messages) store.messages = new Map(Object.entries(json.messages))
        } catch { }
      }
    }
    try {
      if (opts.logger && typeof opts.logger.info === 'function') {
        opts.logger.info('[store-fallback] iniciado')
      }
    } catch { }
    return store
  }
}

const store = makeInMemoryStoreFactory({ logger: pino().child({ level: 'silent', stream: 'store' }) })

async function connectToWhatsApp() {
  // useMultiFileAuthState espera una ruta (string) por session; asumo que settings.js define global.session
  if (!global.session) global.session = 'session' // fallback por si no existe
  const { state, saveCreds } = await useMultiFileAuthState(global.session)
  const { version, isLatest } = await fetchLatestBaileysVersion()

  const colores = chalk.bold.white
  const opcionQR = chalk.blueBright
  const opcionTexto = chalk.cyan
  const marco = chalk.yellow
  const nameb = chalk.blue.bgBlue.bold.cyan
  const methodCodeQR = process.argv.includes('qr')
  const MethodMobile = process.argv.includes('mobile')

  say('MagnosBot', {
    align: 'center',
    colors: false,
    background: 'transparent',
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: '0',
    gradient: ['blue', 'red'],
    independentGradient: false,
    transitionGradient: false,
    rawMode: true,
    env: 'node'
  })
    
  let opcion
  // CORRECCIÓN: usar global.session en lugar de session (no definida)
  if (!fs.existsSync(path.join('.', global.session, 'creds.json')) && !methodCodeQR) {
    while (true) {
      opcion = await question(marco('*************************\n') + nameb('MagnosBot\n') + marco('*************************\n') + colores('Seleccione una opción:\n') + opcionQR('1. Con código QR\n') + opcionTexto('2. Con código de emparejamiento\n'))
      if (opcion === '1' || opcion === '2') {
        break
      } else {
        console.log(chalk.redBright('Por favor, seleccione solo 1 o 2.'))
      }
    }
  }
  console.info = () => {}
  const client = makeWASocket({
    version,
    logger: pino({ level: 'silent'}),
    printQRInTerminal: opcion == '1' ? true : false,
    qrTimeout: 180000,
    browser: ['Ubuntu', 'Edge', '20.0.04'],
    auth: state
  })
  if (opcion === '2') {
    if (usePairingCode && !client.authState.creds.registered) {
      const phoneNumber = await question(chalk.blueBright('Ingrese su número de WhatsApp todo junto\n') + chalk.greenBright('Ejemplo: 521729999\n'))
      console.log(phoneNumber)
      const code = await client.requestPairingCode(phoneNumber.replace(/\D/g, '').trim())
      console.log(chalk.bold.cyanBright(`Codigo de emparejamiento:`), chalk.bold.white(`${code}`))
    }
  }

  client.decodeJid = (jid) => {
    if (!jid) return jid
    if (/:\d+@/gi.test(jid)) {
      let decode = jidDecode(jid) || {}
      return decode.user && decode.server && decode.user + '@' + decode.server || jid
    } else return jid
  }
  client.ev.on('chats.set', () => {
    console.log('Estableciendo conversaciones...')
  })
  client.ev.on('contacts.set', () => {
    console.log('Estableciendo contactos...')
  })
  client.ev.on('creds.update', saveCreds)
  client.ev.on('messages.upsert', async ({ messages }) => {
    try {
      let m = messages[0]
      if (!m || !m.message) return
      m.message = (Object.keys(m.message)[0] === 'ephemeralMessage') ? m.message.ephemeralMessage.message : m.message
      if (m.key && m.key.remoteJid === 'status@broadcast') return
      // CORRECCIÓN: client.public check y message type check
      if (!client.public && !m.key.fromMe && m.messageStubType === 'notify') return
      if (m.key.id && m.key.id.startsWith('BAE5') && m.key.id.length === 16) return
      m = smsg(client, m)
      require('./main')(client, m, messages)
    } catch (err) {
      console.log(err)
    }
  })
    
  // Base de datos con NeDB (colecciones ya definidas)
  global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
  const dbPath = path.join(__dirname, 'database');
  if (!fs.existsSync(dbPath)) fs.mkdirSync(dbPath);

  // Crear las colecciones (tablas) de NeDB
  const collections = {
    users: new Datastore({ filename: path.join(dbPath, 'users.db'), autoload: true }),
    chats: new Datastore({ filename: path.join(dbPath, 'chats.db'), autoload: true }),
    settings: new Datastore({ filename: path.join(dbPath, 'settings.db'), autoload: true }),
    msgs: new Datastore({ filename: path.join(dbPath, 'msgs.db'), autoload: true }),
    sticker: new Datastore({ filename: path.join(dbPath, 'sticker.db'), autoload: true }),
    stats: new Datastore({ filename: path.join(dbPath, 'stats.db'), autoload: true }),
  };

  // Inicializar global.db.data con valores predeterminados
  global.db = {
    data: {
      users: {},
      chats: {},
      settings: {},
      msgs: {},
      sticker: {},
      stats: {},
    },
  };

  // Leer datos desde NeDB
  async function readFromNeDB(category, id) {
    return new Promise((resolve) => {
      collections[category].findOne({ _id: id }, (err, doc) => {
        if (err) {
          console.error(`Error leyendo de ${category}/${id}:`, err);
          resolve({}); // Devuelve un objeto vacío si hay un error
        } else {
          resolve(doc ? doc.data : {});
        }
      });
    });
  }

  // Escribir datos a NeDB
  async function writeToNeDB(category, id, data) {
    return new Promise((resolve) => {
      collections[category].update(
        { _id: id },
        { _id: id, data },
        { upsert: true },
        (err) => {
          if (err) {
            console.error(`Error escribiendo en ${category}/${id}:`, err);
          }
          resolve();
        }
      );
    });
  }

  // Cargar datos desde NeDB al iniciar
  global.db.loadDatabase = async function () {
    for (const category of Object.keys(collections)) {
      collections[category].find({}, (err, docs) => {
        if (err) {
          console.error(`Error cargando ${category}:`, err);
        } else {
          docs.forEach((doc) => {
            global.db.data[category][doc._id] = doc.data;
          });
        }
      });
    }

    // Asegurar valores predeterminados si la base de datos está vacía
    const myJid = client?.user?.jid || 'global'
    if (!global.db.data.settings[myJid]) {
      global.db.data.settings[myJid] = {
        status: 0,
        self: false,
        autobio: true,
      };
      await writeToNeDB('settings', myJid, global.db.data.settings[myJid]);
    }
    console.log('Base de datos NeDB cargada en memoria');
  };

  // Guardar datos en NeDB periódicamente
  global.db.save = async function () {
    for (const category of Object.keys(global.db.data)) {
      for (const [id, data] of Object.entries(global.db.data[category])) {
        await writeToNeDB(category, id, data);
      }
    }
    console.log('Datos guardados en NeDB exitosamente.');
  };

  // Cargar la base de datos al iniciar
  await global.db.loadDatabase().then(() => {
    console.log('Base de datos lista');
  }).catch(err => {
    console.error('Error cargando base de datos:', err);
  });

  setInterval(async () => {
    await global.db.save();
  }, 30000);

  process.on('SIGINT', async () => {
    await global.db.save();
    console.log('Base de datos guardada antes de cerrar');
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    await global.db.save();
    console.log('Base de datos guardada antes de cerrar');
    process.exit(0);
  });

  function clearTmp() {
    const tmp = [tmpdir(), join(__dirname, './tmp')]
    const filename = []
    tmp.forEach((dirname) => {
      try {
        readdirSync(dirname).forEach((file) => filename.push(join(dirname, file)))
      } catch (e) { /* ignore dirs that don't exist or permissions */ }
    })
    return filename.map((file) => {
      try {
        const stats = statSync(file)
        if (stats.isFile() && (Date.now() - stats.mtimeMs >= 1000 * 60 * 3)) {
          return unlinkSync(file)
        }
      } catch (e) {}
      return false
    })
  }

  if (!global.opts['test']) { 
    setInterval(async () => { 
      if (global.opts['autocleartmp'] && (global.support || {}).find) {
        const tmpArr = [os.tmpdir(), 'tmp']
        tmpArr.forEach((filename) => spawn('find', [filename, '-amin', '3', '-type', 'f', '-delete']))
      }
    }, 30 * 1000)
  }

  setInterval(async () => {
    await clearTmp()
    console.log(chalk.blueBright(`\nBasura eliminada\n`))
  }, 180000)

  const fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=:\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
    
  client.ev.on('groups.update', async (json) => {
    try {
      const res = json[0]
      // Uso res.id en lugar de 'anu'
      if (!res) return
      if (res.announce == true) {
        await sleep(2000)
        let ppgroup
        try {
          ppgroup = await client.profilePictureUrl(res.id, 'image')
        } catch (err) {
          ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
        }
        let text = `🍟 *¡Ahora solo los administradores pueden enviar mensajes!*`
        await client.sendMessage(res.id, { text }, { quoted: fkontak })
      } else if (res.announce == false) {
        await sleep(2000)
        let ppgroup
        try {
          ppgroup = await client.profilePictureUrl(res.id, 'image')
        } catch (err) {
          ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
        }
        let text = `🍟 *Ahora todos los participantes pueden mandar mensajes*`
        await client.sendMessage(res.id, { text }, { quoted: fkontak })
      } else if (res.restrict == true) {
        await sleep(2000)
        let ppgroup
        try {
          ppgroup = await client.profilePictureUrl(res.id, 'image')
        } catch (err) {
          ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
        }
        let text = `🍟 *Ahora solo los administradores pueden editar la información del grupo*`
        await client.sendMessage(res.id, { text }, { quoted: fkontak })
      } else if (res.restrict == false) {
        await sleep(2000)
        let ppgroup
        try {
          ppgroup = await client.profilePictureUrl(res.id, 'image')
        } catch (err) {
          ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
        }
        let text = `🍟 *Ahora todos los usuarios pueden editar la información del grupo*`
        await client.sendMessage(res.id, { text }, { quoted: fkontak })
      } else if (res.desc && res.desc !== '') {
        await sleep(2000)
        let ppgroup
        try {
          ppgroup = await client.profilePictureUrl(res.id, 'image')
        } catch (err) {
          ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
        }
        let text = `🍟 *¡Se ha modificado la descripción!*\n\n- Nueva descripción:\n${res.desc}`
        await client.sendMessage(res.id, { text }, { quoted: fkontak })
      } else {
        await sleep(2000)
        let ppgroup
        try {
          ppgroup = await client.profilePictureUrl(res.id, 'image')
        } catch (err) {
          ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
        }
        let text = `🍟 *¡Se ha modificado el título del grupo!*\n\n- Nuevo nombre:\n${res.subject}`
        await client.sendMessage(res.id, { text }, { quoted: fkontak })
      }
    } catch (e) {
      console.log('Error groups.update handler:', e)
    }
  })

  client.ev.on('group-participants.update', async (anu) => {
    try {
      // CORRECCIÓN: revisar configuración por group (usar anu.id)
      if (global.db && global.db.data && global.db.data.chats && global.db.data.chats[anu.id] && global.db.data.chats[anu.id].welcome) {
        try {
          let metadata = await client.groupMetadata(anu.id)
          let participants = anu.participants
          for (let num of participants) {
            let ppuser, ppgroup
            try {
              ppuser = await client.profilePictureUrl(num, 'image')
            } catch {
              ppuser = 'https://qu.ax/OEgX.jpg'
            }
            try {
              ppgroup = await client.profilePictureUrl(anu.id, 'image')
            } catch {
              ppgroup = 'https://qu.ax/OEgX.jpg'
            }
            if (anu.action == 'add') {
              await client.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `Hola *@${num.split('@')[0]}* Bienvenido a *${metadata.subject}*`})
            } else if (anu.action == 'remove') {
              // acción remove: podrías agregar una despedida si quieres
            } else if (anu.action == 'promote') {
              let usuario = anu.author
              await client.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num, usuario], caption: `🚩 *@${num.split('@')[0]}* Ha sido ascendido al rol de *administrador* en este grupo.\n\n> Acción hecha por @${usuario.split("@")[0]}`})
            } else if (anu.action == 'demote') {
              let usuario = anu.author
              await client.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num, usuario], caption: `🚩 *@${num.split('@')[0]}* Ha sido removido de su rol de *administrador* en este grupo.\n\n> Acción hecha por @${usuario.split("@")[0]}`})
            }
          }
        } catch (err) {
          console.log(err)
        }
      }
    } catch (e) { console.log(e) }
  })

  // utilidades de envío
  client.sendText = (jid, text, quoted = '', options) => client.sendMessage(jid, { text: text, ...options }, { quoted })
  client.sendContactArray = (jid, data, quoted, options) => client.sendMessage(jid, { contacts: { displayName: (Array.isArray(data[0]) ? data[0][1] : data.length > 1 ? '2013 kontak' : data[0].displayName) || null, contacts: (Array.isArray(data[0]) ? data : [data]).map(([number, name, isi, isi1, isi2, isi3, isi4, isi5]) => ({ vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:${name.replace(/\n/g, '\\n')}\nitem.ORG:${isi}\nitem1.TEL;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}\nitem1.X-ABLabel:${isi1}\nitem2.EMAIL;type=INTERNET:${isi2}\nitem2.X-ABLabel:📧 Email\nitem3.ADR:;;${isi3};;;;\nitem3.X-ABADR:ac\nitem3.X-ABLabel:📍 Region\nitem4.URL:${isi4}\nitem4.X-ABLabel:Website\nitem5.X-ABLabel:${isi5}\nEND:VCARD`.trim(), displayName: name })) }}, { quoted, ...options })

  client.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, receivedPendingNotifications, isNewLogin } = update
    console.log(receivedPendingNotifications)

    if (connection == 'connecting') {
      console.log('🚀 Iniciando...')
    }

    if (connection === 'close') {
      // lastDisconnect puede ser undefined, usar optional chaining
      const shouldReconnect = (lastDisconnect?.error?.output?.statusCode) !== DisconnectReason.loggedOut
      console.log(`Reconectando...`)
      if (shouldReconnect) {
        connectToWhatsApp()
      } else {
        console.log('No reconectando: sesión cerrada (loggedOut).')
      }
    }

    if (update.isNewLogin) {
      console.log(chalk.yellow(`Primer inicio de sesión exitoso`))
    }

    if (connection == 'open') {
      console.log(color('Fecha', '#009FFF'),
        color(moment().format('DD/MM/YY HH:mm:ss'), '#A1FFCE'),
        color(`\n☁️ Conectado correctamente al WhatsApp.\n`, '#7fff00')
      );
      console.log(receivedPendingNotifications);

      try {
        await global.db.loadDatabase()
        console.log('Base de datos lista');
      } catch (err) {
        console.error('Error cargando base de datos:', err);
      }

      // joinChannels puede fallar si global.ch no existe
      try {
        await joinChannels(client);
      } catch (e) {
        console.log('No se pudo unir a canales (joinChannels):', e)
      }
    }
  });

  // Guardar cada 30 segundos
  setInterval(async () => {
    await global.db.save();
    console.log("Datos guardados en la base de datos exitosamente.");
  }, 30000);

  // quitar llamadas a db.close() porque no usas SQLite en este script (usar NeDB)
  process.on('SIGINT', async () => {
    await global.db.save();
    console.log('Base de datos guardada antes de cerrar (SIGINT)');
    process.exit(0);
  });
  process.on('SIGTERM', async () => {
    await global.db.save();
    console.log('Base de datos guardada antes de cerrar (SIGTERM)');
    process.exit(0);
  });

  client.public = true
  store.bind(client.ev)
  client.ev.on('creds.update', saveCreds)
  process.on('uncaughtException', console.log)
  process.on('unhandledRejection', console.log)
  // process.on('RefenceError', console.log) // evento mal escrito, no necesario
}

connectToWhatsApp()

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright(`Update ${__filename}`))
  delete require.cache[file]
  require(file)
})

async function joinChannels(client) {
  if (!global.ch) return
  for (const channelId of Object.values(global.ch)) {
    await client.newsletterFollow(channelId).catch(() => {})
  }
}