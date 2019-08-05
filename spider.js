
const fs = require('fs'); 
const fetch = require("node-fetch");
const HttpProxyAgent = require('http-proxy-agent');
var plist = [];
var month='2019-05';
var date;


for(let day=1; day < 32; day++){      
    date = month + '-' + (day>9? day: ('0' + day));  

    var url = 'http://www.czce.com.cn/cn/DFSStaticFiles/Future/2019/'
        + date.replace(/-/g,'')+'/FutureDataDelsettle.txt';

    plist.push(fetch(url,{agent: new HttpProxyAgent("http://127.0.0.1:8888")}).then(response=>{return response.text()}));
};

var filename = './'+ month +'.txt';
var fileContent = '日期      |合约代码|卖方会员  |会员简称|买方会员  |会员简称|交割量（手）\r\n\r\n';
Promise.all(plist).then(result =>{

    for(let pi=0; pi<result.length; pi++){
        var contractCode;
        let date;
        let lines = result[pi].split('\r\n');
        for (let i = 0; i < lines.length; i++) {

            if (lines[i].match(/[A-Z0-9]{5}/) != null) {
                contractCode = lines[i].match(/[A-Z0-9]{5}/)[0];
            }
            if (lines[i].match(/\d{4}-\d{2}-\d{2}/) != null) {
                date = lines[i].match(/\d{4}-\d{2}-\d{2}/)[0];
            }
            if (lines[i].match(/期货\|/) != null) {

                lines[i] = date + "|" + contractCode + '   |' + lines[i];
                fileContent= fileContent + lines[i]+'\r\n';
            }
        }
    }

    fs.writeFile(filename,fileContent,err=>{if(err) throw err;});

}).catch(err=>console.log(err.message));




