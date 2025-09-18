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
╭━〔 *MENÚ - MAGNOS* 〕━⬣
┃ 👤 Usuario: *${user}*
┃ 📅 Fecha: *${fecha}*
┃ 🕒 Hora: *${hora}*
┃ 📆 Día: *${dia}*
┃ 💾 RAM Usada: *${usedMem.toFixed(2)} MB*
┃ 📂 RAM Libre: *${freeMem.toFixed(2)} MB*
┃ 📦 RAM Total: *${totalMem.toFixed(2)} MB*
╰━━━━━━━━━━━━━━━━━━⬣


╭───────────────✧
│ ‣ *🄰 🄽 🄸 🄼 🄴* 🌸
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
│ ‣ Downloadㅤׅ
│ ╰┈➤ .play + (url/name)
│ ╰┈➤ .playaudio+ (url
│ /name)
│ ╰┈➤ .mp3 + (url/name)
│  *Descargar Videos de*
│  *YouTube a Audio.*
│ ╰┈➤ .play2 + (link/name)
│ ╰┈➤ .playvideo + (url
│ /name)
│ ╰┈➤ .mp4 + (url/name)
│  *Descargar videos*
│  *de YouTube*
│ ╰┈➤ .facebook + (url/name)
│  *Descargar videos*
│  *de Facebook.*
│ ╰┈➤ .tiktok + (urk/name) 
│  *Descargar videos de*
│  *TikTok.*
│ ╰┈➤ .mediafire + (url
│ /name)
│  *Descargar archivos*
│  *de MediaFire.*
╰───────────────✧

╭───────────────✧
│ ‣  Grupos 👥ㅤׅ
│ ╰┈➤ .bot on
│  *Activar el bot en*
│  *el grupo.*
│ ╰┈➤ .bot off
│  *Desactivar el bot en*
│  *el grupo.*
│ ╰┈➤ .promote + (@citar)
│  *Promueve a un usuario a*
│  *administrador.*
│ ╰┈➤ .demote + (@citar)
│  *Elimina a un usuario de*
│  *administrador.*
│ ╰┈➤ .setprimary + (@citar)
│  *Establece un Bot como*
│  *primario del grupo.*
│ ╰┈➤ .open
│  *Abre el grupo.*
│ ╰┈➤ .closet
│  *Cierra el grupo.*
│ ╰┈➤ .on welcome
│  *Activar vienvenidas.*
│ ╰┈➤ .off welcome
│  *Desactivar vienvenidas.*
│ ╰┈➤ .on alertas
│  *Activar alertas.*
│ ╰┈➤ .off alertas
│  *Desactivar alertas.*
│ ╰┈➤ .on antilinks
│  *Activar antilinks.*
│ ╰┈➤ .off antilinks
│  *Desactivar antilinks.*
│ ╰┈➤ .on antienlaces
│  *Activar entienlaces.*
│ ╰┈➤ .off antienlaces
│  *Desactivar antienlaces.*
│ ╰┈➤ .on onlyadmin
│  *Activar solo*
│  *administradores.*
│ ╰┈➤ .off onlyadmin
│  *Desactivar solo*
│  *administradores.*
│ ╰┈➤ .on nsfw
│  *Activar los*
│  *comandos +18.*
│ ╰┈➤ .off nsfw
│  *Desactivar los*
│  *comandos +18.*
│ ╰┈➤ .kick + (@citar)
│  *Expulsar a un usuario del*
│  *grupo.*
│ ╰┈➤ .hidetag + (texto)
│  *Menciona a todos los*
│  *usaríos del grupo.*
│ ╰┈➤ .groupinfo
│  *Muestra la información del*
│  *grupo.*
╰───────────────✧

╭───────────────✧
│ ‣ Información 🤖
│ ╰┈➤ .menu
│  *Muestra la lista de*
│  *comandos.*
│ ╰┈➤ .ping
│  *Muestra la velocidad*
│  *del bot.*
╰───────────────✧

╭───────────────✧
│ ‣ SubBots 🤖ㅤׅ
│ ╰┈➤ .bots
│  *Muestra el número de los*
|  *SubBots conectados.*
│ ╰┈➤ .logout
│  *Cierra la secion del SubBot.*
│ ╰┈➤ .qr
│  *Vincula un nuevo SubBot*
│  *atravez de código QR.*
│ ╰┈➤ .code
│  *Vincula un nuevo SubBot*
│  *atravez de código de 8*
│  *dijitos.*
│ ╰┈➤ .leave
│  *El bot avandona el grupo.*
│  *actual*
│ ╰┈➤ .self on
│  *Bot privado.*
│ ╰┈➤ .self off
│  *Bot publicó.*
╰───────────────✧

╭───────────────✧
│  ‣ Buscadores 🔎
│ ╰┈➤ .chatgpt + (texto)
│  *Reliza una petición a*
│  *chat gpt.*
╰───────────────✧

╭───────────────✧
│ ‣ Utilidadesㅤׅ
│ ╰┈➤ .s
│ *Convierte imágenes o*
│ *videos en stikers*
│ ╰┈➤ .pfp + (@citar)
│ *Ver la foto de perfil de un*
│ *usuario.*
│ ╰┈➤ .get + (ulr)
│ *Reliza solicitudes get a*
│ *páginas web.*
│ ╰┈➤ .hd
│ *Mejora la calidad de una*
│ *imagen.*
╰───────────────✧

╭───────────────✧
│ ‣ Comandos +18 🚫
│ ╰┈➤ .dbooru + (@citar)
│  *Buscar imágenes en*
│  *danbooru.*
│ ╰┈➤ .gbooru + (@citar)
│  *Buscar imágenes en*
│  *gelbooru
│ ╰┈➤ .blowjob + (@citar)
│  *Dale una mamada a un*
|  *usuario.*
│ ╰┈➤ .boobjob + (@citar)
│  *Hacerle una rusa a un*
│  *usuario.*
│ ╰┈➤ .cum + (@citar)
│  *Venirse en alguien.*
│ ╰┈➤ .anal + (@citar)
│  *Hacer un anal.*
│ ╰┈➤ .fap + (@citar)
│  *Hacer una paja.*
│ ╰┈➤ .grabboobs + (@citar)
│  *Agarrar las retas de un*
│  *usuario.*
│ ╰┈➤ .footjob + (@citar)
│  *Hacer una paja con los pies*
│  *a un usuario.*
│ ╰┈➤ .undress + (@citar)
│  *Encuerate o encuera a un*
│  *usuario.*
│ ╰┈➤ .grope + (@citar)
│  *Manosear las nalgas a un*
│  *usuario.*
│ ╰┈➤ .sixnine + (@citar)
│  *Hacer un 69 con un usuario.*
│ ╰┈➤ .lickpussy + (@citar)
│  *Lamer el coño de un
│  *usuario.*
│ ╰┈➤ .spank + (@citar)
│  *Darle una nalgada a un*
│  *usuario.*
│ ╰┈➤ .fuck + (@citar)
│  *Coger a un usuario.*
│ ╰┈➤ .suckboobs + (@citar)
│  *Chupar las tetas de un*
│  *usuario.*
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