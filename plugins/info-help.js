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
│ ╰┈➤ .peek + (@mencionar)
│  *Espiar a alguien.* 
│ ╰┈➤ .comfort + (@mencionar)
│  *Consolar a alguien.* 
│ ╰┈➤ .thinkhard + (@mencionar)
│  *Pensar intensivamente.*
│ ╰┈➤ .curious + (@mencionar)
│  *Sentir curiosidad.* 
│ ╰┈➤ .sniff + (@mencionar)
│  *Olfatear a alguien.* 
│ ╰┈➤ .stare + (@mencionar)
│  *Mirar fijamente.*
│ ╰┈➤ .trip + (@mencionar)
│  *Tropezar accidentalmente.*
│ ╰┈➤ .blowkiss + (@mencionar)
│  *Lanzar un beso.*
│ ╰┈➤ .snuggle + (@mencion)
│  *Acurrucarse con alguien.* 
│ ╰┈➤ .angry + (@mencion)
│  *Estar enojado.*
│ ╰┈➤ .bored + (@mencion)
│  *Estar aburrido.*
│ ╰┈➤ .bleh + (@mencion)
│  *Sacar la lengua.*
│ ╰┈➤ .clap + (@mencionar)
│  *Aplaudir.*
│ ╰┈➤ .Coffee + (@mencionar)
│  *Tomar café.*
│ ╰┈➤ .cold + (@mencionar)
│  *Mucho frío.*
│ ╰┈➤ .sing + (@mencionar)
│  *Mucho frio.*
│ ╰┈➤ .tickle + (@mencionar)
│  *Cantarle a alguien.*
│ ╰┈➤ .scream + (@mencionar)
│  *Gritar fuerte.*
│ ╰┈➤ .push + (@mencionar)
│  *Empujar a alguien.*
│ ╰┈➤ .nope + (@mencionar)
│  *Expresar desacuerdo.*
│ ╰┈➤ .jump + (@mencionar)
│  *Saltar de felicidad.*
│ ╰┈➤ .heat + (@mencionar)
│  *Sentir calor.*
│ ╰┈➤ .gaming + (@mencionar)
│  *Jugar Videojuegos.*
│ ╰┈➤ .draw + (@mencionar)
│  *Hacer dibujo.*
│ ╰┈➤ .call + (@mencionar)
│  *Llamar a alguien.*
│ ╰┈➤ .dramatic + (@mencionar)
│  *Hacer un drama.*
│ ╰┈➤ .drunk + (@mencionar)
│  *Estar borracho.*
│ ╰┈➤ .impregnate + (@mencionar)
│  *Embarazar.*
│ ╰┈➤ .kisscheek + (@mencionar)
│  *Besar en la mejilla.*
│ ╰┈➤ .laugh + (@mencionar)
│  *Reírse.*
│ ╰┈➤ .love › + (@mencionar)
│  *Sentir atracción.*
│ ╰┈➤ .pout + (@mencionar)
│  *Hacer pucheros.*
│ ╰┈➤ .punch + (@mencionar)
│  *Dar un peñetazo.*
│ ╰┈➤ .run + (mencionar)
│  *Correr.*
│ ╰┈➤ .sad + (@mencionar)
│  *Sentir tristeza.*
│ ╰┈➤ .scared + (mencionar)
│  *Estar asustado.*
│ ╰┈➤ .seduce + (@mencionar)
│  *Seducir.*
│ ╰┈➤ .shy + (@mencionar)
│  *Sentir timidez.*
│ ╰┈➤ .sleep + (@mencionar)
│  *Dormir.*
│ ╰┈➤ .smoke + (@mencionar)
│  *Fumar.*
│ ╰┈➤ .spit + (@mencionar)
│  *Escupir.*
│ ╰┈➤ .step + (@mencionar)
│  *Pisar.*
│ ╰┈➤ .think + (@mencionar)
│  *Pensar.*
│ ╰┈➤ .walk + (@mencionar)
│  *Caminar.*
│ ╰┈➤ .hug + (@mencionar)
│  *Dar un abrazo.*
│ ╰┈➤ .kill + (@mencionar)
│  *Asesinar.*
│ ╰┈➤ .eat + (@mencionar)
│  *Comer.*
│ ╰┈➤ .Kiss + (@mencionar)
│  *Dar un beso.*
│ ╰┈➤ .wink + (@mencionar)
│  *Guiñar.*
│ ╰┈➤ .pat + (@mencionar)
│  *Dar una caricia.*
│ ╰┈➤ .happy + (@mencionar)
│  *Saltos de felicidad.*
│ ╰┈➤ .bully + (@mencionar)
│  *Hacer bullying.*
│ ╰┈➤ .bite + (@mencionar)
│  *Morder.*
│ ╰┈➤ .wave + (@mencionar)
│  *Saludar.*
│ ╰┈➤ .blush + (@mencionar)
│  *Sonrojarse.*
│ ╰┈➤ .bath + (@mencionar)
│  *Bañarse.*
│ ╰┈➤ .smug + (@mencionar)
│  *Presumír.*
│ ╰┈➤ .smile + (@mencionar)
│  *Sonreir.*
│ ╰┈➤ .highfive + (@mencionar)
│  *Chocar los cinco.*
│ ╰┈➤ .handhold + (@mencionar)
│  *Tomar de la mano.*
│ ╰┈➤ .cringe + (@mencionar)
│  *Sentir cringe.*
│ ╰┈➤ .bonk + (@mencionar)
│  *Golpear.*
│ ╰┈➤ .cry + (@mencionar)
│  *Llorar.*
│ ╰┈➤ .lick + (@mencionar)
│  *Lamer.*
│ ╰┈➤ .slap + (@mencionar)
│  *Dar una bofetada.*
│ ╰┈➤ .cuddle + (@mencionar)
│  *Acurrucarse.*
│ ╰┈➤ .dance + (@mencionar)
│  *Bailar.*
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