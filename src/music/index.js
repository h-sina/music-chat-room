import axios from 'axios';

import musicRequest from '@/utils/musicRequest';

export const musicList = [
  'http://m802.music.126.net/20220713171219/b574e83c0bb47f9aa8f22b15c7b18092/jd-musicrep-ts/5204/3299/6d69/4e46e477f270ca9bd9277c2862f3cb84.mp3',
];
const data = {
  musicList: [],
};
export async function GetDmusicList() {
  const qid = await getD();
  const musicList = await getQ(qid);
  for (let i = 0; i < musicList.length; i++) {
    const url = await getL(musicList[i].id);
    if (url) {
      return url + ' ' + musicList[i].id;
    }
  }
  return null;
}

/** 获取歌单 */
async function getD() {
  return await musicRequest('get', '/personalized?limit=1')
    .then((res) => {
      const id = res.data.result[0].id;
      return Promise.resolve(id);
    })
    .catch((err) => {
      alert(err);
    });
}
/** 获取第一个歌单的全部歌曲 id:歌单id */
async function getQ(id) {
  return await musicRequest(
    'get',
    `/playlist/track/all?id=${id}&limit=10&offset=1`
  )
    .then((res) => {
      data.musicList = res.data.songs;
      return Promise.resolve(data.musicList);
    })
    .catch((err) => {
      alert(err);
    });
}
/** 一首歌的播放路径 id:歌曲id*/
async function getL(id) {
  return await musicRequest('get', `/song/url?id=${id}`)
    .then((res) => {
      return Promise.resolve(res.data.data[0].url);
    })
    .catch((err) => {
      alert(err);
    });
}
export const getWord = () => {
  axios
    .get('https://wyy-4u9j092ck-h-sina.vercel.app/lyric?id=33894312')
    .then((res) => {
      console.log(res.data);
      console.log(res.data.klyric.lyric);
    })
    .catch((err) => {
      alert(err);
    });
};
