export const handleWord = (str, myAudio) => {
  let arr = str.split('\n');
  let lrc = []; //创建歌词数组;
  lrc = arr;
  // let myAudio = $('audio')[0];
  let result = [];
  getLrc();
  let flagN = 0;
  function getLrc() {
    let timeReg = /\[\d{2}:\d{2}\.\d{2,3}\]/g; //匹配时间的正则表达式
    for (let i = 0; i < lrc.length; i++) {
      let time = lrc[i].match(timeReg); //获取歌词里的时间
      let value = lrc[i].replace(timeReg, ''); //获取纯歌词文本
      for (let j = 0; j < (time ? time.length : 0); j++) {
        let t = time[j].slice(1, -1).split(':'); //t[0]分钟，t[1]秒
        let timeArr = parseInt(t[0], 10) * 60 + parseFloat(t[1]);
        result.push([timeArr, value]); //以[时间(秒)，歌词]的形式存进result
      }
    }
    setInterval(showLrc, 100); //设置定时，每200毫秒更新一下
  }
  function showLrc() {
    let curTime = myAudio.currentTime; //获取当前的播放时间
    try {
      if (
        curTime > result[flagN][0] &&
        curTime < result[flagN + 1][0] &&
        result[flagN][1] &&
        document.getElementById('lyric').innerHTML !== result[flagN][1]
      ) {
        document.getElementById('lyric').innerHTML = result[flagN][1];
        flagN = flagN === result.length - 2 ? 0 : flagN + 1;
      }
    } catch {
      
    }
  }
};
