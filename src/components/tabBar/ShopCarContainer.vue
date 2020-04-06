<template>
    <div class="shopcar-container">
        <div class="goods-list">

            <!--  商品列表项区域 -->
            <div class="mui-card" v-for="(item, i) in goodsList" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id] )"></mt-switch>
                        <img :src="item.thumb_path">
                        <div class="info">
                            <h1>{{ item.title }}</h1>
                            <p>
                                <span class="price">￥{{ item.sell_price }}</span>
                                <numbox :initCount="$store.getters.getGoodsCount[item.id]" :goodsId="item.id"></numbox>
                                <!-- 问题：如何从购物车中获取商品的数量呢 -->
                                <!-- 1. 我们可以先创建一个 空对象，然后循环购物车中所有商品的数据， 把 当前循环这条商品的 Id， 作为 对象 的 属性名，
                                count值作为 对象的 属性值，这样，当把所有的商品循环一遍，就会得到一个对象： { 88: 2, 89: 1, 90: 4 } -->
                                <!-- item.id是用来删除 store 中的数据， i是用来删除 goodsList 中的数据-->
                                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
                            </p>
                        </div>
					</div>
				</div>
			</div>

            <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch></mt-switch>
                        <img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1581494060.7822643.jpg">
                        <div class="info">
                            <h1>小米10 128G全网通版</h1>
                            <p>
                                <span class="price">￥2299</span>
                                <numbox></numbox>
                                <a href="#">删除</a>
                            </p>
                        </div>
					</div>
				</div>
			</div>

        </div>

        <!-- 结算区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计(不含运费)</p>
                        <p>已勾选商品 <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span> 件，总价 <span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount }}</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
		</div>

    </div>
</template>

<script>
import Numbox from '../subcomponents/ShopCar-numbox.vue'

export default {
    name: 'ShopCarContainer',
    components: {
        Numbox
    },
    data() {
        return {
            goodsList: [] // 购物车中所有商品的数据
        }
    },
    created () {
        this.getGoodsList()
    },
    methods: {
        // 获取购物车列表的数据
        getGoodsList() {
            // 获取到 store 中的所有商品 id，然后拼接出一个用逗号分隔的字符串
            var idArr = []
            this.$store.state.car.forEach(item => idArr.push(item.id))

            // 如果购物车没有商品，为空，那么就直接返回，不需要请求数据
            if (idArr.length <= 0) {
                return;
            }

            // 获取购物车商品列表
            this.$http.get('api/goods/getshopcarlist/' + idArr.join(',')).then((res) => {
                if (res.body.status === 0) {
                    this.goodsList = res.body.message
                }
            })
        },
        // 删除商品的方法
        remove(id, index) {
            // 点击删除，把商品从 store 中根据 传递的 Id 删除，同时，把 当前组件中的 goodslist 中，对应要删除的那个商品，使用 index 来删除
            this.goodsList.splice(index, 1)
            this.$store.commit('removeFormCar', id)
        },
        selectedChange (id, val) {
            // 每当点击开关，把最新的 快关状态，同步到 store 中
            this.$store.commit('updateGoodsSelected', {id, selected: val})
        }
    }
}
</script>

<style lang="scss" scoped>
.shopcar-container {
    background-color: #eee;
    overflow: hidden;
    .goods-list {
        .mui-card-content-inner {
            display: flex;
            align-items: center;
        }
        img {
            width: 60px;
            height: 60px;
        }
        h1 {
            font-size: 14px;
        }

        .info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .price {
                color: red;
                font-weight: bold;   
            }
        }
    }

    .jiesuan {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .red {
            color: red;
            font-weight: bold;
            font-size: 16px;
        }
    }
}
</style>