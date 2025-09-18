import os from 'os'
import moment from 'moment-timezone'

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    let totalMem = os.totalmem() / 1024 / 1024
    let freeMem = os.freemem() / 1024 / 1024
    let usedMem = totalMem - freeMem
    let user = m.pushName || "Usuario"

    let fecha = moment().tz('America/Lima').format('DD/MM/YYYY')
    let hora = moment().tz('America/Lima').format('HH:mm:ss')
    let dia = moment().tz('America/Lima').format('dddd')

    const imgs = [
      "https://files.catbox.moe/iw8yi8.jpg",
      "https://files.catbox.moe/2bezkd.jpg",
      "https://files.catbox.moe/g1lzu6.jpg",
      "https://files.catbox.moe/ai470b.jpg"
    ]
    let randomImg = imgs[Math.floor(Math.random() * imgs.length)]
    
    let menu = `
╭━〔 *MENÚ ° MAGNOS* 〕━⬣
┃ 👤 Usuario: *${user}*
┃ 📅 Fecha: *${fecha}*
┃ 🕒 Hora: *${hora}*
┃ 📆 Día: *${dia}*
┃ 💾 RAM Usada: *${usedMem.toFixed(2)} MB*
┃ 📂 RAM Libre: *${freeMem.toFixed(2)} MB*
┃ 📦 RAM Total: *${totalMem.toFixed(2)} MB*
╰━━━━━━━━━━━━━━━━━━⬣


╭───────────────✧
│ ‣🌿ᯭ⁾ ㅤׄ  ꤥㅤׄㅤꤪꤨ𝗔𝗻𝗶𝗺𝗲ㅤꤪꤨㅤ֢ㅤׄㅤׅ
│ ╰┈➤ .peek + _<mention>_
│  *Espiar a alguien.* 
│ ╰┈➤ .comfort + _<mention>_
│  *Consolar a alguien* 
│ ╰┈➤ .thinkhard + _<mention>_
│  *Pensar intensivamente*
│ ╰┈➤ .curious + _<mention>_
│  *Sentir curiosidad* 
│ ╰┈➤ .sniff + _<mention>_
│  *Olfatear a alguien* 
│ ╰┈➤ .stare + _<mention>_
│  *Mirar fijamente*
│ ╰┈➤ .trip + _<mention>_
│  *Tropezar accidentalmente*
│ ╰┈➤ .blowkiss + _<mention>_
│  *Lanzar un beso*
│ ╰┈➤ .snuggle + _<mention>_
│  *Acurrucarse con alguien 
│ ╰┈➤ .angry + _<mention>_
│  *Estar enojado*
│ ╰┈➤ .bored + _<mention>_
│  *Sacar la lengua*
│ ╰┈➤ .bleh + _<mention>_
│ 
│ ╰┈➤ .clap + _<mention>_
│ ╰┈➤ .coffee › .cafe + _<mention>_
│ ╰┈➤ .cold + _<mention>_
│ ╰┈➤ .sing + _<mention>_
│ ╰┈➤ .tickle + _<mention>_
│ ╰┈➤ .scream + _<mention>_
│ ╰┈➤ .push + _<mention>_
│ ╰┈➤ .nope + _<mention>_
│ ╰┈➤ .jump + _<mention>_
│ ╰┈➤ .heat + _<mention>_
│ ╰┈➤ .gaming + _<mention>_
│ ╰┈➤ .draw + _<mention>_
│ ╰┈➤ .call + _<mention>_
│ ╰┈➤ .dramatic › .drama + _<mention>_
│ ╰┈➤ .drunk + _<mention>_
│ ╰┈➤ .impregnate › .preg + _<mention>_
│ ╰┈➤ .kisscheek › .beso + _<mention>_
│ ╰┈➤ .laugh + _<mention>_
│ ╰┈➤ .love › .amor + _<mention>_
│ ╰┈➤ .pout + _<mention>_
│ ╰┈➤ .punch + _<mention>_
│ ╰┈➤ .run › .correr + _<mention>_
│ ╰┈➤ .sad › .triste + _<mention>_
│ ╰┈➤ .scared + _<mention>_
│ ╰┈➤ .seduce + _<mention>_
│ ╰┈➤ .shy › .timido + _<mention>_
│ ╰┈➤ .sleep + _<mention>_
│ ╰┈➤ .smoke › .fumar + _<mention>_
│ ╰┈➤ .spit › .escupir + _<mention>_
│ ╰┈➤ .step › .pisar + _<mention>_
│ ╰┈➤ .think + _<mention>_
│ ╰┈➤ .walk + _<mention>_
│ ╰┈➤ .hug + _<mention>_
│ ╰┈➤ .kill + _<mention>_
│ ╰┈➤ .eat › .nom › .comer + _<mention>_
│ ╰┈➤ .kiss › .muak + _<mention>_
│ ╰┈➤ .wink + _<mention>_
│ ╰┈➤ .pat + _<mention>_
│ ╰┈➤ .happy › .feliz + _<mention>_
│ ╰┈➤ .bully + _<mention>_
│ ╰┈➤ .bite › .morder + _<mention>_
│ ╰┈➤ .wave + _<mention>_
│ ╰┈➤ .blush + _<mention>_
│ ╰┈➤ .bath + _<mention>_
│ ╰┈➤ .smug + _<mention>_
│ ╰┈➤ .smile + _<mention>_
│ ╰┈➤ .highfive + _<mention>_
│ ╰┈➤ .handhold + _<mention>_
│ ╰┈➤ .cringe + _<mention>_
│ ╰┈➤ .bonk + _<mention>_
│ ╰┈➤ .cry + _<mention>_
│ ╰┈➤ .lick + _<mention>_
│ ╰┈➤ .slap + _<mention>_
│ ╰┈➤ .cuddle + _<mention>_
│ ╰┈➤ .dance + _<mention>_
╰───────────────✧

╭───────────────✧
│ ‣🍏ᯭ⁾ ㅤׄ  ꤥㅤׄㅤꤪꤨDownloadㅤꤪꤨㅤ֢ㅤׄㅤׅ
│ ╰┈➤ .play
| ╰┈➤ .play2
| ╰┈➤ .mp3
| ╰┈➤ .mp4
| ╰┈➤ .playaudio
| ╰┈➤ .playvideo + _<url|query>_
│ ╰┈➤ .facebook › .fb + _<url>_
│ ╰┈➤ .mediafire › .mf + _<url|query>_
│ ╰┈➤ .tiktok › .tt + _<url|query>_
╰───────────────✧

╭───────────────✧
│ ‣🍧ᯭ⁾ ㅤׄ  ꤥㅤׄㅤꤪꤨGrupoㅤꤪꤨㅤ֢ㅤׄㅤׅ
│ ╰┈➤ .bot + _<on|off>_
│ ╰┈➤ .promote + _<mention>_
│ ╰┈➤ .setprimary + _<mention>_
│ ╰┈➤ .demote + _<mention>_
│ ╰┈➤ .closet › .open 
│ ╰┈➤ .on › .off + _<welcome|alerts|alertas|antilinks|antienlaces|onlyadmin|adminonly|nsfw>_
│ ╰┈➤ .tag › .hidetag + _<text>_
│ ╰┈➤ .groupinfo › .gp 
│ ╰┈➤ .kick + _<mention>_
╰───────────────✧

╭───────────────✧
│ ‣🍂ᯭ⁾ ㅤׄ  ꤥㅤׄㅤꤪꤨInfoㅤꤪꤨㅤ֢ㅤׄㅤׅ
│ ╰┈➤ .menu › .help + _<category>_
│ ╰┈➤ .ping › .p 
╰───────────────✧

╭───────────────✧
│ ‣🎋ᯭ⁾ ㅤׄ  ꤥㅤׄㅤꤪꤨSocketsㅤꤪꤨㅤ֢ㅤׄㅤׅ
│ ╰┈➤ .bots › .sockets 
│ ╰┈➤ .logout 
│ ╰┈➤ .qr › .code 
│ ╰┈➤ .leave 
│ ╰┈➤ .self + _<on|off>_
╰───────────────✧

╭───────────────✧
│ ‣🌷ᯭ⁾ ㅤׄ  ꤥㅤׄㅤꤪꤨIaㅤꤪꤨㅤ֢ㅤׄㅤׅ
│ ╰┈➤ .ia › .chatgpt + _<query>_
╰───────────────✧

╭───────────────✧
│ ‣⭐ᯭ⁾ ㅤׄ  ꤥㅤׄㅤꤪꤨNsfwㅤꤪꤨㅤ֢ㅤׄㅤׅ
│ ╰┈➤ .danbooru › .dbooru + _<tag>_
│ ╰┈➤ .gelbooru › .gbooru + _<tag>_
│ ╰┈➤ .blowjob › .bj + _<mention>_
│ ╰┈➤ .boobjob + _<mention>_
│ ╰┈➤ .cum + _<mention>_
│ ╰┈➤ .anal + _<mention>_
│ ╰┈➤ .fap › .paja + _<mention>_
│ ╰┈➤ .grabboobs + _<mention>_
│ ╰┈➤ .footjob + _<mention>_
│ ╰┈➤ .undress › .encuerar + _<mention>_
│ ╰┈➤ .grope + _<mention>_
│ ╰┈➤ .sixnine › .69 + _<mention>_
│ ╰┈➤ .lickpussy + _<mention>_
│ ╰┈➤ .spank › .nalgada + _<mention>_
│ ╰┈➤ .fuck › .coger + _<mention>_
│ ╰┈➤ .suckboobs + _<mention>_
╰───────────────✧

╭───────────────✧
│ ‣🌤️ᯭ⁾ ㅤׄ  ꤥㅤׄㅤꤪꤨUtilsㅤꤪꤨㅤ֢ㅤׄㅤׅ
│ ╰┈➤ .sticker › .s 
│ ╰┈➤ .getpic › .pfp + _<mention>_
│ ╰┈➤ .get + _<url>_
│ ╰┈➤ .hd 
╰───────────────✧`

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
          title: `⚡ 𝙈𝙖𝙜𝙣𝙤𝙨 𝘽𝙤𝙩 ⚡`,
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

handler.help = ['help', 'menu']
handler.tags = ['main']
handler.command = ['help', 'menu', 'ayuda']

export default handler