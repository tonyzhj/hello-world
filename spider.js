var month='2019-07';
var date;
var day=1;
var fs = require('fs'); 
var iconv = require('iconv-lite');

//fetchDealInfoByMonth2();
for(let day=1; day < 31; day++){      
    date = month + '-' + (day>9? day: ('0' + day));  
    fetchDealInfoByDate2(date);
};

function fetchDealInfoByMonth2()
{    
    day = day +1;
    date = month + '-' + (day>9? day: ('0' + day));  

    if(day < 31){
        fetchDealInfoByDateSync(date).then(function(data){
            fetchDealInfoByMonth2();
        });
    }
}

function fetchDealInfoByDate(date) {

    var request = require("request");
    var url = 'http://www.czce.com.cn/cn/DFSStaticFiles/Future/2019/'
            + date.replace(/-/g,'')+'/FutureDataDelsettle.txt';
      
    request(url, function (error, response, body) { 
        if (!error && response.statusCode == 200) {
            var contractCode; 
            var lines = body.split('\r\n');
            for (let i=0;i<lines.length; i++){
    
                if(lines[i].match(/[A-Z0-9]{5}/) != null){
                    contractCode = lines[i].match(/[A-Z0-9]{5}/)[0];
                }
                if(lines[i].match(/期货\|/) != null){
                    console.log(date + "|" + contractCode + '|'+ lines[i]+ '|'+ new Date().getSeconds());
                }
            }
        }
    });    
}

function fetchDealInfoByDate2(date) {

    var fetch = require("node-fetch");
    var url = 'http://www.czce.com.cn/cn/DFSStaticFiles/Future/2019/'
            + date.replace(/-/g,'')+'/FutureDataDelsettle.txt';
      
    fetch(url).then(response=>{
        response.text().then(body=>{
            var contractCode; 
            var lines = body.split('\r\n');
            for (let i=0;i<lines.length; i++){
    
                if(lines[i].match(/[A-Z0-9]{5}/) != null){
                    contractCode = lines[i].match(/[A-Z0-9]{5}/)[0];
                }
                if(lines[i].match(/期货\|/) != null){

                    lines[i] = date + "|" + contractCode + '|'+ lines[i] + '\r\n';
                    console.log(lines[i] );
                    fs.appendFile('./try4.txt',lines[i],err=>{if(err) throw err;});
                }
            }
        })
    });  
}

function fetchDealInfoByDateSync(date) {

    var request = require("request");
    var url = 'http://www.czce.com.cn/cn/DFSStaticFiles/Future/2019/'
            + date.replace(/-/g,'')+'/FutureDataDelsettle.txt';
         
    return new Promise(function (resolve, reject) {

        request(url, function (error, response, body) { 
            if (!error && response.statusCode == 200) {
                var contractCode; 
                var lines = body.split('\r\n');
                for (let i=0;i<lines.length; i++){
        
                    if(lines[i].match(/[A-Z0-9]{5}/) != null){
                        contractCode = lines[i].match(/[A-Z0-9]{5}/)[0];
                    }
                    if(lines[i].match(/期货\|/) != null){
                        console.log(date + "|" + contractCode + '|'+ lines[i]+ '|'+ new Date().getSeconds());
                    }
                }
            }
            resolve(body);
        });  
    });
}


