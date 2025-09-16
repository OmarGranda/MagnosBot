
const fs = require('fs')
const os = require('os')
const path = require('path')
const axios = require('axios')
const { exec, spawn, execSync} = require('child_process')
const speed = require('performance-now')
const chalk = require('chalk')
const _ = require('lodash')
const moment = require('moment')
const gradient = require('gradient-string')
const crypto = require('crypto')
const Jimp = require('jimp')
const fetch = require('node-fetch')
const { performance } = require('perf_hooks')
const osu = require('node-os-utils')
const PhoneNumber = require('awesome-phonenumber')
const yts = require('yt-search')
const ytdl = require('ytdl-core')
const FormData = require('form-data')
const { youtubedl, youtubedlv2 } = require('@bochilteam/scraper')
const {
  generateWAMessageFromContent,
  proto,
  generateWAMessageContent,
  prepareWAMessageMedia,
  downloadContentFromMessage,
  areJidsSameUser,
  getContentType
} = require('@whiskeysockets/baileys')

const {
  smsg,
  getGroupAdmins,
  clockString,
  sleep,
  getBuffer,
  runtime,
  fetchJson,
  isUrl
} = require('./lib/func')

require('./settings.js')

const msgs = (message = '') => {
  if (typeof message !== 'string') message = String(message || '')
  return message.length >= 10 ? message.substring(0, 500) : message
}

function formatBytes(bytes) {
  if (!bytes) return '0 Bytes'
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i]
}

