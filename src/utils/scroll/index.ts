export const handleScroll = () => {
  let elem = document.getElementsByTagName('textarea')[0];
  elem.addEventListener('keyup', function () {
    document.getElementById('p').scrollTop =
      document.getElementById('p').scrollHeight;
  });
};
