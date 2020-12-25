const http = require('http');
const fs = require('fs');

/* NodeJs 샘플 코드 */


var request = require('request');

var requestUrl = 'http://api.seibro.or.kr/openapi/service/StockSvc/getStkIsinByNmN1'; /* 주식 api 정보 받아오는 서버 */ 
var serviceKeyCode = '?' + encodeURIComponent('ServiceKey') + '=jT96g44APiBlpPA65mds2bjSH2Z7ThwW5L52pLeYPNq9y1O0a3lewFQrGpe9M%2FgGlfJrc56UN7kyNpZJqlg4%2Fg%3D%3D'; /* Service Key*/

// 요청 사항 URL 
var queryParams = '&' + encodeURIComponent('shortlsin') + '=' + encodeURIComponent('KRX: 005930'); /* */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('2'); /* */
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */



request({
  url: requestUrl + serviceKeyCode + queryParams ,
  method: 'GET'
}, function (error, response, body) {
  console.log('Status');
  console.log('Headers', JSON.stringify(response.headers));
  console.log('Reponse received', body);
});





http.createServer(function (req, res){
  // HTTP 서버 생성 request 는 요청이다 url 검색할때 사용, response 는 응답 페이지에 반영될때 사용
  var url = req.url;

  if(req.url == '/'  ){
    url = `/index.html`
  }


  res.writeHead(200, {'Content-Type': 'text/html'}); 
  // 종료 전에 사용 첫번째 인수는 상태를 의미하고 두번째 인수는 응답 정보의 헤더(데이터의 정보를 실어넣은 부분)를 의미한다.
  



  console.log(__dirname + url);
  res.end(fs.readFileSync(__dirname + url));
  //함수 종료를 알림


}).listen(8080); //전송 서버 