function randomInt(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function ensureUser(jid) {
  if (!global.db) global.db = { data: { users: {}, chats: {}, settings: {} } }
  if (!global.db.data.users[jid]) {
    global.db.data.users[jid] = {
      exp: 0,
      level: 1,
      coin: 100,
      registered: false,
      name: jid.split('@')[0],
      pareja: null,
      inventory: {},
      cooldowns: {}
    }
  }
  return global.db.data.users[jid]
}

function giveExp(jid, amount = 1) {
  const u = ensureUser(jid)
  u.exp += amount
  const need = u.level * 100
  if (u.exp >= need) {
    u.level += 1
    u.exp = u.exp - need
    return true
  }
  return false
}

module.exports = client = async (client, m, messages, store) => {
  try {

    if (!m) return

    const { type, quotedMsg, mentioned, now, fromMe } = m
    var body = (
      m.mtype === 'conversation' ? m.message.conversation :
      m.mtype === 'imageMessage' ? m.message.imageMessage.caption :
      m.mtype === 'videoMessage' ? m.message.videoMessage.caption :
      m.mtype === 'extendedTextMessage' ? m.message.extendedTextMessage.text :
      m.mtype === 'buttonsResponseMessage' ? m.message.buttonsResponseMessage.selectedButtonId :
      (m.message.listResponseMessage && m.message.listResponseMessage.singleSelectReply && m.message.listResponseMessage.singleSelectReply.selectedRowId && m.message.listResponseMessage.singleSelectReply.selectedRowId.startsWith('.')) ?
        m.message.listResponseMessage.singleSelectReply.selectedRowId :
      m.mtype === 'templateButtonReplyMessage' ? m.message.templateButtonReplyMessage.selectedId :
      m.mtype === 'messageContextInfo' ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply?.selectedRowId || m.text) :
      ''
    )

    m.isBot = (
      (m.id && (m.id.startsWith('Lyru-') || m.id.startsWith('EvoGlobalBot-') || m.id.startsWith('FizzxyTheGreat-'))) ||
      (m.id && m.id.startsWith('BAE5') && m.id.length === 16) ||
      (m.id && m.id.startsWith('3EB0') && (m.id.length === 12 || m.id.length === 20 || m.id.length === 22)) ||
      (m.id && m.id.startsWith('B24E') && m.id.length === 20)
    )
    if (m.isBot) return
    if (m.id && m.id.startsWith('NJX-')) return

    var prefa = global.prefa ?? false
    var prefix = prefa ? (/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : '') : (global.prefix ?? '.')

    var command = (body || '').slice(prefix.length).trim().split(/\s+/)[0]?.toLowerCase() || ''
    var args = body.trim().split(/\s+/).slice(1)
    const pushname = m.pushName || 'Sin nombre'
    const text = args.join(' ')
    const q = args.join(' ')
    const quoted = m.quoted || m
    const mime = (quoted.msg || quoted).mimetype || ''
    const isMedia = /image|video|sticker|audio/.test(mime)
    const from = m.key.remoteJid
    const sender = m.isGroup ? (m.key.participant || m.participant) : m.key.remoteJid
    
    const groupMetadata = m.isGroup ? await client.groupMetadata(from).catch(() => ({})) : {}
    const groupName = m.isGroup ? groupMetadata.subject : ''
    const participants = m.isGroup ? groupMetadata.participants : []
    const groupAdmins = m.isGroup ? getGroupAdmins(participants) : []
    const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
    const isCreator = global.owner ? global.owner.some(([num]) => (num || '').replace(/[^0-9]/g, '') + '@s.whatsapp.net' === m.sender) : false
    const isbot = await client.decodeJid(client.user?.id || client.user?.jid || '')

    const fkontak = {
      key: { participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `0@s.whatsapp.net` } : {}) },
      message: {
        'contactMessage': {
          'displayName': `${pushname}`,
          'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${pushname},;;;\nFN:${pushname}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
        }
      }
    }

    ensureUser(m.sender)
    if (!global.db.data.chats) global.db.data.chats = {}
    if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = { welcome: true, antilink: false, antifake: false, detect: true, mute: false }


    if (m.message) {
      const fecha = chalk.bold.magentaBright(`\nFecha: ${chalk.whiteBright(moment().format('DD/MM/YY HH:mm:ss'))}`)
      const mensaje = chalk.bold.greenBright(`\nMensaje: ${chalk.whiteBright(msgs(m.text || body || ''))}`)
      const usuario = chalk.bold.blueBright(`\nUsuario: ${chalk.yellowBright(pushname)}`)
      const remitente = chalk.bold.redBright(`\nRemitente: ${gradient('deepskyblue', 'darkorchid')(sender)}`)
      const grupo = m.isGroup ? chalk.bold.cyanBright(`\nGrupo: ${chalk.greenBright(groupName)}\nID: ${gradient('violet', 'midnightblue')(from)}`) : chalk.bold.redBright('\nChat privado\n')
      console.log(`${fecha}${mensaje}${usuario}${remitente}${grupo}`)
    }
    
    if (m.mtype === 'interactiveResponseMessage') {
      let msg = m.message[m.mtype] || m.msg
      if (msg.nativeFlowResponseMessage && !m.isBot) {
        let { id } = JSON.parse(msg.nativeFlowResponseMessage.paramsJson || '{}') || {}
        if (id) {
          let emit = {
            key: { ...m.key },
            message: { extendedTextMessage: { text: id } },
            pushName: m.pushName,
            messageTimestamp: m.messageTimestamp || Date.now()
          }
          return client.ev.emit('messages.upsert', { messages: [emit], type: 'notify' })
        }
      }
    }

    // ANTI-LINK
    if (global.db.data.chats[m.chat]?.antilink && groupMetadata) {
      const linksProhibidos = {
        'telegram': /telegram\.me|t\.me/gi,
        'facebook': /facebook\.com/gi,
        'whatsapp': /chat\.whatsapp\.com/gi,
        'youtube': /youtu\.be|youtube\.com/gi
      }
      const vl = (mensaje, tiposEnlaces) => {
        for (let tipo of tiposEnlaces) if (mensaje.match(linksProhibidos[tipo])) return true
        return false
      }
      const EnlacesProhibidos = ['whatsapp', 'telegram']
      if (vl((m.text || body || ''), EnlacesProhibidos)) {
        if (!groupAdmins.includes(isbot)) return m.reply('El bot no es admin, no puede eliminar intrusos')
        let gclink = `https://chat.whatsapp.com/` + await client.groupInviteCode(m.chat).catch(() => '')
        let isgclink = new RegExp(gclink, 'i').test(m.text || body || '')
        if (isgclink) return client.sendMessage(m.chat, { text: `El enlace pertenece a *${groupName}*` }, { quoted: m })
        if (isAdmins) return client.sendMessage(m.chat, { text: 'No puedo eliminar a un administrador' }, { quoted: m })
        await client.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant } }).catch(() => {})
        client.sendMessage(from, { text: `Anti Enlaces\n\n@${m.sender.split('@')[0]} mandaste un enlace prohibido`, contextInfo: { mentionedJid: [sender] } }, { quoted: m }).catch(() => {})
        client.groupParticipantsUpdate(m.chat, [m.sender], 'remove').catch(() => {})
      }
    }

    if (global.db.data.chats[m.chat]?.antifake && !isAdmins) {
      const forbidPrefixes = ['965', '966', '971', '974', '212', '213', '216', '44', '1', '62', '61', '64', '353', '33', '32', '41', '352', '377', '351', '244', '258', '91']
      for (let pfx of forbidPrefixes) {
        if (m.sender.startsWith(pfx)) {
          await m.reply('*Anti Fakes* activo').catch(() => {})
          client.groupParticipantsUpdate(m.chat, [m.sender], 'remove').catch(() => {})
        }
      }
    }

    switch (command) {

      case 'traducir':
      case 'translate':
      case 'tr': {
        const translate = require('@vitalets/google-translate-api')
        if (!args || !args[0]) return m.reply('Ingrese el *código* del idioma y el *texto* a traducir\nEjemplo: .translate es Hello')
        let lang = args[0]
        let txt = args.slice(1).join(' ')
        if (!txt && m.quoted?.text) txt = m.quoted.text
        if (!txt) return m.reply('Texto no encontrado')
        try {
          const res = await translate(txt, { to: lang })
          await m.reply(res.text)
        } catch (e) {
          if (global.lolkey) {
            try {
              const resp = await fetch(`https://api.lolhuman.xyz/api/translate?apikey=${global.lolkey}&text=${encodeURIComponent(txt)}&to=${lang}`)
              const js = await resp.json()
              if (js && js.result) return m.reply(js.result)
            } catch (er) { /* ignore */ }
          }
          m.reply('Error traduciendo: ' + String(e))
        }
      } break

      case 'hd':
      case 'remini':
      case 'calidad': {
        if (!m.quoted) return m.reply(`Responde a una imagen con ${prefix + command}`)
        if (!isMedia) return m.reply('El contenido no es una imagen válida')
        await m.reply('`Cargando imagen para mejorar...`')
        try {
         
          const stream = await downloadContentFromMessage(quoted, 'image')
          let buffer = Buffer.from([])
          for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk])
          await client.sendMessage(m.chat, { image: buffer, caption: `🔧 Calidad procesada (placeholder)` }, { quoted: m })
        } catch (e) {
          m.reply('Error procesando imagen: ' + String(e))
        }
      } break

      case 'ia':
      case 'chatgpt': {
        if (!text) return m.reply(`Envía lo que quieras preguntar. Ejemplo: ${prefix}ia ¿Qué es Node.js?`)
        try {
          client.sendPresenceUpdate('composing', from).catch(() => {})
          if (!global.apis) return m.reply('API de IA no definida en settings.js')
          // Ejemplo: usar apis.dorratz (si tienes) - fallback a simple respuesta
          const res = await fetch(`${global.apis}/ia/gptweb?text=${encodeURIComponent(text)}`).catch(() => null)
          if (res) {
            const j = await res.json().catch(() => null)
            if (j?.data) return m.reply(String(j.data))
          }
          m.reply('Respuesta (demo): ' + text)
        } catch (e) {
          m.reply('Error IA: ' + String(e))
        }
      } break

      case 'deepseek':
      case 'ia3': {
        if (!text) return m.reply(`Envía la consulta. Ejemplo: ${prefix}deepseek ¿Historia de Perú?`)
        try {
          client.sendPresenceUpdate('composing', from).catch(() => {})
          const r = await axios.get(`https://archive-ui.tanakadomp.biz.id/ai/deepseek?text=${encodeURIComponent(text)}`).catch(() => null)
          m.reply(r?.data?.result || 'Sin respuesta valida')
        } catch (e) {
          m.reply('Error DeepSeek: ' + String(e))
        }
      } break

      case 'gemini': {
        if (!text) return m.reply(`Envía la consulta. Ejemplo: ${prefix}gemini ¿Tema?`)
        try {
          client.sendPresenceUpdate('composing', from).catch(() => {})
          const r = await fetch(`https://api.dorratz.com/ai/gemini?prompt=${encodeURIComponent(text)}`).catch(() => null)
          const j = r ? await r.json().catch(() => null) : null
          m.reply(j?.message || 'Sin respuesta')
        } catch (e) { m.reply('Error Gemini: ' + String(e)) }
      } break

      case 'copilot':
      case 'bing': {
        if (!text) return m.reply(`Envía la consulta. Ejemplo: ${prefix}copilot ¿Tema?`)
        try {
          client.sendPresenceUpdate('composing', from).catch(() => {})
          const r = await fetch(`https://api.dorratz.com/ai/bing?prompt=${encodeURIComponent(text)}`).catch(() => null)
          const j = r ? await r.json().catch(() => null) : null
          m.reply(j?.result?.ai_response || 'Sin respuesta')
        } catch (e) { m.reply('Error Copilot: ' + String(e)) }
      } break

      case 'google':
      case 'googleit': {
        if (!text) return m.reply(`Usar: ${prefix}google qué es node.js`)
        try {
          const res = await fetch(`https://delirius-apiofc.vercel.app/search/googlesearch?query=${encodeURIComponent(text)}`).catch(() => null)
          const j = res ? await res.json().catch(() => null) : null
          if (j?.status && j.data?.length) {
            let teks = `*‹* Google Search *›*\n\n`
            for (let r of j.data) {
              teks += `· *${r.title}*\n${r.url}\n${r.description}\n\n────────────────\n`
            }
            return client.sendMessage(m.chat, { text: teks }, { quoted: m })
          }
          const googleIt = require('google-it')
          let results = await googleIt({ query: text }).catch(() => [])
          let teks = `*‹* Google *›*\n\n`
          for (let i = 0; i < Math.min(5, results.length); i++) {
            const r = results[i]
            teks += `\`${i + 1}\` *${r.title}*\n${r.link}\n${r.snippet}\n\n`
          }
          client.sendMessage(m.chat, { text: teks }, { quoted: m })
        } catch (e) {
          m.reply('Error Google: ' + String(e))
        }
      } break

      // ---------- YT SEARCH ----------
      case 'yts':
      case 'ytsearch': {
        if (!text) return m.reply(`Usa: ${prefix}yts nombre del video`)
        try {
          let res = await yts(text)
          const arr = res.all || []
          if (!arr.length) return m.reply('No se encontraron resultados')
          const first = arr[0]
          let txt = `Título: ${first.title}\nDuración: ${first.timestamp}\nVistas: ${first.views}\nUrl: ${first.url}`
          const thumb = await getBuffer(first.image).catch(() => null)
          await client.sendMessage(m.chat, { image: thumb || undefined, caption: txt }, { quoted: m })
        } catch (e) { m.reply('Error YTSearch: ' + String(e)) }
      } break

      // ---------- MENU ----------
      case 'menu':
      case 'help':
      case 'allmenu': {
        const userId = m.sender
        const texto = `
╭━━━〔 𝗠𝗔𝗚𝗡𝗢𝗦𝗕𝗢𝗧 〕━━⬣
┃ Usuario: @${userId.split('@')[0]}
┃ Prefijo: ${prefix}
┃ RAM usada: ${formatBytes(os.totalmem() - os.freemem())}
┃ RAM total: ${formatBytes(os.totalmem())}
╰━━━━━━━━━━━━━━━━━━━━⬣

╭───────────────✧
│   ‣ 𝙄𝙣𝙛𝙤𝙧𝙢𝙖𝙘𝙞𝙤𝙣 🤖
│   ╰┈➤ ${prefix}sc
│   ╰┈➤ ${prefix}ping
│   ╰┈➤ ${prefix} peedtest
╰───────────────✧
╭───────────────✧
│   ‣ 𝙊𝙣 / 𝙊𝙛𝙛 🚫
│   ╰┈➤ ${prefix}on
│   ╰┈➤ ${prefix}off
╰───────────────✧
╭───────────────✧
│  ‣ 𝘽𝙪𝙨𝙘𝙖𝙙𝙤𝙧𝙚𝙨 🔎
│  ╰┈➤ ${prefix}google
│  ╰┈➤ ${prefix}ia
╰───────────────✧
╭───────────────✧
│  ‣ 𝙃𝙚𝙧𝙧𝙖𝙢𝙞𝙚𝙣𝙩𝙖𝙨 ⚙️
│  ╰┈➤ ${prefix}hd
│  ╰┈➤ ${prefix}traducir
╰───────────────✧
╭───────────────✧
│  ‣ 𝘿𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙨 📥
│  ╰┈➤ ${prefix}play
│  ╰┈➤ ${prefix}play audio
│  ╰┈➤ ${prefix}play video
│  ╰┈➤ ${prefix}play mp3doc
│  ╰┈➤ ${prefix}play mp4doc
│  ╰┈➤ ${prefix}gitclone
│  ╰┈➤ ${prefix}tiktok
│  ╰┈➤ ${prefix}facebook
│  ╰┈➤ ${prefix}instagram
│  ╰┈➤ ${prefix}slider
│  ╰┈➤ ${prefix}x
│  ╰┈➤ ${prefix}gdrive
╰───────────────✧
╭───────────────✧
│  ‣ 𝙂𝙧𝙪𝙥𝙤𝙨 👥
│  ╰┈➤ ${prefix}admins
│  ╰┈➤ ${prefix}grupo
│  ╰┈➤ ${prefix}demote
│  ╰┈➤ ${prefix}fantasmas
│  ╰┈➤ ${prefix}hidetag
│  ╰┈➤ ${prefix}kick
│  ╰┈➤ ${prefix}link
│  ╰┈➤ ${prefix}promote
│  ╰┈➤ ${prefix}tagall
╰───────────────✧
╭───────────────✧
│  ‣ 𝙎𝙩𝙞𝙠𝙚𝙧𝙨 🔰
│  ╰┈➤ ${prefix}s
╰───────────────✧
╭───────────────✧
│  ‣ 𝙋𝙧𝙤𝙥𝙞𝙚𝙩𝙖𝙧𝙞𝙤 👑
│  ╰┈➤ ${prefix}update
│  ╰┈➤ ${prefix}restart
│  ╰┈➤ ${prefix}join
│  ╰┈➤ ${prefix}getcase 
│  ╰┈➤ ${prefix}addcase
╰───────────────✧
╭───────────────✧
|   ‣ 𝙅𝙪𝙚𝙜𝙤𝙨 🎮
|  ╰┈➤ ${prefix}bal 
|  ╰┈➤ ${prefix}daily 
|  ╰┈➤ ${Prefix}work 
|  ╰┈➤ ${prefix}rob
|  ╰┈➤ ${prefix}slots 
|  ╰┈➤ ${prefix}casino 
|  ╰┈➤ ${prefix}marry 
|  ╰┈➤ ${prefix}divorce
╰───────────────✧`.trim()

        await client.sendMessage(m.chat, {
          text: texto,
          contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: { newsletterName: 'MagnosBot | CHANNEL', newsletterJid: "120363422169517881@newsletter" },
            externalAdReply: {
              title: `© MagnosBot`,
              body: 'Multipropósito - IA, Descargas, Juegos y más',
              thumbnailUrl: 'https://i.postimg.cc/NGrhjVTv/IMG-20250909-WA0062.jpg',
              sourceUrl: 'https://github.com/OmarGranda',
              mediaType: 1,
              renderLargerThumbnail: true
            }
          }
        }, { quoted: fkontak })
      } break

      // ---------- PING ----------
      case 'ping': {
        const ts = speed()
        const lat = speed() - ts
        const _muptime = process.uptime() * 1000
        const muptime = clockString(_muptime)
        m.reply(`🏓 Pong!\nLatencia: ${lat.toFixed(4)} ms\nUptime: ${muptime}`)
      } break

