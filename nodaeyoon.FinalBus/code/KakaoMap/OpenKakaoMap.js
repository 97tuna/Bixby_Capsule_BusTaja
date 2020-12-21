/*
 * Last Update : 2019. 09. 20 (Friday)
 * Made By     : JongHeon LEE
 * Description : app-launch를 위한 js
 *               
 */
/************************************************************************/
/*                               Requires                               */
/************************************************************************/
var http    = require("http");
var console = require("console");
var config  = require("config");

module.exports.function = function OpenKakaoMap(MapURL) {
  let result = MapURL
  return result;
}
module.exports.SearchCity = function SearchCity (tmX,tmY) {
  var options =   {
    format: 'json',
    query: {
      appkey : 'xxxxxxxxx',
    },
    headers: {
      Authorization: 'KakaoAK xxxxxxxxx'
    }
  }
  const urlParameter = {'x': tmX,'y': tmY};
  var url = 'https://dapi.kakao.com/v2/local/geo/coord2address.json?input_coord=WGS84' + "&" + http.makeQueryString(urlParameter);

  var UserPoint = http.getUrl(url,options)
  let City = UserPoint.documents[0].address.region_1depth_name    //[0] type : B(법정동) 
  console.log(City)

  return City
}