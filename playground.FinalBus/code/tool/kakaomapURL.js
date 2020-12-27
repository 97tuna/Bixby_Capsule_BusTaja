/*
 * Last Update : 2019. 09. 20 (Friday)
 * Made By     : JongHeon LEE
 * Description : 카카오 맵 link 만들어 주기
 *               
 */

/************************************************************************/
/*                               Requires                               */
/************************************************************************/
var http    = require("http");
var console = require("console");
var config  = require("config");

module.exports.KakaomapURL = function kakaomapURL (longitude, latitude, StationName) {
  let url = "https://map.kakao.com/link/map/"+StationName+","+latitude+","+longitude
  return url
}
