<template>
    <div class="goods-list">
        <!-- 标签式跳转 -->
        <!-- <router-link :to="'/home/goodsInfo'+item.id" tag="div" class="goods-item" v-for="item in goodsList" :key="item.id">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{ item.sell_price }}</span>
                    <span class="old">￥{{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity }}件</span>
                </p>
            </div>
        </router-link> -->


        <!-- 在网页中，有两种跳转方式  -->
        <!-- 方式1： 使用 a 标签的形式进行跳转，也称之为标签跳转 -->
        <!-- 方式2： 使用 window.location.href 的形式进行跳转，也称之为编程式跳转 -->
        
        <!-- 编程式跳转 -->
        <div @click="goDetail(item.id)" class="goods-item" v-for="item in goodsList" :key="item.id">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{ item.sell_price }}</span>
                    <span class="old">￥{{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity }}件</span>
                </p>
            </div>
        </div>






        <div class="goods-item">
            <img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1581494060.7822643.jpg" alt="">
            <h1 class="title">小米Note 16G双网通版本</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥899</span>
                    <span class="old">￥2399</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </div>

        <div class="goods-item">
            <img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1581494060.7822643.jpg" alt="">
            <h1 class="title">小米Note 16G双网通版本</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥899</span>
                    <span class="old">￥2399</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </div>

        <div class="goods-item">
            <img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1581494060.7822643.jpg" alt="">
            <h1 class="title">小米Note 16G双网通版本</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥899</span>
                    <span class="old">￥2399</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </div>

        <mt-button type="danger" size="large" @click="getMore()">加载更多</mt-button>
    </div>
</template>

<script>
export default {
    name: 'GoodsList',
    data() {
        return {
            pageIndex: 1, // 分页的页数
            goodsList: [] // 存放商品列表的数组
        }
    },
    created () {
        this.getGoodsList()
    },
    methods: {
        // 获取商品列表的数据
        getGoodsList() {
            this.$http.get('api/getgoods?pageindex' + this.pageIndex).then((res) => {
                if (res.body.status === 0) {
                    // this.goodsList = res.body.message
                    this.goodsList = this.goodsList.concat(res.body.message)
                }
            })
        },
        // 加载更多的方法
        getMore() {
            this.pageIndex++;
            this.getGoodsList()
        },
        // 点击后进入详情页
        goDetail (id) {
            // this.$route  是路由【参数对象】，所有路由中的参数， params, query 都属于它
            // this.router 是一个路由【导航对象】，用它 可以方便的 使用 JS 代码，实现路由的 前进、后退、 跳转到新的 URL 地址
            // 1. 最简单的跳转
            // this.$router.push('/home/goodsInfo/'+id)
            // 2. 传递对象的的跳转
            // this.$router.push({path: '/home/goodsInfo/'+id})
            // 3. 传递命令路由， name的值就是router.js中对应的跳转路由的name的值
            this.$router.push({name: 'GoodsInfo', params: { id }})
        }
    }
}
</script>

<style lang="scss" scoped>
.goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 1px;
    justify-content: space-between;
    .goods-item {
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 4px 0;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 293px;
        img {
            width: 100%;
        }
        .title {
            font-size: 14px;
        }

        .info {
            background-color: #fff;
            p {
                    margin: 0;
                    padding: 5px;
                }
            .price {
                .now {
                    color: red;
                    font-weight: bold;
                    font-size: 16px;
                }
                .old {
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 10px;
                }
            }
            .sell {
                display: flex;
                justify-content: space-between;
                font-size: 12px;
            }
        }
    }
}
</style>