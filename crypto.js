const CryptoJS = require("crypto-js");

function toWordArray(str) {
    return CryptoJS.enc.Utf8.parse(str);
}

function toString(words) {
    return CryptoJS.enc.Utf8.stringify(words);
}

function toBase64String(words) {
    return CryptoJS.enc.Base64.stringify(words);
}

exports.encrypt = function(user) {
    var key = "ZxlNEnojO5HbQngiYvrqu32Br6V";
    var PROTOCOL_AES256 = 2;
    var secret_key = CryptoJS.SHA256(key);

    var json_payload = JSON.stringify(user);

    var header = toWordArray("AMAZON" + String.fromCharCode(PROTOCOL_AES256));
    var iv = CryptoJS.lib.WordArray.random(16);
    var body = CryptoJS.AES.encrypt(json_payload, secret_key, { iv: iv });

    // construct the packet
    // HEADER + IV + BODY
    header.concat(iv);
    header.concat(body.ciphertext);

    // encode in base64
    return toBase64String(header);
}