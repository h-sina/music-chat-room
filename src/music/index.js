import axios from 'axios';

export const musicList = [
  'http://m7.music.126.net/20220713133632/cc5aa5a330e23bcc23d96cb26d1532fb/ymusic/a81e/e3e4/7fa3/c3fb27597dab7ace95eedf104eb028e3.mp3',
  'http://m7.music.126.net/20220713135121/ca4b2c96528c0061518689eec0a2286a/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/2600606923/b00d/2a1b/efed/fed31f328154899ae0517ee03cd6f60c.mp3',
  'http://m8.music.126.net/20220713135151/4bca9973afefd260ace5813ccdaae79e/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/2673728153/c890/b970/bf35/4c90df0f58370b597e8934b1b8f22c01.mp3',
];
const data = {
  typeList: [],
  musicList: [],
};
let url = '';
export const DmusicList = () => {
  axios
    .get('https://wyy-4u9j092ck-h-sina.vercel.app/personalized?limit=1')
    .then((res) => {
      // console.log(res.data.result);
      data.typeList = res.data.result;
      // console.log(data.typeList);
      for (let i = 0; i < data.typeList.length; i++) {
        axios
          .get(
            `https://wyy-4u9j092ck-h-sina.vercel.app/playlist/track/all?id=${data.typeList[i].id}&limit=8&offset=1`
          )
          .then((res) => {
            data.musicList = res.data.songs;
            url = data.musicList[parseInt(Math.random() * 8)];
            console.log(url);
            // console.log(res.data.songs);
          })
          .catch((err) => {
            alert(err);
          });
      }
    })
    .catch((err) => {
      alert(err);
    });
  return url;
};

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
