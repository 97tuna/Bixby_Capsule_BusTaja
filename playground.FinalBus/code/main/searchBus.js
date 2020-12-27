/*
 * Last Update : 2019. 09. 22 (Sunday)
 * Made By     : MinSang Kim, JongHeon LEE
 * Description : 가독성을 위해 변수명 수정 및 구조 개선
 *               예외처리 수정
 */

/************************************************************************/
/*                               Requires                               */
/************************************************************************/
var http    = require("http");
var console = require("console");
var config  = require("config");
var secret  = require("secret");
var tool    = require('KakaoMap/OpenKakaoMap.js');
var tool2   = require('tool/congestion.js');
/************************************************************************/
/*                               Constant                               */
/************************************************************************/
const ip = config.get('ip');
const port = config.get('port');
const BASEURL = 'http://'+ip+':'+port+'/searchBus';
const SearchRadius = 400;
const KEY = secret.get('key');
const IKEY = secret.get('Ikey');
const CONKEY = secret.get('conkey');
/************************************************************************/
/*                               Function                               */
/************************************************************************/

module.exports.function = function searchBus(location, BusNumber) {
  const longitude = location.longitude;
  const latitude = location.latitude;
  console.log(tool.SearchCity(longitude, latitude))
  let UrlParameter = {
    'X': longitude,
    'Y': latitude,
    'radius': SearchRadius,
    'City': tool.SearchCity(longitude, latitude),
    'BusNumber': BusNumber,
  };
  var url = BASEURL + "?key=" + KEY + "&Ikey=" + IKEY + "&conkey=" + CONKEY + "&" + http.makeQueryString(UrlParameter);

  try {
    const BusList = http.getUrl(url, { format: "json" , cacheTime: 10});
    console.log(BusList)
  }
  catch (err) {
    console.log(" * ERROR : " + err);
  }
  return BusList;
}