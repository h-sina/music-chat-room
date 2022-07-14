/** 全屏 */
export const fullScreen = () => {
  var elem = document.getElementsByClassName('chatRoom')[0];
  requestFullScreen(elem);
};
export const requestFullScreen = (element) => {
  var requestMethod =
    element.requestFullScreen ||
    element.webkitRequestFullScreen ||
    element.mozRequestFullScreen ||
    element.msRequestFullScreen;
  if (requestMethod) {
    requestMethod.call(element);
  } else if (typeof window.ActiveXObject !== 'undefined') {
    var wscript = new ActiveXObject('WScript.Shell');
    if (wscript !== null) {
      wscript.SendKeys('{F11}');
    }
  }
};
/** 取消全屏 */
export const smallScreen = () => {
  var $cancelFullScreen = document.getElementsByClassName('chatRoom')[0];
  if ($cancelFullScreen) {
    $cancelFullScreen.addEventListener(
      'click',
      function () {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      },
      false
    );
  }
};
