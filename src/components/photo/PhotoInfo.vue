<template>
    <div class="photoInfo-container">
        <h3>{{ photoInfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ photoInfo.add_time | dateFormat}}</span>
            <span>点击：{{ photoInfo.click }}次</span>
        </p>

        <hr>

        <!-- 缩略图区域 -->
        <div class="thumbs">
            <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="item.src">
        </div>

        <!-- 图片内容区域 -->
        <div class="content" v-html="photoInfo.content"></div>

        <!-- 放置现成的评论子组件 -->
        <comment :id="id"></comment>
    </div>
</template>

<script>
// 引入评论子组件
import comment from '../subcomponents/comment.vue'

export default {
    name: 'PhotoInfo',
    data() {
        return {
            id: this.$route.params.id, // 从路由中获取到的图片id
            photoInfo: {}, // 图片详情
            list: [] // 缩略图的数组
        }
    },
    components: {
        comment
    },
    created () {
        this.getPhotoInfo()
        this.getThumbs()
    },
    methods: {
        // 获取图片的详情
        getPhotoInfo() {
            this.$http.get('api/getimageInfo/'+ this.id).then((res) => {
                if (res.body.status === 0) {
                    this.photoInfo = res.body.message
                }
            })
        },
        // 获取详情信息的缩略图
        getThumbs() {
            this.$http.get('api/getthumimages/'+ this.id).then((res) => {
                if (res.body.status === 0) {
                    // 循环每个图片数据，补全图片的宽和高
                    res.body.message.forEach(item => {
                        item.w = 600
                        item.h = 400
                    })
                    // 将完整的数据保存到 list中
                    this.list = res.body.message
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.photoInfo-container {
    padding: 3px;
    h3 {
        color: #26A2FE;
        font-size: 15px;
        text-align: center;
        margin: 15px 0;
    }
    .subtitle {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
    .content {
        font-size: 13px;
        line-height: 30px;
    }
    .thumbs {
        img {
            margin: 10px;
            box-shadow: 0 0 8px #999;
        }
    }
}
</style>