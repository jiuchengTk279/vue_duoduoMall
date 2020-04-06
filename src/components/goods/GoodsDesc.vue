<template>
    <div class="goodsDesc-container">
        <h3>{{ goodsDesc.title }}</h3>

        <hr>

        <div class="content" v-html="goodsDesc.content"></div>
    </div>
</template>

<script>
export default {
    name: 'GoodsDesc',
    data() {
        return {
            id: this.$route.params.id, // 商品的id值
            goodsDesc: {} // 图文数据
        }
    },
    created() {
        this.getGoodsDesc()
    },
    methods: {
        // 获取图文数据
        getGoodsDesc() {
            this.$http.get('api/goods/getdesc/' + id).then((res) => {
                if (res.body.status === 0) {
                    this.goodsDesc = res.body.message[0]
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.goodsDesc-container {
    padding: 4px;
    h3 {
        font-size: 16px;
        color: #226aff;
        text-align: center;
        margin: 15px 0;
    }
    .content {
        img {
            width: 100%;
        }
    }
}
</style>