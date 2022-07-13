import {
  decrypt,
  encrypt,
} from 'crypto-js/aes';
import UTF8, { parse } from 'crypto-js/enc-utf8';
import ECB from 'crypto-js/mode-ecb';
import pkcs7 from 'crypto-js/pad-pkcs7';

// aes encryption key
export const cacheCipher = {
  key: parse('_11111000001111@'),
  iv: parse('@11111000001111_'),
  // key: parse('1234123412ABCDEF'),
  // iv: parse('ABCDEF1234123412'),
};

function getOptions() {
  return {
    mode: ECB,
    padding: pkcs7,
    iv: cacheCipher.iv,
  };
}
export function encryptByAES(cipherText) {
  return encrypt(cipherText, cacheCipher.key, getOptions()).toString();
}

export function decryptByAES(cipherText) {
  return decrypt(cipherText, cacheCipher.key, getOptions()).toString(UTF8);
}
