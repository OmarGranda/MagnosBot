import fetch from 'node-fetch';

let handler = async (m, { conn, args }) => {
    if (!args[0]) return m.reply('🍄 Ingresa el nombre de la canción para buscar en Spotify.');

    await m.react('🕓');

    try {
        let query = encodeURIComponent(args.join(" "));
        let searchRes = await fetch(`${api.url}/search/spotify?query=${query}&apikey=${api.key}`);
        let searchJson = await searchRes.json();

        if (!searchJson.status || !searchJson.data.length) 
            return m.reply(`No se encontraron resultados para *${args.join(" ")}*`);

        let song = searchJson.data[0];

        let dlRes = await fetch(`${api.url}/dow/spotify?url=${encodeURIComponent(song.url)}&apikey=${api.key}`);
        let dlJson = await dlRes.json();

        if (!dlJson.status) return m.reply('Error al descargar la canción.');

        let caption = `
*🎵 Título:* ${song.title}
*👤 Artista:* ${song.artist}
*💿 Álbum:* ${song.album}
*⏱ Duración:* ${song.duration}
*🔗 Link:* ${song.url}
        `.trim();

        await conn.sendMessage(m.chat, {
            image: { url: song.image },
            caption
        }, { quoted: m });

        await conn.sendMessage(m.chat, {
            audio: { url: dlJson.data.dl },
            mimetype: 'audio/mpeg',
            fileName: `${song.title}.mp3`
        }, { quoted: m });

    } catch (e) {
        console.log(e);
        m.reply('Ocurrió un error al buscar o descargar la canción.');
    }
};

handler.help = ["spotify"];
handler.tags = ["download"];
handler.command = ["spotify", "splay"];

export default handler;
