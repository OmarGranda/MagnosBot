const axios = require('axios')

module.exports = class Tiktok {
    constructor() {
        this.baseUrl = 'https://tikwm.com'
    }

    async download(url) {
        return new Promise(async (resolve, reject) => {
            if (!url) reject("Es necesario insertar una url.")
            
            const params = new URLSearchParams()
            params.append('url', url)
            params.append('hd', '1')
    
            const { data: result } = await axios({
                method: 'POST',
                url: this.baseUrl + '/api/',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Cookie': 'current_language=en',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
                },
                data: params
            })
            
            const data = result.data
            resolve({
                id: data.id,
                title: data.title,
                cover: data.cover,
                media: data.duration === 0
                  ? { 
                    type: 'image',
                    images: data.images,
                    image_count: data.images.length
                } : {
                    type: 'video',
                    duration: data.duration,
                    nowatermark: {
                        size: data.size,
                        play: data.play,
                        hd: {
                            size: data.hd_size,
                            play: data.hdplay
                        }
                    },
                    watermark: {
                        size: data.wm_size,
                        play: data.wmplay
                    }
                },
                creation: data.create_time,
                views_count: data.play_count,
                like_count: data.digg_count,
                comment_count: data.comment_count,
                share_count: data.share_count,
                favorite_count: data.collect_count,
                author: data.author,
                music: data.music_info
            })

        })
    }

    async search(query) {
        return new Promise(async (resolve, reject) => {
            const { data: result } = await axios({
                method: 'POST',
                url: this.baseUrl + '/api/feed/search/',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Cookie': 'current_language=en',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
                },
                data: {
                    keywords: query,
                    count: 10,
                    cursor: 0,
                    hd: 1
                }
            })
    
            const search = result.data.videos
    
            if (search.length === 0) {
                reject("No se encontraron videos.")
            }

            resolve(search.map(item => ({
                id: item.video_id,
                title: item.title,
                cover: item.cover,
                media: {
                    type: 'video',
                    duration: item.duration,
                    nowatermark: item.play,
                    watermark: item.wmplay
                },
                creation: item.create_time,
                views_count: item.play_count,
                like_count: item.digg_count,
                comment_count: item.comment_count,
                share_count: item.share_count,
                author: item.author,
                music: item.music_info
            })))
        })
    }

    async tend(region) {
        return new Promise(async (resolve, reject) => {
            const { data: result } = await axios({
                method: 'POST',
                url: this.baseUrl + '/api/feed/list/',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Cookie': 'current_language=en',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
                },
                data: {
                    region: region,
                    count: 12,
                    cursor: 0,
                    web: 1,
                    hd: 1
                }
            })

            const tend = result.data
            resolve(tend.map(item => ({
                id: item.video_id,
                title: item.title,
                cover: this.baseUrl + item.cover,
                media: {
                    type: 'video',
                    duration: item.duration,
                    nowatermark: this.baseUrl + item.play,
                    watermark: this.baseUrl + item.wmplay
                },
                creation: item.create_time,
                views_count: item.play_count,
                like_count: item.digg_count,
                comment_count: item.comment_count,
                share_count: item.share_count,
                author: {
                    id: item.author.id,
                    unique_id: item.author.unique_id,
                    nickname: item.author.nickname,
                    avatar: this.baseUrl + item.author.avatar
                },
                music: item.music_info
            }))) 
        })
    }
}

// const a = new Tiktok()
// a.download("https://www.tiktok.com/@muzzydatos/video/7395655592074956062").then(_ => console.log(_)).catch(_ => console.log(_))
// a.download("https://vm.tiktok.com/ZMh8cfdom/").then(_ => console.log(_)).catch(_ => console.log(_))

// a.search("anime").then(_ => console.log(_)).catch(_ => console.log(_))

// a.tend("US").then(_ => console.log(_)).catch(_ => console.log(_))
