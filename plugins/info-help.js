import fetch from 'node-fetch'
import fs from 'fs'
import axios from 'axios'
import moment from 'moment-timezone'
import os from 'os'
import { performance } from 'perf_hooks'
import { commands } from '../lib/commands.js'

let handler = async (m, { conn, args, usedPrefix }) => { 
  try {

    const cmdsList = commands
    let now = new Date()
    let colombianTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Bogota' }))
    let tiempo = colombianTime.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric', 
    }).replace(/,/g, '')
    
    const imgs = [
      "https://files.catbox.moe/iw8yi8.jpg",
      "https://files.catbox.moe/2bezkd.jpg",
      "https://files.catbox.moe/g1lzu6.jpg",
      "https://files.catbox.moe/ai470b.jpg"
    ]
    let randomImg = imgs[Math.floor(Math.random() * imgs.length)]

    
    let tiempo2 = moment.tz('America/Bogota').format('hh:mm A')
    let sessionFolder = './plugins'
    let subSessions = fs.existsSync(sessionFolder) ? fs.readdirSync(sessionFolder) : []
    let plugins = subSessions.length

    let isOficialBot = conn.user.jid === globalThis.conn.user.jid
    let botType = isOficialBot ? 'Principal' : 'Sub-Bot'

    const jam = moment.tz('America/Lima').locale('id').format('HH:mm:ss')
    const ucapan = jam < '05:00:00' ? 'Buen día' : 
                   jam < '11:00:00' ? 'Buen día' : 
                   jam < '15:00:00' ? 'Buenas tardes' : 
                   jam < '18:00:00' ? 'Buenas tardes' : 
                   jam < '19:00:00' ? 'Buenas tardes' : 
                   jam < '23:59:00' ? 'Buenas noches' : 
                   'Buenas noches';

    let uptimeSeg = Math.floor(process.uptime())
    let uptimeStr = convertirTiempo(uptimeSeg)

    let memoriaTotal = os.totalmem() / 1024 / 1024 / 1024
    let memoriaLibre = os.freemem() / 1024 / 1024 / 1024
    let memoriaUsada = memoriaTotal - memoriaLibre

    let menu = `\n\n`
    menu += `> . ﹡ ﹟ 🌹 ׄ ⬭ ${ucapan}  *${m.pushName ? m.pushName : 'Sin nombre'}*\n\n`
    menu += `ׅㅤꨶ〆⁾ ㅤׄㅤ⸼ㅤׄ *͜🐼* ㅤ֢ㅤ⸱ㅤᯭִ\n`
    menu += `ׅㅤ𓏸𓈒ㅤׄ *Plugins ›* ${plugins}\n`
    menu += `ׅㅤ𓏸𓈒ㅤׄ *Versión ›* ^0.0.9 ⋆. 𐙚 ˚\n\n`
    menu += `ׅㅤ𓏸𓈒ㅤׄ *Fecha ›* ${tiempo}, ${tiempo2}\n`
    menu += `ׅㅤ𓏸𓈒ㅤׄ *Tiempo activo ›* ${uptimeStr}\n`
    menu += `ׅㅤ𓏸𓈒ㅤׄ *RAM usada ›* ${memoriaUsada.toFixed(2)} GB\n`
    menu += `ׅㅤ𓏸𓈒ㅤׄ *RAM total ›* ${memoriaTotal.toFixed(2)} GB\n`

    const categoryArg = args[0]?.toLowerCase();
    const categories = {};

    for (const command of cmdsList) {
      const category = command.category || 'otros';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(command);
    }

    if (categoryArg && !categories[categoryArg]) {
      return m.reply(`⭐ La categoría *${categoryArg}* no encontrada.`);
    }

    for (const [category, cmds] of Object.entries(categories)) {
      if (categoryArg && category.toLowerCase() !== categoryArg) {
        continue;
      }
      const catName = category.charAt(0).toUpperCase() + category.slice(1)
      menu += `\nㅤ🍂ᯭ⁾ ㅤׄ  ꤥㅤׄㅤꤪꤨ${catName}ㅤꤪꤨㅤ֢ㅤׄㅤׅ\n`
      cmds.forEach(cmd => {
        const match = usedPrefix.match(/[#\/+.!-]$/);
        const separator = match ? match[0] : '';
        const cleanPrefix = separator ? separator : usedPrefix;
        const aliases = cmd.alias.map(a => {
          const aliasClean = a.split(/[\/#!+.\-]+/).pop().toLowerCase();
          return `${cleanPrefix}${aliasClean}`
        }).join(' › ');
        menu += `֯　ׅ🍃ֶ֟፝֯ㅤ *${aliases}* ${cmd.uso ? `+ ${cmd.uso}` : ''}\n`;
        menu += `> _*${cmd.desc}*_\n`;
      });
    }

    const canales = Object.entries(global.my)
      .reduce((acc, [key, value]) => {
        if (key.startsWith('ch')) {
          const index = key.slice(2)
          const nombre = global.my[`name${index}`]
          if (nombre) {
            acc.push({ id: value, nombre })
          }
        }
        return acc
      }, [])

    const channelRD = canales[Math.floor(Math.random() * canales.length)]

    await conn.sendMessage(m.chat, {
      text: menu.trim(),
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: { 
          newsletterName: 'MagnosBot | CHANNEL', 
          newsletterJid: "120363422169517881@newsletter" 
        },
        externalAdReply: {
          title: `𝙈𝙖𝙜𝙣𝙤𝙨 𝘽𝙤𝙩 `,
          body: dev,
          thumbnailUrl: randomImg,
          sourceUrl: 'https://github.com/OmarGranda',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

  } catch (e) {
    await m.reply(`🕸 Error [${e}]`)
  }
}

function convertirTiempo(segundos) {
  let horas = Math.floor(segundos / 3600)
  let minutos = Math.floor((segundos % 3600) / 60)
  let seg = segundos % 60
  return [horas, minutos, seg]
    .map(v => v.toString().padStart(2, '0'))
    .join(':')
}

handler.help = ['menu', 'help']
handler.tags = ['info']
handler.command = ['menu', 'help'] 
export default handler