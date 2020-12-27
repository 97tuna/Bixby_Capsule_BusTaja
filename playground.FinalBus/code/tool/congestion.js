/*
 * Last Update : 2019. 09. 12 (Thursday)
 * Made By     : JongHeon LEE
 * Description : 여유 보통 알려주기
 *               
 */

/************************************************************************/
/*                               Requires                               */
/************************************************************************/
var http    = require("http");
var console = require("console");
var config  = require("config");
var secret  = require("secret");
/************************************************************************/
/*                               Constant                               */
/************************************************************************/
const KEY           = secret.get('conkey');            
const BASEURL       = 'http://ws.bus.go.kr/api/rest/buspos/getBusPosByVehId'


module.exports.Congestion = function congestion (vehId1) {
  const urlParameter = {
    'vehId'      : vehId1
  };
  if(vehId1 == '0')return "차량 없음";   /// or 아무 값도 리턴하지 말던가 (예외처리 부분)
  const url = BASEURL + "?ServiceKey=" + KEY + "&" + http.makeQueryString(urlParameter);
  const xml = http.getUrl(url, { format: 'xmljs'}); 
  const CongestionList = xml.ServiceResult.msgBody.itemList.congetion; 
  if(CongestionList == '0')return "없음";
  else if(CongestionList == '3')return "여유";
  else if(CongestionList == '4')return "보통";
  else if(CongestionList == '5')return "혼잡";
  else if(CongestionList == '6')return "매우혼잡";
}
