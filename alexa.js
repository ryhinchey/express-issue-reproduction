const fs = require('fs');
const path = require('path');
const got = require('got');

// https://www.alexa.com/topsites
const sites = [
  "https://google.com",
  "https://youtube.com",
  "https://tmall.com",
  "https://facebook.com",
  "https://baidu.com",
  "https://qq.com",
  "https://sohu.com",
  "https://login.tmall.com",
  "https://taobao.com",
  "https://360.cn",
  "https://jd.com",
  "https://yahoo.com",
  "https://wikipedia.org",
  "https://amazon.com",
  "https://sina.com.cn"
]

const userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36";

async function getTopSites() {
  const promises = sites.map(site => got(site, { headers: { 'User-Agent': userAgent } }));

  const responses = await Promise.all(promises);

  return responses;
}

function formatCookies(responses) {
  const cookies = {};

  for (let i = 0; i < responses.length; i++) {
    const response = responses[i];
    const url = sites[i];
    const setCookieHeader = response.headers['set-cookie'];

    if (setCookieHeader) {
      const cookieNameValues = setCookieHeader.map(cookie => cookie.split(';')[0])
      cookies[url] = cookieNameValues.join(';')
    }
  }

  return cookies;
}

function writeData(cookies) {
  const dataDir = path.join(process.cwd(), 'data');
  fs.mkdirSync(dataDir, { recursive: true });

  const dataFile = path.join(process.cwd(), 'data', 'topSites.json');
  fs.writeFileSync(dataFile, JSON.stringify(cookies, null, 2));
}


async function run() {
  const responses = await getTopSites();
  const cookies = formatCookies(responses);
  writeData(cookies);
}

run();
