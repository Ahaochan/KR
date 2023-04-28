/*
大牌联合0428期

活动地址：https://jinggengjcq-isv.isvjcloud.com/jdbeverage/pages/oC20230428def/oC20230428def?actId=3f5fb79f590e40e8b574a2d206_230428

自行运行，有水无水自测。

变量填写：
黑名单 用&隔开 pin值
//export DPLHTY_blacklist="" 
重试次数，默认30
//export retrynum="30"
如需修改抽奖次数请设置环境变量：
//export opencard_draw="3" //次数

第一个账号助力作者 其他依次助力CK1
注意：第一个CK黑号会全部助力所填写的助力码
============Quantumultx===============
[task_local]
#大牌联合0428期
1 1 1 1 * jd_dplh0428.js, tag=大牌联合0428期, enabled=true
*/
let opencard_toShop = "false"
const $ = new Env("大牌联合0428期");
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [],
  cookie = '';
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
let retrynum = "30"
let opencard_draw = "0"
retrynum = $.isNode() ? (process.env.retrynum ? process.env.retrynum : retrynum) : ($.getdata('retrynum') ? $.getdata('retrynum') : opencard_draw);
opencard_draw = $.isNode() ? (process.env.opencard_draw ? process.env.opencard_draw : opencard_draw) : ($.getdata('opencard_draw') ? $.getdata('opencard_draw') : opencard_draw);
opencard_toShop = $.isNode() ? (process.env.opencard_toShop ? process.env.opencard_toShop : `${opencard_toShop}`) : ($.getdata('opencard_toShop') ? $.getdata('opencard_toShop') : `${opencard_toShop}`);
allMessage = ""
message = ""
$.hotFlag = false
$.outFlag = false
$.activityEnd = false
let lz_jdpin_token_cookie = ''
let activityCookie = ''
let Signz = ''
//此处修改助力码
let helpnum = ''
let KRDPLHTY = "3f5fb79f590e40e8b574a2d206_230428";
// let krWait = '35';
CryptoJS = $.isNode() ? require('crypto-js') : CryptoJS;
const getToken = require('./function/krgetToken');
const getH5st = require('./function/krh5st');
let domains = 'https://jinggengjcq-isv.isvjcloud.com';
helpnum = $.isNode() ? (process.env.helpnum ? process.env.helpnum : `${helpnum}`) : ($.getdata('helpnum') ? $.getdata('helpnum') : `${helpnum}`);
//krWait = $.isNode() ? (process.env.krWait ? process.env.krWait : `${krWait}`) : ($.getdata('krWait') ? $.getdata('krWait') : `${krWait}`);
let whitelist = '' // 白名单 用&隔开 pin值(填中文
let blacklist = '' // 黑名单 用&隔开 pin值(填中文
$.whitelist = process.env.DPLHTY_whitelist || whitelist // 白名单
$.blacklist = process.env.DPLHTY_blacklist || blacklist // 黑名单
getWhitelist()
getBlacklist()
!(async () => {
  authorCodeList = await getAuthorCodeList('http://code.kingran.ga/dplh.json')
  $.authorCode = helpnum ? helpnum : authorCodeList[random(0, authorCodeList.length)]
  // console.log('\n📢 请自行确认账号一是否黑号，黑号会全部助力当前助力')
  // console.log('\n📢 默认关闭浏览任务，请在有水的情况下开启变量\n')
  console.log('\n💬 当前ID：' + KRDPLHTY)
  // console.log('\n📢 当前助力：' + $.authorCode)
  console.log('\n💬 默认抽奖次数：' + opencard_draw + ' 💬 重试次数：' + retrynum)
  console.log('\n💬 请在有水的情况下运行')
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  // return
  $.appkey = '94854284'
  $.userId = '10299171'
  $.actId = KRDPLHTY
  $.MixNicks = ''
  $.inviteNick = $.authorCode
  for (let i = 0; i < cookiesArr.length; i++) {
    cookie = cookiesArr[i];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
      $.index = i + 1;
      message = ""
      $.bean = 0
      $.hotFlag = false
      $.nickName = '';
      $.UA = await getUa()
      console.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');
      await run();
      await $.wait(parseInt(Math.random() * 1000 + 1500, 10))
      // if (krWait) {
      // if ($.index != cookiesArr.length) {
      // console.log('\n防止403，暂时休整等待' + krWait + '秒~~~~~~~')
      // await $.wait(parseInt(krWait, 10) * 1000)
      // }
      // } else {
      // if ($.index % 1 == 0) console.log('每个账号延迟间隔默认30s')
      // if ($.index % 1 == 0) await $.wait(parseInt(Math.random() * 5000 + 30000, 10))
      // }
      //if(i == 0 && !$.MixNick) break
      if ($.outFlag || $.activityEnd) break
    }
  }
  if ($.outFlag) {
    let msg = '此ip已被限制，请过10分钟后再执行脚本'
    $.msg($.name, ``, `${msg}`);
    if ($.isNode()) await notify.sendNotify(`${$.name}`, `${msg}`);
  }
})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())
async function run() {
  try {
    $.hasEnd = true;
    $.outEnd = false;
    $.retry = false;
    $.krretry = false;
    $.krFlag = false;
    $.endTime = 0
    lz_jdpin_token_cookie = ''
    $.Token = ''
    $.Pin = ''
    $.MixNick = ''
    let flag = false
    if ($.activityEnd) return
    if ($.outFlag) {
      console.log('此ip已被限制，请过10分钟后再执行脚本\n')
      return
    }
    $.Token = await getToken(cookie, domains);
    if ($.Token == '') {
      console.log("❌ 获取TOKEN失败");
      return
    }
    await takePostRequest('activity_load');
    for (let i = 0; i < retrynum; i++) {
      if ($.retry || $.krretry) {

        await takePostRequest('activity_load');
        if ($.krFlag) break;
      }
    }
    if ($.hotFlag) return
    if ($.MixNick == '') {
      console.log("❌ 获取[活动信息]失败，可能是黑号"); return;
    }
    $.toBind = 0
    $.openList = []
    await takePostRequest('绑定');
    for (let i = 0; i < retrynum; i++) {
      if ($.retry || $.krretry) {
        await takePostRequest('绑定');
        if ($.krFlag) break;
      }
    }
    await takePostRequest('shopList');
    for (let i = 0; i < retrynum; i++) {
      if ($.retry || $.krretry) {
        await takePostRequest('shopList');
        if ($.krFlag) break;
      }
    }
    if ($.activityEnd) return
    for (o of $.openList) {
      $.missionType = 'openCard'
      if (o.open != true && o.openCardUrl) {
        if ($.activityEnd) return
        if ($.outEnd) return
        $.openCard = false
        $.joinVenderId = o.userId
        await takePostRequest('mission');
        for (let i = 0; i < retrynum; i++) {
          if ($.retry || $.krretry) {
            await takePostRequest('mission');
            if ($.krFlag) break;
          }
        }
        await $.wait(parseInt(Math.random() * 1000 + 1000, 10))
        if ($.openCard == true) {
          $.errorJoinShop = '';
          await joinShop()
          await $.wait(parseInt(Math.random() * 1000 + 1500, 10))
          if ($.errorJoinShop.indexOf('您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑') > -1) {
            return;
          }
          if ($.errorJoinShop.indexOf('活动太火爆，请稍后再试') > -1) {
            console.log("😤 呜呜呜，重试开卡");
            await $.wait(1000)
            await joinShop()
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10))
          }
          if ($.errorJoinShop.indexOf('活动太火爆，请稍后再试') > -1) {
            console.log('💔 无法开卡,跳过运行')
            return
          }
          await takePostRequest('activity_load');
          for (let i = 0; i < retrynum; i++) {
            if ($.retry || $.krretry) {

              await takePostRequest('activity_load');
              if ($.krFlag) break;
            }
          }
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10))
          // break
        }
      }
    }
    if ($.hasCollectShop === 0) {
      // 关注
      $.missionType = 'uniteCollectShop'
      await takePostRequest('mission');
      for (let i = 0; i < retrynum; i++) {
        if ($.retry || $.krretry) {
          await takePostRequest('mission');
          if ($.krFlag) break;
        }
      }
      await $.wait(parseInt(Math.random() * 1000 + 1000, 10))
    } else {
      console.log('💔 呜呜呜，已完成关注任务')
    }
    $.missionType = 'uniteAddCart'
    await takePostRequest('mission');
    for (let i = 0; i < retrynum; i++) {
      if ($.retry || $.krretry) {
        await takePostRequest('mission');
        if ($.krFlag) break;
      }
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10))
    if (opencard_toShop + "" == "true") {
      let count = 3
      console.log(`💖 默认浏览任务次数:${count}`)
      for (m = 1; count--; m++) {
        console.log(`🌐 第${m}次浏览`)
        $.missionType = 'viewShop'
        await takePostRequest('mission');
        for (let i = 0; i < retrynum; i++) {
          if ($.retry || $.krretry) {
            await takePostRequest('mission');
            if ($.krFlag) break;
          }
        }
        await $.wait(parseInt(Math.random() * 1000 + 1000, 10))
        $.missionType = 'viewGoods'
        await takePostRequest('mission');
        for (let i = 0; i < retrynum; i++) {
          if ($.retry || $.krretry) {
            await takePostRequest('mission');
            if ($.krFlag) break;
          }
        }
        await $.wait(parseInt(Math.random() * 1000 + 1000, 10))
        if (m >= 3) {
          console.log("💔 浏览太多次，多余的次数请再执行脚本")
          break
        }
      }
    } else {
      console.log('🔊 如需浏览店铺请设置环境变量[opencard_toShop]为"true"');
    }
    if (opencard_draw + "" !== "0") {
      $.runFalag = true
      let count1 = parseInt($.usedChance, 10)
      opencard_draw = parseInt(opencard_draw, 10)
      if (count1 > opencard_draw) count1 = opencard_draw
      console.log(`💖 抽奖次数为:${count1}`)
      for (m = 1; count1--; m++) {
        console.log(`🌐 第${m}次抽奖`)
        await takePostRequest('抽奖');
        for (let i = 0; i < retrynum; i++) {
          if ($.retry || $.krretry) {
            console.log("🔂 卡爆了，再重试一次");
            await takePostRequest('抽奖');
            if ($.krFlag) break;
          }
        }
        if ($.runFalag == false) break
        if (Number(count1) <= 0) break
        if (m >= 10) {
          console.log("💔 抽奖太多次，多余的次数请再执行脚本")
          break
        }
        await $.wait(parseInt(Math.random() * 2000 + 2000, 10))
      }
    } else console.log('🔊 如需抽奖请设置环境变量[opencard_draw]为"3" 3为次数');
    // await takePostRequest('myAward');
    // await takePostRequest('missionInviteList');
    // console.log($.MixNick)
    console.log(`🔊 当前助力:${$.inviteNick || "未获取到助力邀请码"}`)
    if ($.index == 1) {
      $.inviteNick = $.MixNick
      console.log(`🔊 后面的号都会助力:${$.inviteNick}`)
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10))
  } catch (e) {
    console.log(e)
  }
}
async function takePostRequest(type) {
  if ($.outFlag) return
  let domain = 'https://jinggengjcq-isv.isvjcloud.com';
  let body = ``;
  let method = 'POST'
  let admJson = ''
  switch (type) {
    case 'activity_load':
      url = `${domain}/dm/front/openCardNew/activity_load?open_id=&mix_nick=${$.MixNick || $.MixNicks || ""}`;
      admJson = { "jdToken": $.Token, "source": "01", "inviteNick": ($.inviteNick || "") }
      if ($.joinVenderId) admJson = { ...admJson, "shopId": `${$.joinVenderId}` }
      body = taskPostUrl("/openCardNew/activity_load", admJson);
      break;
    case 'shopList':
      url = `${domain}/dm/front/openCardNew/shop/openCardLoad?open_id=&mix_nick=${$.MixNick || $.MixNicks || ""}`;
      admJson = {}
      body = taskPostUrl("/openCardNew/shop/openCardLoad", admJson);
      break;
    case '绑定':
      url = `${domain}/dm/front/openCardNew/complete/mission?open_id=&mix_nick=${$.MixNick || $.MixNicks || ""}`;
      admJson = { "missionType": "relationBind", "inviterNick": ($.inviteNick || "") }
      body = taskPostUrl("/openCardNew/complete/mission", admJson);
      break;
    case 'mission':
      url = `${domain}/dm/front/openCardNew/complete/mission?open_id=&mix_nick=${$.MixNick || $.MixNicks || ""}`;
      admJson = { "missionType": $.missionType }
      if ($.joinVenderId) admJson = { ...admJson, "shopId": $.joinVenderId }
      body = taskPostUrl("/openCardNew/complete/mission", admJson);
      break;
    case '抽奖':
      url = `${domain}/dm/front/openCardNew/draw/post?open_id=&mix_nick=${$.MixNick || $.MixNicks || ""}`;
      admJson = { "dataType": "draw", "usedGameNum": "2" }
      body = taskPostUrl("/openCardNew/draw/post", admJson);
      break;
    case 'followShop':
      url = `${domain}/dm/front/openCardNew/followShop?open_id=&mix_nick=${$.MixNick || $.MixNicks || ""}`;
      admJson = { "actId": $.actId, "missionType": "collectShop" }
      body = taskPostUrl("/openCardNew/followShop", admJson);
      break;
    case 'addCart':
      url = `${domain}/dm/front/openCardNew/addCart?open_id=&mix_nick=${$.MixNick || $.MixNicks || ""}`;
      admJson = { "actId": $.actId, "missionType": "addCart" }
      body = taskPostUrl("/openCardNew/addCart", admJson);
      break;
    case 'myAward':
      url = `${domain}/dm/front/openCardNew/myAwards?open_id=&mix_nick=${$.MixNick || $.MixNicks || ""}`;
      admJson = { "pageNo": 1, "pageSize": 9999 }
      body = taskPostUrl("/openCardNew/myAwards", admJson);
      break;
    case 'missionInviteList':
      url = `${domain}/dm/front/openCardNew/missionInviteList?open_id=&mix_nick=${$.MixNick || $.MixNicks || ""}`;
      admJson = { "inviteListRequest": { "actId": $.actId, "userId": 10299171, "missionType": "shareAct", "inviteType": 1, "buyerNick": ($.MixNick || '') } }
      body = taskPostUrl("/openCardNew/missionInviteList", admJson);
      break;
    default:
      console.log(`错误${type}`);
  }
  let myRequest = getPostRequest(url, body, method);
  return new Promise(async resolve => {
    $.post(myRequest, (err, resp, data) => {
      try {
        if (err) {
          if (resp && resp.statusCode && resp.statusCode == 493) {
            console.log('此ip已被限制，请过10分钟后再执行脚本\n')
            $.outFlag = true
          }
          // if (JSON.stringify(err) === `\"Response code 403 (Forbidden)\"` || JSON.stringify(err) === `\"Response code 504 (Gateway Time-out)\"` || JSON.stringify(err) === `\"Response code 502 (Gateway Time-out)\"` || JSON.stringify(err) === `\"Response code 404 (Not Found)\"` || err.indexOf('Timeout') > -1) {
          // $.retry = true;
          // }
          $.retry = true;
          //console.log(err)
          //console.log(`${$.toStr(err,err)}`)
        } else {
          dealReturn(type, data);
        }
      } catch (e) {
        // console.log(data);
        console.log(e, resp)
      } finally {
        resolve();
      }
    })
  })
}
async function dealReturn(type, data) {
  let res = ''
  try {
    $.krFlag = true;
    if (type != 'accessLogWithAD' || type != 'drawContent') {
      if (data) {
        res = JSON.parse(data);
      }
    }
  } catch (e) {
    console.log(`🤬 ${type} 数据异常`);
    $.krretry = true;
    //console.log(e);
    $.runFalag = false;
  }
  try {
    let title = ''
    switch (type) {
      case 'accessLogWithAD':
      case 'drawContent':
        break;
      case 'activity_load':
      case 'mission':
      case 'shopList':
      case 'loadUniteOpenCard':
      case 'setMixNick':
      case 'uniteOpenCardOne':
      case 'checkOpenCard':
      case 'followShop':
      case 'addCart':
      case 'myAward':
      case 'missionInviteList':
      case '抽奖':
      case '绑定':
        title = ''
        if (type == "followShop") title = '关注'
        if (type == "addCart") title = '加购'
        if (typeof res == 'object') {
          if (res.success && res.success === true && res.data) {
            if (res.data.status && res.data.status == 200) {
              res = res.data
              if (type != "setMixNick" && (res.msg || res.data.isOpenCard || res.data.remark)) console.log(`🔊 ${title && title + ":" || ""}${res.msg || res.data.isOpenCard || res.data.remark || ''}`)
              if (type == "activity_load") {
                if (res.msg || res.data.isOpenCard) {
                  if ((res.msg || res.data.isOpenCard || '').indexOf('绑定成功') > -1) $.toBind = 1
                }
                if (res.data) {
                  $.endTime = res.data.cusActivity.endTime || 0
                  $.MixNick = res.data.buyerNick || ""
                  $.usedChance = res.data.missionCustomer.usedChance || 0
                  $.hasCollectShop = res.data.missionCustomer.hasCollectShop || 0
                }
              } else if (type == "shopList") {
                $.openList = res.data || []
              } else if (type == "mission") {
                if (res.data.remark.indexOf('不是会员') > -1) {
                  $.openCard = true
                } else {
                  $.openCard = false
                }
              } else if (type == "uniteOpenCardOne") {
                $.uniteOpenCar = res.msg || res.data.msg || ''
              } else if (type == "myAward") {
                console.log(`🔊 我的奖品：`)
                let num = 0
                let value = 0
                for (let i in res.data.list || []) {
                  let item = res.data.list[i]
                  value += Number(item.awardDes)
                }
                if (value > 0) console.log('🔊 共获得' + value + '京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n')
              } else if (type == "missionInviteList") {
                console.log(`🔊 邀请人数(${res.data.invitedLogList.total})`)
              }
            } else if (res.data.msg) {
              if (res.errorMessage.indexOf('活动未开始') > -1) {
                $.activityEnd = true
              }
              console.log(`🔊 ${res.data.msg || ''}`)
            } else if (res.errorMessage) {
              if (res.errorMessage.indexOf('火爆') > -1) {
                //$.hotFlag = true
              }
              console.log(`🔊 ${res.errorMessage || ''}`)
            } else {
              console.log(`${data}`)
            }
          } else if (res.errorMessage) {
            console.log(`🔊 ${res.errorMessage || ''}`)
          } else {
            console.log(`${data}`)
          }
        } else {
          // console.log(`${data}`)
        }
        break;
      default:
        console.log(`${title || type}-> ${data}`);
    }
    if (typeof res == 'object') {
      if (res.errorMessage) {
        if (res.errorMessage.indexOf('火爆') > -1) {
          //$.hotFlag = true
        }
      }
    }
  } catch (e) {
    // console.log(e)
  }
}
function getPostRequest(url, body, method = "POST") {
  let headers = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  }
  if (url.indexOf('https://jinggengjcq-isv.isvjcloud.com') > -1) {
    headers["Origin"] = `https://jinggengjcq-isv.isvjcloud.com`
    headers["Content-Type"] = `application/json; charset=utf-8`
    delete headers["Cookie"]
  }
  // console.log(headers)
  // console.log(headers.Cookie)
  return { url: url, method: method, headers: headers, body: body, timeout: 10 * 1000 };
}
function taskPostUrl(url, t) {
  d = { actId: $.actId, ...t, "method": url, userId: $.userId, "buyerNick": ($.MixNick || '') }
  sign2 = mpdzSign(d)
  const b = {
    "jsonRpc": "2.0",
    "params": {
      "commonParameter": {
        "appkey": $.appkey,
        "m": "POST",
        "sign": sign2.sign,
        "timestamp": sign2.timeStamp,
        userId: $.userId
      },
      "admJson": {
        actId: $.actId,
        ...t,
        "method": url,
        userId: $.userId,
        "buyerNick": ($.MixNick || '')
      }
    }
  }
  if (url.indexOf('missionInviteList') > -1) {
    delete b.params.admJson.actId
  }
  return $.toStr(b, b)
}


