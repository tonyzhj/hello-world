const CryptoJS = require('crypto-js'); //引用AES源码js 
const key = CryptoJS.enc.Utf8.parse("4KE98FE9DKR9E3JS"); //十六位十六进制数作为密钥 
const iv = CryptoJS.enc.Utf8.parse('4KE98FE9DKR9E3JS'); //十六位十六进制数作为密钥偏移量 

//解密方法 
function Decrypt(word) { 
    //let encryptedHexStr = CryptoJS.enc.Hex.parse(word); 
    //let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr); 
    let decrypt = CryptoJS.AES.decrypt(word, 
        key, { 
            iv: iv, 
            mode: CryptoJS.mode.CBC, 
            padding: CryptoJS.pad.ZeroPadding }); 
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8); 
    return decryptedStr.toString(); 
}
//加密方法 
function Encrypt(word) { 
    let srcs = CryptoJS.enc.Utf8.parse(word); 

    let encrypted = CryptoJS.AES.encrypt(
        srcs, 
        key, 
        { iv: iv, 
          mode: CryptoJS.mode.CBC, 
          padding: CryptoJS.pad.ZeroPadding }); 
    //return encrypted.ciphertext.toString().toUpperCase(); 
    return encrypted.toString();
} 

console.log(Encrypt('jiaotong055'));
console.log(Decrypt('6pz+QSiG7lGDxknPec7Ivw=='));