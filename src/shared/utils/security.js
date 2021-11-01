const crypto = require("crypto");


const generateRandomPassword = (
    length = 10,
    wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$'
    ) => 
        Array.from(crypto.randomFillSync(new Uint32Array(length)))
             .map((x) => wishlist[x % wishlist.length])
             .join('')

             
const encrypt = (text) => {
    const algorithm = "aes-256-cbc"; 
    const initVector = crypto.randomBytes(16);
    const Securitykey = crypto.randomBytes(32);
    const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

    let encryptedData = cipher.update(text, "utf-8", "hex");    
    encryptedData += cipher.final("hex");    
    return({iv: initVector.toString('hex'), key: Securitykey.toString('hex'), content: encryptedData});
}
module.exports = { generateRandomPassword, encrypt }