// ---------- SCRIPT INFO ----------
      case 'sc':
      case 'script':
      case 'git': {
        try {
          const res = await fetch('https://api.github.com/repos/AzamiJs/CuriosityBot-MD').catch(() => null)
          const j = res ? await res.json().catch(() => null) : null
          if (!j) return m.reply('No se pudo obtener info del repo')
          const git = `*Bot - Script*\n\n· Nombre: ${j.name}\n· Visitantes: ${j.watchers_count}\n· Peso: ${(j.size / 1024).toFixed(2)} MB\n· Actualizado: ${moment(j.updated_at).format('DD/MM/YY - HH:mm:ss')}\n· Url: ${j.html_url}\n\n${j.forks_count} Forks · ${j.stargazers_count} Stars · ${j.open_issues_count} Issues`
          await client.sendMessage(m.chat, { text: git }, { quoted: m })
        } catch (e) { m.reply('Error Git: ' + String(e)) }
      } break

      case 'speedtest':
      case 'speed': {
        const cp = require('child_process')
        const { promisify } = require('util')
        const execp = promisify(cp.exec).bind(cp)
        await client.sendMessage(m.chat, { text: '> 🚀 Ejecutando SpeedTest...' }, { quoted: fkontak })
        try {
          const { stdout, stderr } = await execp('python3 speed.py --secure').catch(() => ({ stdout: '', stderr: '' }))
          if (stderr) throw new Error(stderr)
          const resultado = stdout || "❌ No se obtuvo salida del script."
          await client.sendMessage(m.chat, { text: `📡 Resultado SpeedTest:\n\n${resultado}` }, { quoted: fkontak })
        } catch (e) {
          await client.sendMessage(m.chat, { text: '⚠️ Error ejecutando SpeedTest (asegúrate de tener python3 speed.py disponible)' }, { quoted: fkontak })
        }
      } break
