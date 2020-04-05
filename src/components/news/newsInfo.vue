<template>
    <div class="newsInfo-container">
        <h3 class="title">{{ newsInfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ newsInfo.add_time | dataFormat}}</span>
            <span>点击：{{ newsInfo.click }}次</span>
        </p>

        <!-- 隔开 -->
        <hr/>

        <div class="content" v-html="newsInfo.content"></div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
    name: 'NewsInfo',
    data() {
        return {
            // 将 url地址中的 id传递过来挂载到 data 中
            id: this.$route.params.id,
            // 新闻对象
            newsInfo: []
        }
    },
    created () {
        this.getNewsInfo()
    },
    methods: {
        // 获取新闻详情信息
        getNewsInfo () {
            this.$http.get('/api/getnew/' + this.id).then((res) => {
                if (res.body.status === 0) {
                    this.newsInfo = res.body.message[0]
                } else {
                    Toast('获取新闻详情失败！')
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.newsInfo-container {
    padding: 0 4px;
    .title {
        font-size: 16px;
        text-align: center;
        margin: 15px 0;
        color: red;
    }
    .subtitle {
        font-size: 13px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }
    .content {
        img {
            width: 100%;
        }
    }
}
</style>