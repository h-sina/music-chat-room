import {
  decryptByAES,
  encryptByAES,
} from '@/utils/cipher';
import {
  ifDecrypt,
  KEY,
} from '@/utils/setting';

/** 设置本地存储 */
export function setLocal(value) {
  const text = ifDecrypt
    ? encryptByAES(JSON.stringify(value))
    : JSON.stringify(value);
  window.localStorage[KEY] = text;
}

/** 获取本地存储 */
export function getLocal() {
  const text = window.localStorage.getItem(KEY);
  if (!text) return;
  return ifDecrypt ? JSON.parse(decryptByAES(text)) : text;
}

/** 清除本地存储 */
export function clearLocal() {
  const text = window.localStorage.removeItem(KEY);
}
