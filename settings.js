import { watchFile, unwatchFile } from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"

global.botNumber = ""

global.owner = [
  "51927303598", 
  "51965763942", 
  "51919199620", 
  "51946200884"
] 

global.botname = '𝗠𝗮𝗴𝗻𝗼𝘀𝗕𝗼𝘁'
global.namebot = '𝗠𝗮𝗴𝗻𝗼𝘀 𝗕𝗼𝘁'
global.bot = 'MagnosBot'
global.packname = '𝙈𝙖𝙜𝙣𝙤𝙨 𝘽𝙤𝙩'
global.wm = '𝙈𝙖𝙜𝙣𝙤𝙨 𝘽𝙤𝙩'
global.author = 'OmarGranda'
global.dev = '© Pᴏᴡᴇʀᴇᴅ Bʏ OmarGranda.'

global.banner = 'https://stellarwa.xyz/files/1757377941018.jpeg'
global.icon = 'https://stellarwa.xyz/files/1757378468505.jpeg'
global.currency = 'CryptoCoins'
global.sessions = 'sessions/session-bot'
global.jadi = 'sessions/session-sub'

global.api = { 
url: 'https://api.stellarwa.xyz',
key: 'Diamond'
}

global.my = {
  ch: '120363422169517881@newsletter',
  name: 'MagnosBot | CHANNEL',

  ch2: '120363401008003732@newsletter', 
  name2: '✦͙͙͙*ೃ༄ 𝑹𝒊𝒏 𝑰𝒕𝒐𝒔𝒉𝒊 | 𝑺𝒉𝒂𝒅𝒐𝒘`𝑪𝒐𝒓𝒆 ༄*ೃ✦',

  ch3: '120363402079893698@newsletter',
  name3: '𝐒𝐀𝐍𝐓𝐀𝐅𝐋𝐎𝐖 𝐁𝐎𝐓 | ° 𝘊𝘏𝘈𝘕𝘕𝘌𝘓- 𝗢𝗙𝗜𝗖𝗜𝗔𝗟🧪꙰⃟'',
}

const file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright(`Update "${file}"`))
  import(`${file}?update=${Date.now()}`)
})
