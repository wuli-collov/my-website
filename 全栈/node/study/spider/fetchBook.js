const Book = require("../models/Book")
// 抓取https://book.douban.com/latest中的数据信息
const axios = require("axios").default;
const cheerio = require("cheerio");
const {
  SocksProxyAgent
} = require('socks-proxy-agent');
const proxyAgent = new SocksProxyAgent('socks5://127.0.0.1:7890');
// 获取
async function getBooksHTML(detailUrl) {
  try {
    const resp = await axios.get(detailUrl || "https://fanqienovel.com/?parent_enter_from=gg", {
      httpsAgent: proxyAgent,
      httpAgent: proxyAgent,
      timeout: 15000
    })
    return resp.data
  } catch (e) {
    return getBooksHTML(detailUrl)
  }
}
// 根据HTML,从网页中分析书籍信息
async function saveToDB(books) {
  console.log(books)
  await Book.bulkBuild(books)
  console.log("保存成功")
}
// 获取详情页链接
async function getBookList() {
  const html = await getBooksHTML()
  const $ = cheerio.load(html)
  const lis = $('#muye-home-top-rank-list .grid-16-8 li h2 a')
  const links = lis.map((i, ele) => {
    return ele.attribs['href']
  }).get()
  const array = links.map((m, index) => {
    return getBookDetail(m)
  })
  const all = await Promise.all(array)
  saveToDB(all)
}
async function getBookDetail(detailUrl) {
  const html = await getBooksHTML(detailUrl)
  const $ = cheerio.load(html)
  const name = $("h1").text().trim();
  const imgurl = $("#mainpic .nbg img").attr("src");
  const spans = $("#info span.pl");
  const authorSpan = spans.filter((i, ele) => {
    return $(ele).text().includes("作者");
  });
  const author = authorSpan.next("a").text();
  const publishSpan = spans.filter((i, ele) => {
    return $(ele).text().includes("出版年");
  });
  const publishDate = publishSpan[0].nextSibling.nodeValue.trim();
  const arr = [{
      name: "癫，癫，癫啊",
      imgurl: "https://p3-reading-sign.fqnovelpic.com/novel-pic/p2ob3650108869be31b54653c9eb86599a0~tplv-resize:200:260.image?lk3s=68b6d46a&x-expires=1755178193&x-signature=WKyDEW7ZDd%2FwwDaBYJwxRdYdiRY%3D",
      author: '盐',
      publishDate: '2025-01-31 03:09'
    },
    {
      name: '雾色靡靡',
      imgurl: 'https://p9-reading-sign.fqnovelpic.com/novel-pic/p2o39cacc2da4e972a84ebd6110c845f57c~tplv-resize:200:260.image?lk3s=68b6d46a&x-expires=1755178193&x-signature=o9Iicl%2Fc5H1eAotKxHMBjT%2FPpnE%3D',
      author: '陈若舟',
      publishDate: ''
    },
    {
      name: '',
      imgurl: '',
      author: '',
      publishDate: ''
    },
    {
      name: '',
      imgurl: '',
      author: '',
      publishDate: ''
    },
    {
      name: '',
      imgurl: '',
      author: '',
      publishDate: ''
    },
    {
      name: '',
      imgurl: '',
      author: '',
      publishDate: ''
    }
  ]
  return {
    name,
    imgurl,
    publishDate,
    author,
  };
}
getBookList()
// module.exports = getBooksHTML
