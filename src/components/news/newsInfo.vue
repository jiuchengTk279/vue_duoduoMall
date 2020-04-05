<template>
    <div class="newsInfo-container">
        <!-- 大标题 -->
        <h3 class="title">{{ newsInfo.title }}</h3>
        <!-- 子标题 -->
        <p class="subtitle">
            <span>发表时间：{{ newsInfo.add_time | dataFormat}}</span>
            <span>点击：{{ newsInfo.click }}次</span>
        </p>

        <!-- 隔开 -->
        <hr/>

        <!-- 内容区域 -->
        <div class="content" v-html="newsInfo.content"></div>

        <!-- 评论子组件区域 -->
        <comment :id="this.id"></comment>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import Comment from './../subcomponents/comment.vue'

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
    // 将组件进行注册
    components: {
        Comment
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