function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function mpdzSign(dy) {
  AppSecret = 'f461f7241bdf435b80e7fa61401b0cc8';
  key = '8749421456cf4b8a';
  time2 = (new Date).valueOf();
  s2 = encodeURIComponent(JSON.stringify(dy))
  c = new RegExp("'", "g")
  A = new RegExp("~", "g")
  s2 = s2.replace(c, "%27")
  s2 = s2.replace(A, "%7E")
  signBody = "r" + key + "K" + s2 + "O" + time2 + AppSecret
  sign = CryptoJS.MD5(signBody.toLowerCase()).toString()
  // console.log(sign);
  return { sign, timeStamp: time2 }
}

async function getUa() {
  // CryptoJS = $.isNode() ? require('crypto-js') : CryptoJS;
  id = CryptoJS.MD5(Date.now()).toString().substring(0, 16)
  CryptoJS.enc.Base64._map = 'KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/'
  const words = CryptoJS.enc.Utf8.parse(id)
  const uid = CryptoJS.enc.Base64.stringify(words)
  ep = encodeURIComponent(JSON.stringify({ "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=", "ts": (new Date).getTime(), "ridx": -1, "cipher": { "sv": "EG==", "ad": uid, "od": "", "ov": "Ctq=", "ud": uid }, "ciphertype": 5, "version": "1.2.0", "appname": "com.jingdong.app.mall" }))
  return `jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/${ep};jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36`
}
function randomString(e) {
  e = e || 32;
  let t = "abcdef0123456789", a = t.length, n = "";
  for (i = 0; i < e; i++)
    n += t.charAt(Math.floor(Math.random() * a));
  return n
}
function jsonParse(str) {
  if (typeof str == "string") {
    try {
      return JSON.parse(str);
    } catch (e) {
      console.log(e);
      $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie')
      return [];
    }
  }
}

