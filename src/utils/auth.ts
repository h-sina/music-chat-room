import { store } from '@/store/index';
import { Memory } from '@/utils/cache';
import {
  clearLocal,
  getLocal,
  setLocal,
} from '@/utils/localStorage';

const localMemory = new Memory();
/** 设置认证 = 存储在缓存里 + 存储在本地 */
export const setAuth = (value) => {
  store.commit('setUserInfo', value.info);
  const now = new Date().getTime();
  const time = now + 1000 * 60 * 60 *24;
  // const time = 100*1000;
  localMemory.set(value, time);
  setLocal({token: value.token, info: value.info, time: time});
};

/** 获取认证 从缓存里 如果没有说明刷新 重新从本地获取 */
export const getAuth = () => {
  let token = localMemory.get();
  /** 没有token从本地获取 */
  if (!token) {
    const value = getLocal();
    if (!value) return null;
    /** 重新将本地的内容存储在缓存里 也要接收返回的结果 以防过期*/
    let result = localMemory.resetCache(value);
    if (result) {
      store.commit('setUserInfo', value.info);
    } else {
      return null;
    }
  }
  const value = localMemory.get();
  return value.token;
};

/** 清除认证 */
export const clearAuth = () => {
  clearLocal();
};
// export default {setAuth, getAuth};