case 'update':
case 'actualizar':
case 'gitpull': {
  if (!isCreator) return m.reply(mess.owner)

try {
    const stdout = execSync('git pull' + (m.fromMe && q ? ' ' + q : ''))
    let message = stdout.toString()

    if (message.includes('Already up to date.')) {
      message = '✅ Todo actualizado, no hay cambios nuevos.'
    } else if (message.includes('Updating')) {
      message = '🆕 Actualización completada:\n\n' + stdout.toString()
    }

    m.reply(message)
} catch (e) {
    try {
      const status = execSync('git status --porcelain')
      if (status.length > 0) {
        const conflictedFiles = status
          .toString()
          .split('\n')
          .filter(line => line.trim() !== '')
          .map(line => {
            if (
              line.includes('.npm/') ||
              line.includes('.cache/') ||
              line.includes('tmp/') ||
              line.includes('session/') ||
              line.includes('npm-debug.log')
            ) {
              return null
            }
            return '→ *' + line.slice(3) + '*'
          })
          .filter(Boolean)

        if (conflictedFiles.length > 0) {
          const errorMessage = `⚠️ Se han detectado cambios locales en archivos del bot que entran en conflicto con las actualizaciones del repositorio.\n\n📌 Para actualizar, reinstala el bot o realiza las actualizaciones manualmente.\n\n🗂 Archivos en conflicto:\n\n${conflictedFiles.join('\n')}`
          await m.reply(errorMessage)
        }
      }
    } catch (error) {
      console.error(error)
      let errorMessage2 = '❌ Ha ocurrido un error inesperado.'
      if (error.message) {
        errorMessage2 += '\n\n💬 Mensaje de error: ' + error.message
      }
      await m.reply(errorMessage2)
    }
}
}
break


      // ---------- Descargas----------