async function joinShop() {
  if (!$.joinVenderId) return
  return new Promise(async resolve => {
    $.errorJoinShop = '活动太火爆，请稍后再试'
    let activityId = ``
    if ($.shopactivityId) activityId = `,"activityId":${$.shopactivityId}`
    const bodyStr = `{"venderId":"${$.joinVenderId}","shopId":"${$.joinVenderId}","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0${activityId},"channel":406}`;
    const req = {
      appid: "jd_shop_member",
      functionId: "bindWithVender",
      clientVersion: "9.2.0",
      client: "H5",
      body: JSON.parse(bodyStr)
    }
    for (var t = "", n = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", r = 0; r < 16; r++) {
      var i = Math.round(Math.random() * (n.length - 1));
      t += n.substring(i, i + 1)
    }
    uuid = Buffer.from(t, 'utf8').toString('base64')
    ep = encodeURIComponent(JSON.stringify({
      "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
      "ts": (new Date).getTime(),
      "ridx": -1,
      "cipher": {
        "screen": "CJS0CseyCtK4",
        "osVersion": "CJGkEK==",
        "uuid": uuid
      },
      "ciphertype": 5,
      "version": "1.0.3",
      "appname": "com.360buy.jdmobile"
    }))
    const h5st = await getH5st('8adfb', req);
    const options = {
      url: `https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=${bodyStr}&ef=1&ep=${ep}&clientVersion=9.2.0&client=H5&uuid=88888&h5st=${encodeURIComponent(h5st)}`,
      headers: {
        'accept': '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        'cookie': cookie,
        'origin': 'https://shopmember.m.jd.com/',
        'user-agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36",
      }
    }
    // console.log(options)
    $.get(options, async (err, resp, data) => {
      try {
        if (err) {
          if (resp && typeof resp.statusCode != 'undefined') {
            if (resp.statusCode == 403) {
              console.log('此ip已无法开卡，请更换IP后再执行脚本\n')
              // $.outFlag = true
            }
          }
        } else {
          data = data && data.match(/jsonp_.*?\((.*?)\);/) && data.match(/jsonp_.*?\((.*?)\);/)[1] || data
          // console.log(data)
          let res = $.toObj(data, data);
          if (res && typeof res == 'object') {
            if (res && res.success === true) {
              console.log(` >> ${res.message}`)
              $.errorJoinShop = res.message
              if (res.result && res.result.giftInfo) {
                for (let i of res.result.giftInfo.giftList) {
                  console.log(` >> 入会获得：${i.discountString}${i.prizeName}${i.secondLineDesc}`)
                }
              }
            } else if (res && typeof res == 'object' && res.message) {
              $.errorJoinShop = res.message
              console.log(`${res.message || ''}`)
            } else {
              console.log(data)
            }
          } else {
            console.log(data)
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}
async function getshopactivityId() {
  return new Promise(async resolve => {
    const bodyStr = `{"venderId":"${$.joinVenderId}","channel":406,"payUpShop":true}`;
    const req = {
      appid: "jd_shop_member",
      functionId: "bindWithVender",
      clientVersion: "9.2.0",
      client: "H5",
      body: JSON.parse(bodyStr)
    }
    await $.wait(1000)
    const h5st = await getH5st('8adfb', req);
    const options = {
      url: `https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=${bodyStr}&clientVersion=9.2.0&client=H5&uuid=88888&h5st=${encodeURIComponent(h5st)}`,
      headers: {
        'accept': '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        'cookie': cookie,
        'origin': 'https://shopmember.m.jd.com/',
        'user-agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36",
      }
    }
    $.get(options, async (err, resp, data) => {
      try {
        if (err) {
          if (resp && typeof resp.statusCode != 'undefined') {
            if (resp.statusCode == 403) {
              console.log('此ip已无法开卡，请更换IP后再执行脚本\n')
              // $.outFlag = true
            }
          }
        } else {
          data = data && data.match(/jsonp_.*?\((.*?)\);/) && data.match(/jsonp_.*?\((.*?)\);/)[1] || data
          // console.log(data)
          let res = $.toObj(data, data);
          if (res && typeof res == 'object') {
            if (res && res.success == true) {
              // console.log($.toStr(res.result))
              console.log(`去加入：${res.result.shopMemberCardInfo.venderCardName || ''} (${$.joinVenderId})`)
              $.shopactivityId = res.result.interestsRuleList && res.result.interestsRuleList[0] && res.result.interestsRuleList[0].interestsInfo && res.result.interestsRuleList[0].interestsInfo.activityId || ''
            }
          } else {
            console.log(data)
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

function getAuthorCodeList(url) {
  return new Promise((resolve) => {
    const options = {
      url: `${url}?${new Date()}`,
      timeout: 10000,
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88",
      },
    };
    $.get(options, async (err, resp, data) => {
      try {
        if (err) {
          // $.log(err)
          $.getAuthorCodeListerr = false;
        } else {
          if (data) data = JSON.parse(data);
          $.getAuthorCodeListerr = true;
        }
      } catch (e) {
        $.logErr(e, resp);
        data = null;
      } finally {
        resolve(data);
      }
    });
  });
}
function random(min, max) {

  return Math.floor(Math.random() * (max - min)) + min;

}
/**
 * 黑名单
 */
function getBlacklist() {
  if ($.blacklist == '') return
  console.log('当前已设置黑名单：')
  const result = Array.from(new Set($.blacklist.split('&'))) // 数组去重
  console.log(result.join('&') + '\n')
  let blacklistArr = result
  let arr = []
  let g = false
  for (let i = 0; i < cookiesArr.length; i++) {
    let s = decodeURIComponent((cookiesArr[i].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[i].match(/pt_pin=([^; ]+)(?=;?)/)[1]) || '')
    if (!s) break
    let f = false
    for (let n of blacklistArr) {
      if (n && n == s) {
        f = true
        break
      }
    }
    if (!f) {
      g = true
      arr.splice(i, -1, cookiesArr[i])
    }
  }
  if (g) cookiesArr = arr
}
// 数组置顶移动
function toFirst(arr, index) {
  if (index != 0) {
    arr.unshift(arr.splice(index, 1)[0])
  }
}
/**
 * 白名单
 */
function getWhitelist() {
  if ($.whitelist == '') {
    helpCookiesArr = $.toObj($.toStr(cookiesArr, cookiesArr))
    return
  }
  console.log('当前已设置白名单：')
  const result = Array.from(new Set($.whitelist.split('&'))) // 数组去重
  console.log(result.join('&') + '\n')
  let arr = []
  let whitelistArr = result
  for (let i in cookiesArr) {
    let s = decodeURIComponent((cookiesArr[i].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[i].match(/pt_pin=([^; ]+)(?=;?)/)[1]) || '')
    if (whitelistArr.includes(s)) {
      arr.push(cookiesArr[i])
    }
  }
  helpCookiesArr = arr
  if (whitelistArr.length > 1) {
    for (let n in whitelistArr) {
      let m = whitelistArr[whitelistArr.length - 1 - n]
      if (!m) continue
      for (let i in helpCookiesArr) {
        let s = decodeURIComponent(helpCookiesArr[i].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[i].match(/pt_pin=([^; ]+)(?=;?)/)[1])
        if (m == s) {
          toFirst(helpCookiesArr, i)
        }
      }
    }
  }
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }