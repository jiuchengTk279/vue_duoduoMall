<template>
    <div class="goodsInfo-container">
        
        <!-- 购物车小球 -->
        <!-- transition 使小球发生位移 -->
        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>

        <!-- 商品轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <Swiper :bannerList="bannerList" :isFull="false"></Swiper>
                </div>
            </div>
		</div>

        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{ goodsInfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥{{ goodsInfo.market_price }}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{ goodsInfo.sell_price }}</span>
                    </p>
                    <p>购买数量：<numbox @getCount="getSelectedCount" :max="goodsInfo.stock_quantity"></numbox></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                    </p>
                </div>
            </div>
		</div>


        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{ goodsInfo.goods_no }}</p>
                    <p>库存情况：{{ goodsInfo.stock_quantity }}</p>
                    <p>上架时间：{{ goodsInfo.add_time | dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
		</div>

    </div>
</template>

<script>
import Swiper from '../subcomponents/Swiper.vue'
import Numbox from '../subcomponents/GoodsInfo-numbox.vue'

export default {
    name: 'GoodsInfo',
    data() {
        return {
            id: this.$route.params.id, // 将路由参数中的对象挂载到 id上
            banner: [], // 轮播图的数据
            goodsInfo: {}, // 商品的信息数据
            ballFlag: false, // 控制小球的隐藏和显示的标识符
            selectedCount: 1 // 保存用户选中的商品数量，默认认为用户购买一件
        }
    },
    components: {
        Swiper,
        Numbox
    },
    created () {
        this.getBanner()
        this.getGoodsInfo()
    },
    methods: {
        // 获取商品的轮播图数据
        getBanner() {
            this.$http.get('api/getthumimages/' + this.id).then((res) => {
                if (res.body.status === 0) {
                    // 循环遍历轮播图数组中的每一项，为 item添加img属性
                    res.body.message.forEach(item => {
                        item.img = item.src
                    })
                    this.banner = res.body.message
                }
            })
        },
        // 获取商品的信息
        getGoodsInfo() {
            this.$http.get('api/goods/getinfo/' + this.id).then((res) => {
                if (res.body.status === 0) {
                    this.goodsInfo = res.body.message[0]
                }
            })
        },
        // 跳转到商品的详情页
        goDesc (id) {
            this.$router.push({name: 'GoodsDesc', params: { id }})
        },
        // 跳转到商品的评论页
        goComment (id) {
            this.$router.push({name: 'GoodsComment', params: { id }})
        },
        // 点击添加到购物车
        addToShopCar () {
            this.ballFlag = !this.ballFlag
            // 商品对象  { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }

            // 拼接出一个，要保存到 store 中 car 数组里的 商品信息对象
            var goodsInfo = {
                id: this.id,
                count: this.selectedCount,
                price: this.goodsInfo.sell_price,
                selected: true
            }
        
            // 调用 store 中的 mutations 来将商品加入购物车
            this.$store.commit('addCar', goodsInfo)
        },
        beforeEnter(el) {
            el.style.transform = 'translate(0, 0)'
        },
        enter(el, done) {
            el.offsetWidth

            // 小球动画优化思路：
            // 1. 先分析导致 动画 不准确的 本质原因： 我们把 小球 最终 位移到的 位置，已经局限在了某一分辨率下的 滚动条未滚动的情况下；
            // 2. 只要分辨率和 测试的时候不一样，或者 滚动条有一定的滚动距离之后， 问题就出现了；
            // 3. 因此，我们经过分析，得到结论： 不能把 位置的 横纵坐标 直接写死了，而是应该 根据不同情况，动态计算这个坐标值；
            // 4. 经过分析，得出解题思路： 先得到 徽标的 横纵 坐标，再得到 小球的 横纵坐标，然后 让 y 值 求差， x 值也求 差，得到 的结果，就是横纵坐标要位移的距离
            // 5. 如何 获取 徽标和小球的 位置?   domObject.getBoundingClientRect()
            
            // getBoundingClientRect() 用于获取某个元素相对于视窗的位置集合。集合中有top, right, bottom, left等属性
            // rectObject.top：元素上边到视窗上边的距离;
　          // rectObject.right：元素右边到视窗左边的距离;
　          // rectObject.bottom：元素下边到视窗上边的距离;
　          // rectObject.left：元素左边到视窗左边的距离;


            // 获取小球 在页面中的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect()
            // 获取徽标 在页面中的位置
            const badgePosition = document.getElementById('badge').getBoundingClientRect()

            const xDist = badgePosition.left - badgePosition.left
            const yDist = badgePosition.top - badgePosition.top


            el.style.transform = `translate(${xDist}px, ${yDist}px)`
            el.style.transition = 'all 0.5s cubic-bezier(.4, -0.3, 1, .68)'
            done()
        },
        afterEnter(el) {
            this.ballFlag = !this.ballFlag
        },
        // 数量框变化的方法
        getSelectedCount(count) {
            // 当子组件把 选中的数量传递给父组件的时候，把选中的值保存到 data 上
            this.selectedCount = count
            console.log('父组件拿到的数量值为：' + this.selectedCount)
        }
    }
}
</script>

<style lang="scss" scoped>
.goodsInfo-container {
    background-color: #fff;
    overflow: hidden;
    
    .now_price {
        color: red;
        font-size: 16px;
        font-weight: bold;
    }

    .mui-card-footer {
        display: block;
        button {
            margin: 15px 0;
        }
    }

    .ball {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;
        top: 390px;
        left: 146px;
    }
}
</style>