import CryptoJS from 'crypto-js';
const md5 = (str) => CryptoJS.MD5(str).toString().toUpperCase();

export { md5 };