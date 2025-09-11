const fs = require('fs')
const chalk = require('chalk')

global.owner = [
['51927303598'],
['51946200884'],
['51919199620'], 
['51927303598'],
['51946200884'],
['51919199620'],
//['51965763942']
]

global.wm = '© MagnosBot'
global.prefa = '.'
global.session = 'session'
global.vs = '2.0.0'
global.author = 'zam'
global.lolkey = 'GataDiosV3'
global.apis = 'https://delirius-apiofc.vercel.app'

global.mess = {
admin: 'Debes ser administrador para ejecutar esta función',
botAdmin: 'El bot debe ser administrador para ejecutar la función',
owner: 'Solo mi propietario puede hacer uso de este comando',
group: 'Esta función sólo funciona en chats grupales', 
private: 'Esta función sólo funciona en chats privados',
wait: '`Cargando...`'
}

global.link = 'https://whatsapp.com/channel/0029Vb6wMPa8kyyTpjBG9C2H'
global.fotos = 'https://i.postimg.cc/NGrhjVTv/IMG-20250909-WA0062.jpg'
global.Title = wm
global.Body = 'Omar Granda'

// IDs de canales
global.ch = {
ch1: '120363422169517881@newsletter',
ch2: '120363402079893698@newsletter',
ch3: '120363401008003732@newsletter',
ch4: '120363422169517881@newsletter',
ch5: '120363402079893698@newsletter',
ch6: '120363401008003732@newsletter',
ch7: '120363422169517881@newsletter',
ch8: '120363402079893698@newsletter', 
ch9: '120363401008003732@newsletter',
ch10: '120363422169517881@newsletter',
ch11: '120363402079893698@newsletter',
ch12: '120363401008003732@newsletter',
ch13: '120363422169517881@newsletter',
ch14: '120363402079893698@newsletter',
ch15: '120363401008003732@newsletter',
}

global.atob = (str) => Buffer.from(str, 'base64').toString('utf-8')
global.btoa = (str) => Buffer.from(str, 'utf-8').toString('base64')

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Actualización '${__filename}'`))
delete require.cache[file]
require(file)
})
