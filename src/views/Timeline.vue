<template>
  <div>
    <el-timeline>
      <el-timeline-item center timestamp="2022/2/3" placement="top">Event start</el-timeline-item>
      <el-timeline-item center timestamp="2022/2/3" placement="top">
        <el-card>
          <div class="card">
            Dat01😵布局，通过Vue的组件化和路由实现项目的基本布局，一开始堆vue的布局和组件化不太了解
            经过百度之后了解了大致流程，还写了一篇CSDN记录vue的项目搭建至布局
          </div>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2022/2/4" placement="top">
        <el-card>
          <div class="card">
            Dat02🤩登录注册，因为布局已经实现，接下来就利用之前nodejs写的后台登录和注册功能的接口，去实
            现这边的登录注册，因为是第一次接触ts所以对于script里面怎么写方法和定义变量不太了解，经过
            百度和自己写的过程，对setup这个名称有一定理解了，似乎是立即执行的意思，而且因为这个没写
            在script里导致页面出不来，幸好代码没多少，一行一行排除，终于找到了。还有定义
            变量这个问题也花了挺久的，一开始真的不知道变量怎么定义，慢慢摸索，终于出来了。然鹅登录注
            册也写得坎坷，请求接口忘掉了后面的尾巴api/login，整半天，然后是data-form的传参需要qs修饰
            一下，以x-www-form的形式传过去，之后突然发现dialog通过叉叉关不掉，现在也想不起来什么原因，
            不过好在解决了。
          </div>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2022/2/5" placement="top">
        <el-card>
          <div class="card">
            Day03😁路由跳转+两块页面，然后是前端对输入的账号和密码进行rules校验，这个一开始不知道怎么用，后来会
            来事了，但是输入的min,max不会来事儿，发现是prop的作用出现了，然后是路由的跳转，经过又一番
            查找，终于const router = useRouter();然后利用router.push("/articles");就完事了，到此已经
            完成了基本的配置。然后开始着手写页面了，找了半天的公开博客接口，没成事。然后就把自己之前写的
            影片放进去了再练练手了，然后是想起来之前的公开网易云API，下一个页面就是它了，看数据，选数据
            请求数据，渲染数据，累死了，这期间没遇到什么难事，主要就是怎么存储请求到的数据和样式布局，
            记忆深刻的点就是音乐的播放，一开始想加图标，出不来，太麻烦了，点击图片播放吧，那怎么关呢，双击？
            dblclick，关闭不了...为啥呢，双击==两次单击结果就是来两次单击再加一次双击，麻了，换过方法吧，
            要不然我在header组件里添加一个全局的关闭音乐的按钮?好办法写着突然我怎么去拿到另外一个兄弟组件的
            studio，好了，又开始搜索：兄弟组件之间怎么传参呢？：太麻烦了，不行直接每一个下面搞一个关闭的
            图标，然后点击关闭音乐好了，解决。一开始音乐全选的周总的音乐，又改成了热门歌单，带分类。然后加了
            个github的图标，睡觉，噢想起来路由拦截还没说，就是没登陆之前看不到其他页面，登录之后可以访问，查
            半天，发现大家的登录页面多是新的页面，没看到是弹框的，所以就在路由.ts里router.beforeEach((to, from, next) => {
            写了这样一个函数做拦截，主要靠的是sessionStorage，不过这个还没做加密，以至于前端可以看到密码，不安全。
            之后，还有就是电影请求太慢，所以加了一个加载的svg做提示，没请求到之前就是转的图标，请求到之后消失。
          </div>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2022/2/6" placement="top">
        <el-card>
          <div class="card">
            Dat04🤩添加时间线+电影轮播图，图片路径变量前需要添加require，时间线主要就是时间格式的转换还有记得
            清空form表单数据，因为这里没有涉及数据库，添加的数据是一次性的，关闭或者刷新网页后数据清空，另外如果
            不清空的话，timeLineList全是最后一个添加的数据，会对前面添加的数据做修改，改成最后添加的那个，具体原因不明。
            突然又发现一个bug，就是音乐页面点击播放音乐后转到其他页面，再返回时关闭音乐不起作用。不过也不妨碍，播完
            会自动关闭。刚刚把留言写了一下，这个比较简单，在nodejs里写了两个接口，分别是获取留言接口和添加留言接口
            数据库加了一张留言表，然后找axios带认证发起请求，测试，把请求封装成方法放在onMounted()里进入页面就调用。
          </div>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2022/2/6" placement="top">
        <el-card>
          <h4>commit to Github</h4>
          <p>hsn committed 2022/2/6 21:58</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2022/2/6" placement="top">Event end</el-timeline-item>
    </el-timeline>
  </div>
</template>
<style scoped>
.card {
  padding: 10px;
  margin: 10px;
  font-family: "楷体";
  background-color: gray;
  color: white;
}
.el-timeline {
    margin: 10px;
    text-align: left;
}
</style>