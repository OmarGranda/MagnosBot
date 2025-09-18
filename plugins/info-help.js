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
│ ‣ 🅰🅽🅸🅼🅴 🌸
│ ╰┈➤ .peek + (@citar)
│  *Espiar a alguien.* 
│ ╰┈➤ .comfort + (@citar)
│  *Consolar a alguien.* 
│ ╰┈➤ .thinkhard + (@citar)
│  *Pensar intensivamente.*
│ ╰┈➤ .curious + (@citar)
│  *Sentir curiosidad.* 
│ ╰┈➤ .sniff + (@citar)
│  *Olfatear a alguien.* 
│ ╰┈➤ .stare + (@citar)
│  *Mirar fijamente.*
│ ╰┈➤ .trip + (@citar)
│  *Tropezar accidentalmente.*
│ ╰┈➤ .blowkiss + (@citar)
│  *Lanzar un beso.*
│ ╰┈➤ .snuggle + (@citar)
│  *Acurrucarse con alguien.* 
│ ╰┈➤ .angry + (@citar)
│  *Estar enojado.*
│ ╰┈➤ .bored + (@citar)
│  *Estar aburrido.*
│ ╰┈➤ .bleh + (@citar)
│  *Sacar la lengua.*
│ ╰┈➤ .clap + (@citar)
│  *Aplaudir.*
│ ╰┈➤ .Coffee + (@citar)
│  *Tomar café.*
│ ╰┈➤ .cold + (@citar)
│  *Mucho frío.*
│ ╰┈➤ .sing + (@citar)
│  *Mucho frio.*
│ ╰┈➤ .tickle + (@citar)
│  *Cantarle a alguien.*
│ ╰┈➤ .scream + (@citar)
│  *Gritar fuerte.*
│ ╰┈➤ .push + (@citar)
│  *Empujar a alguien.*
│ ╰┈➤ .nope + (@citar)
│  *Expresar desacuerdo.*
│ ╰┈➤ .jump + (@citar)
│  *Saltar de felicidad.*
│ ╰┈➤ .heat + (@citar)
│  *Sentir calor.*
│ ╰┈➤ .gaming + (@citar)
│  *Jugar Videojuegos.*
│ ╰┈➤ .draw + (@citar)
│  *Hacer dibujo.*
│ ╰┈➤ .call + (@citar)
│  *Llamar a alguien.*
│ ╰┈➤ .dramatic + (@citar)
│  *Hacer un drama.*
│ ╰┈➤ .drunk + (@citar)
│  *Estar borracho.*
│ ╰┈➤ .impregnate + (@citar)
│  *Embarazar.*
│ ╰┈➤ .kisscheek + (@citar)
│  *Besar en la mejilla.*
│ ╰┈➤ .laugh + (@citar)
│  *Reírse.*
│ ╰┈➤ .love › + (@citar)
│  *Sentir atracción.*
│ ╰┈➤ .pout + (@citar)
│  *Hacer pucheros.*
│ ╰┈➤ .punch + (@citar)
│  *Dar un peñetazo.*
│ ╰┈➤ .run + (@citar)
│  *Correr.*
│ ╰┈➤ .sad + (@citar)
│  *Sentir tristeza.*
│ ╰┈➤ .scared + (@citar)
│  *Estar asustado.*
│ ╰┈➤ .seduce + (@citar)
│  *Seducir.*
│ ╰┈➤ .shy + (@citar)
│  *Sentir timidez.*
│ ╰┈➤ .sleep + (@citar)
│  *Dormir.*
│ ╰┈➤ .smoke + (@citar)
│  *Fumar.*
│ ╰┈➤ .spit + (@citar)
│  *Escupir.*
│ ╰┈➤ .step + (@citar)
│  *Pisar.*
│ ╰┈➤ .think + (@citar)
│  *Pensar.*
│ ╰┈➤ .walk + (@citar)
│  *Caminar.*
│ ╰┈➤ .hug + (@citar)
│  *Dar un abrazo.*
│ ╰┈➤ .kill + (@citar)
│  *Asesinar.*
│ ╰┈➤ .eat + (@citar)
│  *Comer.*
│ ╰┈➤ .Kiss + (@citar)
│  *Dar un beso.*
│ ╰┈➤ .wink + (@citar)
│  *Guiñar.*
│ ╰┈➤ .pat + (@citar)
│  *Dar una caricia.*
│ ╰┈➤ .happy + (@citar)
│  *Saltos de felicidad.*
│ ╰┈➤ .bully + (@citar)
│  *Hacer bullying.*
│ ╰┈➤ .bite + (@citar)
│  *Morder.*
│ ╰┈➤ .wave + (@citar)
│  *Saludar.*
│ ╰┈➤ .blush + (@citar)
│  *Sonrojarse.*
│ ╰┈➤ .bath + (@citar)
│  *Bañarse.*
│ ╰┈➤ .smug + (@citar)
│  *Presumír.*
│ ╰┈➤ .smile + (@citar)
│  *Sonreir.*
│ ╰┈➤ .highfive + (@citar)
│  *Chocar los cinco.*
│ ╰┈➤ .handhold + (@citar)
│  *Tomar de la mano.*
│ ╰┈➤ .cringe + (@citar)
│  *Sentir cringe.*
│ ╰┈➤ .bonk + (@citar)
│  *Golpear.*
│ ╰┈➤ .cry + (@citar)
│  *Llorar.*
│ ╰┈➤ .lick + (@citar)
│  *Lamer.*
│ ╰┈➤ .slap + (@citar)
│  *Dar una bofetada.*
│ ╰┈➤ .cuddle + (@citar)
│  *Acurrucarse.*
│ ╰┈➤ .dance + (@citar)
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