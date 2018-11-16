const fetch = require('node-fetch');
const cheerio = require('cheerio');

fetch('https://www.blogger.com/video.g?token=AD6v5dy6xibQ1EBFaa1lN91Il9qch9W8dAnCVk8uDihtPVLuLwc0TUdSA24IP8gRMKqxIQQgenDZQFQA2pCYwQpH3O1iOKWxVfuapwPd6QIRDVKAtunBuMnh6ALvCUkLXhCqoH4RZ6D_')
.then(res=>res.text())
.then(res=>{
  const $ = cheerio.load(res);
  const data = $('script')[0].children[0]
  const rp = JSON.parse( data.data.replace('var VIDEO_CONFIG =',''))
  console.log(rp.streams[0])

})
