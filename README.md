## 多多商城

#### 一、制作首页App组件
1. 完成 Header 区域，使用的是 Mint-UI 中的Header组件
2. 制作底部的 Tabbar 区域，使用的是 MUI 的 Tabbar.html
 + 在制作 购物车 小图标的时候，操作会相对多一些：
 + 先把 扩展图标的 css 样式，拷贝到 项目中
 + 拷贝 扩展字体库 ttf 文件，到项目中
 + 为 购物车 小图标 ，添加 如下样式 `mui-icon mui-icon-extra mui-icon-extra-cart`
3. 要在 中间区域放置一个 router-view 来展示路由匹配到的组件

#### 二、改造 tabbar 为 router-link

#### 三、设置路由高亮

#### 四、点击 tabbar 中的路由链接，展示对应的路由组件

#### 五、制作首页轮播图布局

#### 六、加载首页轮播图数据
1. 获取数据， 如何获取呢， 使用 vue-resource
2. 使用 vue-resource 的 this.$http.get 获取数据
3. 获取到的数据，要保存到 data 身上
4. 使用 v-for 循环渲染 每个 item 项

#### 七、改造 九宫格 区域的样式

#### 八、Promise的相关知识
1. Promise 是一个 构造函数，既然是构造函数， 那么，我们就可以  new Promise() 得到一个 Promise 的实例；
2. 在 Promise 上，有两个函数，分别叫做 resolve（成功之后的回调函数） 和 reject（失败之后的回调函数）
3. 在 Promise 构造函数的 Prototype 属性上，有一个 .then() 方法，也就说，只要是 Promise 构造函数创建的实例，都可以访问到 .then() 方法
4. Promise 表示一个 异步操作；每当我们 new 一个 Promise 的实例，这个实例，就表示一个具体的异步操作；
5. 既然 Promise 创建的实例，是一个异步操作，那么，这个 异步操作的结果，只能有两种状态：
 5.1 状态1： 异步执行成功了，需要在内部调用 成功的回调函数 resolve 把结果返回给调用者；
 5.2 状态2： 异步执行失败了，需要在内部调用 失败的回调函数 reject 把结果返回给调用者；
 5.3 由于 Promise 的实例，是一个异步操作，所以，内部拿到 操作的结果后，无法使用 return 把操作的结果返回给调用者； 这时候，只能使用回调函数的形式，来把 成功 或 失败的结果，返回给调用者；
6. 我们可以在 new 出来的 Promise 实例上，调用 .then() 方法，【预先】 为 这个 Promise 异步操作，指定 成功（resolve） 和 失败（reject） 回调函数；

