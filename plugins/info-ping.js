let handler = async (m, { conn }) => {
    const start = new Date().getTime();
    const { key } = await conn.sendMessage(m.chat, {text: `Status Charging 🫛`}, {quoted: m});
    const end = new Date().getTime();

    const latency = end - start;
    const seconds = (latency / 1000).toFixed(1);

    const uptime = process.uptime(); // en segundos
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const secondsUp = Math.floor(uptime % 60);
    const uptimeFormatted = `${hours}h ${minutes}m ${secondsUp}s`;

    const usedRAM = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2); // en MB

    setTimeout(async () => {
        let response = '╭━━━〔 *Info Bot* 〕━━⬣
 │  Hola 👋 @${m.sender.split('@')[0]}.
 │ 📍 \`Ping:\` ${latency} ms
 │ 🎌 \`Uptime:\` [ ${uptimeFormatted} ]
 │ 💾 \`RAM usada:\` ${usedRAM} MB
 ╰━━〔 *MAGNOS BOT* 〕━⬣`;
        await conn.sendMessage(m.chat, { text: response, edit: key, mentions: [m.sender] }, { quoted: m });
    }, latency);
};

handler.help = ['ping', 'p'];
handler.tags = ['info'];
handler.command = ['ping', 'p'];

export default handler;