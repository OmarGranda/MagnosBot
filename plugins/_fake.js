export async function before(m, { conn }) {

  const canal = 'https://whatsapp.com/channel/0029VbApwZ9ISTkEBb6ttS3F'
  const canal2 = 'https://whatsapp.com/channel/0029Vb6IdnEGU3BTahqaLL2V'
  const canal3 = 'https://whatsapp.com/channel/0029VbBVnhSBlHpUWKo19m2m'
  const api = 'https://api.stellarwa.xyz'
  const git = 'https://github.com/DevAlexJs'
  const md = 'https://github.com/DevAlexJs/SakuraBot-MD'

  const redes = [canal, canal2, canal3, api, git, md]
  const randomRed = redes[Math.floor(Math.random() * redes.length)]

  const canales = Object.entries(global.my || {})
    .reduce((acc, [key, value]) => {
      if (key.startsWith('ch')) {
        const index = key.slice(2)
        const nombre = global.my[`name${index}`]
        if (nombre) acc.push({ id: value, nombre })
      }
      return acc
    }, [])

  const channelRD = canales[Math.floor(Math.random() * canales.length)] || { id: '120363422169517881@newsletter', nombre: '🎋 MagnosBot | CHANNEL 🌷' }

  const icon = 'https://stellarwa.xyz/files/1757378468505.jpeg'
  const thumbnail = await (await fetch(icon)).arrayBuffer()

  global.fake = {
    contextInfo: {
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: channelRD.id,
        serverMessageId: '',
        newsletterName: channelRD.nombre
      },
      externalAdReply: {
        title: botname,
        body: dev,
        mediaUrl: null,
        description: null,
        previewType: "PHOTO",
        thumbnail: Buffer.from(thumbnail),
        sourceUrl: randomRed,
        mediaType: 1,
        renderLargerThumbnail: false
      }
    }
  }

  global.rcanal = {
    contextInfo: {
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: channelRD.id,
        newsletterName: channelRD.nombre,
        serverMessageId: '0'
      }
    }
  }
    }
