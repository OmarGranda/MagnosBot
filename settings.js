import { watchFile, unwatchFile } from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"

global.botNumber = ""

global.owner = ["5492916450307"]

global.botname = '🕸 SakuraBot-MD'
global.namebot = '🥗 Sakura Bot'
global.bot = 'SakuraBot'
global.packname = '🐸 𝗦𝗮𝗸𝘂𝗿𝗮𝗕𝗼𝘁-𝗠𝗗'
global.wm = '🌿 𝙎𝙖𝙠𝙪𝙧𝙖𝘽𝙤𝙩-𝙈𝘿'
global.author = '🥗 DevAlexJs'
global.dev = '© Pᴏᴡᴇʀᴇᴅ Bʏ DᴇᴠAʟᴇxJs.'

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
  ch: '120363420992828502@newsletter',
  name: '₊· ͟͟͞͞꒰ ✩ 𝐒𝐭𝐞𝐥𝐥𝐚𝐫 𝐖𝐚𝐁𝐨𝐭 - 𝐎𝐟𝐟𝐢𝐜𝐢𝐚𝐥 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 ⏤͟͟͞͞✿',

  ch2: '120363203805910750@newsletter', 
  name2: '⚶ ⊹ Max Evolution𝄢 ⊹',

  ch3: '120363419837575209@newsletter',
  name3: '⚶ ⊹ Night ⚡︎ Light - Team 𝄢 ⊹',

  ch4: '120363404511074294@newsletter',
  name4: '₊· ͟͟͞͞꒰ ✩ 𝐒𝐡𝐚𝐝𝐨𝐰 𝐖𝐚𝐁𝐨𝐭 - 𝐎𝐟𝐟𝐢𝐜𝐢𝐚𝐥 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 ⏤͟͟͞͞✿'
}

const file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright(`Update "${file}"`))
  import(`${file}?update=${Date.now()}`)
})
