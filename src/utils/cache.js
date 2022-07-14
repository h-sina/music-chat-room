import { KEY } from '@/utils/setting';

export class Memory {
  /** 根据key来获取value */
  cache = {};
  alive;
  getCache(key = KEY) {
    return this.cache[key];
  }
  setCache(value, key = KEY) {
    this.cache[key] = value;
  }
  get() {
    const now = new Date().getTime();
    if (this.alive < now) {
      /** 删除指定key */
      window.localStorage.removeItem(KEY);
      /** 清空localStorage */
      window.localStorage.clear();
      return null;
    }
    return this.getCache();
  }
  set(value, time) {
    this.setCache(value);
    const now = new Date().getTime();
    /** alive单位为天 */
    this.alive = time;
    // this.alive = now + time * 1000;
  }
  resetCache(value) {
    const now = new Date().getTime();
    if (value.time > now) {
      this.setCache(value);
      this.alive = value.time;
    }
  }
}
