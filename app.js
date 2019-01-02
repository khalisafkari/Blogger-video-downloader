const fetch = require('node-fetch');
const cheerio = require('cheerio');
const axios = require('axios');

return axios.get('http://anoboy.org/2018/11/jojo-no-kimyou-na-bouken-ougon-no-kaze-episode-8/').then(res=>{
    const $ = cheerio.load(res.data)('iframe').attr('data-src');
    if($.indexOf('https://www.blogger.com/') !== -1){
      return  v1($).then(res=>{
            return AES(res)
        })
    }else if($.indexOf('/uploads/btsingle.php?url=') !== -1){
      return v2(`http://anoboy.org${$}`).then(res=>{
        return AES(res)
       })
    }
})

function v1(item){
    return axios.get(item).then(res=>{
        const $ = cheerio.load(res.data);
        const src = $('script')[0].children[0];
        const dm = JSON.parse(src.data.replace('var VIDEO_CONFIG =',''))
        return dm.streams[0].play_url;
    })
}
function v2(item){
    return axios.get(item).then(res=>{
            const dt = cheerio.load(res.data);
            const hs = dt('iframe').attr('src');
            return axios.get(hs).then(response=>{
                const bg = cheerio.load(response.data);
                const src = bg('script')[0].children[0];
                const dm = JSON.parse(src.data.replace('var VIDEO_CONFIG =',''))
                return dm.streams[0].play_url
        })
    })
}

module.exports = {
    v1,
    v2
}