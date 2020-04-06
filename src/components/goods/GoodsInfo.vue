<template>
    <div class="goodsInfo-container">
        
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
                    <p>购买数量：<numbox></numbox></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small">加入购物车</mt-button>
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
            goodsInfo: {} // 商品的信息数据
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
}
</style>