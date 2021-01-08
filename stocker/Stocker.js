
/* 

  주식정보분석 보조 시스템 Stocker
  모든 주식 관련 정보를 받아서
  가치를 측정 할 수 있도록 만든 사이트 

  회사의 가치는 하루 이틀사이에 가치가 변하진 않지만 주가는 오차값이 생길정도의 가격변동이 있다.
  - 회사의 가치를 측정할때는 한 점이 아닌 일정 기간 내의 평균값으로 측정해야 한다.
  - 또한 인간의 인지적인 오류로 인해 오차가 많이 생길 수 있음으로 오차값을 제거할 필요가 있다.

  회사의 가치와 다르게 시대적 흐름에 따라 가치가 떨어질 수 있다.
  - 시대적 흐름임을 구분하기 위해 다른 모든 종목들과 비교할 필요가 있다.
  
  시대적 흐름과 다르게 산업에 흐름에 따라 가치가 변동할 수 있다.
  - 그 산업의 비슷한 종목들과 비교할 필요가 있다.
  
  회사의 가치중에 미래를 예측하여 반영할수있는 선반영 가치가 존재한다.
  - 어느 기점 지표를 기준으로 한 과거의 주가를 확인함 

  기존의 흐름 외의 가치가 있을수 있다.
  - 다양한 지표를 갖고 실행해본다.

  과거를 반영하는 가치 현재를 반영하는 가치 미래를 반영하는 가치가 존재한다.

*/


/*
설치 요소 cmd

 npm install xml2json


*/


const http = require('http');
const fs = require('fs');
const request = require('request');
const convert = require('xml-js');

//딕셔너리로 번역 
var DungRak_map = {"1":"상한","2":"상승","3":"보합","4":"하한","5":"보합"}
var mapping = {"JongName":"종목명","CurJuka":"현재가","Debi":"전일대비","DungRak":"등락","PrevJuka":"전일종가","Volume":"거래량","Money":"거래대금","StartJuka":"시가","HighJuka":"고가","LowJuka":"저가","High52":"52주최고","Low52":"52주최저","UpJuka":"상한가","DownJuka":"하한가","Per":"PER","Amount":"상장주식수","FaceJuka":"액면가"}
var daily_mapping = {"day_Date":"일자","day_EndPrice":"종가","day_getDebi":"전일대비","day_Dungrak":"전일대비(등락)","day_Start":"시가","day_High":"고가","day_Low":"저가","day_Volume":"거래량","day_getAmount":"거래대금"}
var ask_mapping = {"member_memdoMem":"매도상위 증권사","member_memdoVol":"매도 거래량", "member_memsoMem":"매수상위 증권사", "member_mesuoVol":"매수 거래량"}

data = requestStockData('035720'); //데이터 연동이 잘 되고있는지 확인

http.createServer(function (req, res){
  // HTTP 서버 생성 알규먼트로 받은 request 는 요청, url 뒷부분이고 response 는 응답 페이지에 반영될때 사용
  var url = req.url;

  if(req.url == '/'  ){
    url = `/index.html`
  }

  res.writeHead(200, {'Content-Type': 'text/html'}); 
  // 종료 전에 사용 첫번째 인수는 상태를 의미하고 두번째 인수는 응답 정보의 헤더(데이터의 정보를 실어넣은 부분)를 의미한다.
  
  console.log(__dirname + url);
  //확인용

  res.end(fs.readFileSync(__dirname + url));
  //함수 종료를 알림

}).listen(8080); //전송 서버 




function requestStockData (tickerSymbol) { // 상장 코드를 통해 주식 정보를 반환한다. //xml에서 json으로 변환하고 이후 object 로 변환

  var requestURL =  'http://asp1.krx.co.kr/servlet/krx.asp.XMLSise?code=' + tickerSymbol; //요청 서버와 요청 종목 코드로 요청 URL 제작 

  request.get(requestURL, function (err, res, body){ //url을 통해 요청값을 받음
    
    if(err){
      console.log(`err : ${err}`);
    
    } else if(res.statusCode == 200) {   //xml의 입력 확인

        var JSONResult = convert.xml2json(body, {compact:true ,spaces:4 }); //xml파일을 json으로 변환해준다
        var object = JSON.parse(JSONResult);                                //object로 전환
        //var stockData = multipleObjectTrans(object);    
        console.log(object);                 
        console.log('result is = ', object.stockprice.TBL_DailyStock.DailyStock);             
          
        return JSONResult;     
      
    } else{
      console.log("상장 코드 오류");
    }
  });
}


function multipleObjectTrans(object){ //모든 오브젝트 키값을 확인하고 튜플에 있으면 변환하여 결과값에 넣어준다

  //key 값을 for문을 통해서 확인하고 저장한다 

}