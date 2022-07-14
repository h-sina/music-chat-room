/** 分享到QQ */
export const shareToQQ = (param) => {
  var s = [];
  for (var i in param) {
    s.push(i + '=' + encodeURIComponent(param[i] || ''));
  }
  var targetUrl =
    'https://connect.qq.com/widget/shareqq/index.html?' + s.join('&');
  window.open(targetUrl, '_blank', 'height=520, width=720');
};
/** 分享到微信 */
export const shareToWeChat = (param) => {};
/** 分享到微博 */
export const shareToWebo = (param) => {
  var temp = [];
  for (var p in param) {
    temp.push(p + '=' + encodeURIComponent(param[p] || ''));
  }
  var targetUrl = 'http://service.weibo.com/share/share.php?' + temp.join('&');
  window.open(targetUrl, 'sinaweibo', 'height=800, width=800');
};
