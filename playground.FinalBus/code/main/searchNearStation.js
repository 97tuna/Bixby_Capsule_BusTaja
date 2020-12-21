/*
 * Last Update : 2019. 09. 20 (Friday)
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
const BASEURL = 'http://'+ip+':'+port+'/searchNearStation';
const SearchRadius = 200;
const KEY = secret.get('key');
const IKEY = secret.get('Ikey');
const CONKEY = secret.get('conkey');
/************************************************************************/
/*                               Function                               */
/************************************************************************/
module.exports.function = function searchNearStation(location) {
  const tmX = location.longitude;
  const tmY = location.latitude;

  let UrlParameter = {
    'X': tmX,
    'Y': tmY,
    'radius': SearchRadius,
    'City': tool.SearchCity(tmX, tmY),
  };
  var url = BASEURL + "?key=" + KEY + "&Ikey=" + IKEY + "&conkey=" + CONKEY + "&" + http.makeQueryString(UrlParameter);
  
  var StationResultList;
  try {
    StationResultList = http.getUrl(url, { format: "json", cacheTime: 10 });
  }
  catch (err) {
    console.log(err);
  }

  return StationResultList;
}