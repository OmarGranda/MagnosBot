import yts from 'yt-search';
import fetch from 'node-fetch';
const limit = 100;

const isYTUrl = (url) => /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/i.test(url);

const handler = async (m, { conn, text, command }) => {
  try {
    if (!text.trim()) {
      return conn.reply(m.chat, `🕸 Ingresa el nombre de la música o una URL de YouTube.`, m);
    }

    const esURL = isYTUrl(text);
    let url, title;

    if (!esURL) {
      const search = await yts(text);
      if (!search.all.length) return m.reply('❌ No se encontraron resultados.');

      const videoInfo = search.all[0];
      ({ title, url } = videoInfo);

      const vistas = (videoInfo.views || 0).toLocaleString();
      const canal = videoInfo.author?.name || 'Desconocido';
      const infoMessage = ` *ＹＯＵＴＵＢＥ - ＰＬＡＹ*
⏳ Descargando : *${title}*
> Canal 🎬 : *${canal}*
> Duración ⏰ : *${videoInfo.timestamp}*
> Vistas 👀 : *${vistas}*
> Publicado 🗓️ : *${videoInfo.ago}*
> Enlace 🔗 : *${url}*

${dev}`;

      const thumb = (await conn.getFile(videoInfo.thumbnail))?.data;
      await conn.sendMessage(m.chat, { image: thumb, caption: infoMessage }, { quoted: m });
    } else {
      url = text;
    }

    if (['play', 'mp3', 'playaudio', 'ytmp3'].includes(command)) {
      const response = await fetch(`${api.url}/dow/ytmp3v2?url=${encodeURIComponent(url)}&apikey=${api.key}`);
      const result = await response.json();

      if (!result.status || !result.data) return m.reply('❌ Error al descargar el audio.');

      const { dl, title } = result.data;

      await conn.sendMessage(
        m.chat,
        {
          audio: { url: dl },
          fileName: `${title}.mp3`,
          mimetype: 'audio/mpeg',
          ptt: false
        },
        { quoted: m }
      );
    } else if (['play2', 'mp4', 'playvideo', 'ytmp4'].includes(command)) {
      const response = await fetch(`${api.url}/dow/ytmp4v2?url=${url}&apikey=${api.key}`);
      const result = await response.json();

      if (!result.status || !result.data) return m.reply('❌ Error al descargar el video.');

      const { dl, title } = result.data;

      const res = await fetch(dl);
      const contentLength = res.headers.get('Content-Length');
      const fileSize = parseInt(contentLength || '0', 10) / (1024 * 1024);
      const asDocument = fileSize >= limit;

      await conn.sendMessage(
        m.chat,
        {
          video: { url: dl },
          fileName: `${title}.mp4`,
          mimetype: 'video/mp4',
          caption: dev,
         // ptv: true,
          asDocument
        },
        { quoted: m }
      );
     } 
  } catch (e) {
    await m.reply('❌ Error.');
  }
};

handler.command = handler.help = ['play', 'mp3', 'playaudio', 'ytmp3', 'play2', 'mp4', 'playvideo', 'ytmp4'];
handler.tags = ['dow'];

export default handler;