case 'play':
case 'playaudio': {
  if (!q) return client.sendMessage(m.chat, { 
    text: `✨ Ingresa el nombre de la canción a buscar.\n\nEjemplo: *${usedPrefix + command} DJ Malam Pagi Slowed*` 
  }, { quoted: fkontak })
  
  try {
    let res = await fetch(`https://api.vreden.my.id/api/ytplaymp3?query=${encodeURIComponent(q)}`)
    let json = await res.json()
    if (!json || json.status !== 200 || !json.result?.metadata) {
return client.sendMessage(m.chat, { 
        text: '⚠️ No se encontraron resultados o la API falló.' 
      }, { quoted: fkontak })
    }
    let meta = json.result.metadata
    let { title, url, thumbnail, timestamp, ago, views, author } = meta
    let caption = `🎵 *Título:* ${title || 'Desconocido'}
📺 *Canal:* ${author?.name || 'No definido'}
⏳ *Duración:* ${timestamp || meta.duration?.timestamp || 'No definido'}
👀 *Vistas:* ${views?.toLocaleString() || '0'}
📅 *Publicado:* ${ago || 'No definido'}
🔗 *Enlace:* ${url || 'No disponible'}`.trim()
    await client.sendMessage(m.chat, {
      image: { url: thumbnail },
      caption: caption
    }, { quoted: m })
    if (json.result.download?.status === true && json.result.download.url) {
      await client.sendMessage(m.chat, {
        audio: { url: json.result.download.url },
        mimetype: 'audio/mpeg',
        fileName: `${title || 'audio'}.mp3`
      }, { quoted: m })
    } else {
      await client.sendMessage(m.chat, { 
        text: '❌ No se pudo convertir el audio.' 
      }, { quoted: m })
    }
  } catch (e) {
    console.error(e)
    client.sendMessage(m.chat, { 
      text: '⚠️ Error al procesar la solicitud.' 
    }, { quoted: fkontak })
  } 
}
break
case 'play2':
case 'playvideo': {
  if (!q) {
    return client.sendMessage(m.chat, {
      text: `🎥 Ingresa el enlace de YouTube.\n\nEjemplo: *${usedPrefix + command} https://youtube.com/watch?v=KHgllosZ3kA*`
    }, { quoted: m })
  }
  try {
    let res = await fetch(`https://api.vreden.my.id/api/ytmp4?url=${encodeURIComponent(q)}`)
    let json = await res.json()
    if (!json || json.status !== 200 || !json.result?.metadata) {
      return client.sendMessage(m.chat, { 
        text: '⚠️ No se encontró el video o la API falló.' 
      }, { quoted: m })
    }
    let meta = json.result.metadata || {}
    let title = meta.title || 'Título no disponible'
    let url = meta.url || q
    let thumbnail = meta.thumbnail || meta.image || 'https://telegra.ph/file/9dc4d6f69a3b64b62b6a3.jpg'
    let timestamp = meta.timestamp || (meta.duration ? meta.duration.timestamp : 'Desconocido')
    let ago = meta.ago || 'Fecha no disponible'
    let views = meta.views || 0
    let author = meta.author || {}
    let channel = author.name || 'Autor no definido'
    let caption = `🎵 *Título:* ${title}
📺 *Canal:* ${channel}
⏳ *Duración:* ${timestamp}
👀 *Vistas:* ${views.toLocaleString()}
📅 *Publicado:* ${ago}
🔗 *Enlace:* ${url}`.trim()
    await client.sendMessage(m.chat, {
      image: { url: thumbnail },
      caption: caption
    }, { quoted: m })
    let dload = json.result.download || {}
    if (dload.status === true && dload.url) {
      await client.sendMessage(m.chat, {
        video: { url: dload.url },
        mimetype: 'video/mp4',
        fileName: `${title}.mp4`
      }, { quoted: m })
    } else {
await client.sendMessage(m.chat, { 
        text: '❌ No se pudo convertir o descargar el video.' 
      }, { quoted: m })
    }
  } catch (e) {
    console.error(e)
    client.sendMessage(m.chat, { 
      text: '⚠️ Error al procesar la solicitud.' 
    }, { quoted: fkontak })
  }
}
break
      

      // ---------- ECONOMY & GAMES ----------
      case 'bal':
      case 'balance':
      case 'wallet': {
        const u = ensureUser(m.sender)
        const txt = `💰 Balance de ${m.pushName || m.sender.split('@')[0]}:\n\nCoins: ${u.coin}\nNivel: ${u.level}\nEXP: ${u.exp}/${u.level * 100}`
        m.reply(txt)
      } break

      case 'daily': {
        const u = ensureUser(m.sender)
        const nowt = Date.now()
        const cd = u.cooldowns?.daily || 0
        if (nowt - cd < 24 * 60 * 60 * 1000) {
          const left = 24 * 60 * 60 * 1000 - (nowt - cd)
          return m.reply(`Ya cobraste hoy. Te falta ${Math.ceil(left / 3600000)} horas`)
        }
        const earn = randomInt(50, 200)
        u.coin += earn
        u.cooldowns = u.cooldowns || {}
        u.cooldowns.daily = nowt
        m.reply(`✅ Cobraste tu daily: ${earn} coins\n💰 Nuevo balance: ${u.coin}`)
      } break

      case 'work': {
        const u = ensureUser(m.sender)
        const earn = randomInt(20, 120)
        u.coin += earn
        giveExp(m.sender, randomInt(5, 20))
        m.reply(`Trabajaste y ganaste ${earn} coins\nBalance: ${u.coin}`)
      } break

      case 'rob': {
        const target = (m.mentionedJid && m.mentionedJid[0]) || args[0]
        if (!target) return m.reply('Menciona a alguien: .rob @user')
        if (target === m.sender) return m.reply('No puedes robarte a ti mismo')
        const u = ensureUser(m.sender)
        const v = ensureUser(target)
        const success = Math.random() > 0.5
        if (!success) {
          const loss = Math.min(u.coin, randomInt(10, 50))
          u.coin -= loss
          return m.reply(`Fallaste y perdiste ${loss} coins`)
        } else {
          const gain = Math.min(v.coin, randomInt(10, Math.max(20, Math.floor(v.coin * 0.3))))
          v.coin -= gain
          u.coin += gain
          return m.reply(`Robaste con éxito ${gain} coins de ${target.split('@')[0]}\nTu balance: ${u.coin}`)
        }
      } break

      case 'slots': {
        const u = ensureUser(m.sender)
        const bet = parseInt(args[0]) || 10
        if (bet <= 0 || bet > u.coin) return m.reply('Monto inválido o no tienes suficientes coins')
        const reels = [randomInt(1, 5), randomInt(1, 5), randomInt(1, 5)]
        let result = reels.join(' ')
        if (reels[0] === reels[1] && reels[1] === reels[2]) {
          const win = bet * 5
          u.coin += win
          m.reply(`🎰 ${result}\nGanaste ${win} coins! Balance: ${u.coin}`)
        } else {
          u.coin -= bet
          m.reply(`🎰 ${result}\nPerdiste ${bet} coins. Balance: ${u.coin}`)
        }
      } break

      case 'casino': {
        const u = ensureUser(m.sender)
        const bet = parseInt(args[0]) || 10
        if (bet <= 0 || bet > u.coin) return m.reply('Apuesta inválida o fondos insuficientes')
        const roll = randomInt(1, 100)
        if (roll > 55) {
          const win = Math.floor(bet * (1 + Math.random() * 1.5))
          u.coin += win
          m.reply(`🎲 Resultado: ${roll} - Ganaste ${win} coins! Balance: ${u.coin}`)
        } else {
          u.coin -= bet
          m.reply(`🎲 Resultado: ${roll} - Perdiste ${bet} coins. Balance: ${u.coin}`)
        }
      } break

      case 'marry': {
        const target = m.mentionedJid && m.mentionedJid[0]
        if (!target) return m.reply('Menciona a la persona a casarte: .marry @user')
        const u = ensureUser(m.sender)
        const v = ensureUser(target)
        if (u.pareja || v.pareja) return m.reply('Alguna de las dos personas ya está casada')
        u.pareja = target
        v.pareja = m.sender
        m.reply(`💍 Felicidades! Te casaste con ${target.split('@')[0]}`)
      } break

      case 'divorce':
      case 'divorcio': {
        const u = ensureUser(m.sender)
        if (!u.pareja) return m.reply('No estás casado')
        const p = u.pareja
        const v = ensureUser(p)
        v.pareja = null
        u.pareja = null
        m.reply(`💔 Divorcio realizado con ${p.split('@')[0]}`)
      } break

      // ---------- ADMIN (ejemplos simples) ----------
      case 'admins': case 'admin': {
        if (!m.isGroup) return m.reply('Comando de grupo')
        let teks = 'Admins del grupo:\n'
        for (let a of groupAdmins) teks += `- ${a.split('@')[0]}\n`
        client.sendMessage(m.chat, { text: teks }, { quoted: m })
      } break

      case 'kick': {
        if (!m.isGroup) return m.reply('Grupo solamente')
        if (!isAdmins && !isCreator) return m.reply('Necesitas ser admin')
        const toKick = m.mentionedJid && m.mentionedJid[0]
        if (!toKick) return m.reply('Menciona a quien expulsar')
        await client.groupParticipantsUpdate(m.chat, [toKick], 'remove').catch(e => m.reply('No pude expulsar: ' + e))
        m.reply('Usuario expulsado (siempre y cuando el bot sea admin)')
      } break

      case 'promote': {
        if (!m.isGroup) return m.reply('Grupo solamente')
        if (!isAdmins && !isCreator) return m.reply('Necesitas ser admin')
        const toProm = m.mentionedJid && m.mentionedJid[0]
        if (!toProm) return m.reply('Menciona a quien promover')
        await client.groupParticipantsUpdate(m.chat, [toProm], 'promote').catch(e => m.reply('Error promote: ' + e))
        m.reply('Usuario promovido')
      } break

      case 'demote': {
        if (!m.isGroup) return m.reply('Grupo solamente')
        if (!isAdmins && !isCreator) return m.reply('Necesitas ser admin')
        const toDem = m.mentionedJid && m.mentionedJid[0]
        if (!toDem) return m.reply('Menciona a quien degradar')
        await client.groupParticipantsUpdate(m.chat, [toDem], 'demote').catch(e => m.reply('Error demote: ' + e))
        m.reply('Usuario degradado')
      } break

      default:
        if (command) {
          giveExp(m.sender, 5)
        }
        break
    } 
    
    if (global.db && typeof global.db.save === 'function') {
      try { await global.db.save() } catch (e) { /* ignore save errors */ }
    }

  } catch (err) {
    console.error(chalk.redBright('[MAIN ERROR]'), err)
    try { m.reply('Ocurrió un error interno: ' + String(err.message || err)) } catch (e) { /* nada */ }
  }
}
