<template>
    <div>
        <!-- 数据请求成功显示 -->
        <ul class="mui-table-view" v-if="newsList.length>0">
            <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
                <router-link :to="'/home/newsInfo' + item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{ item.title }}</h1>
                        <p class='mui-ellipsis'>
                            <span>发表时间： {{ item.add_time | dataFormat }}</span>
                            <span>点击：{{ item.click }}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
        <!-- 数据请求失败显示  -->
        <ul class="mui-table-view" v-else>
            <li class="mui-table-view-cell mui-media">
                <router-link>
                    <img class="mui-media-object mui-pull-left" src="../../images/menu3.png">
                    <div class="mui-media-body">
                        <h1>幸福</h1>
                        <p class='mui-ellipsis'>
                            <span>发表时间： 2012-12-12 12:12:12</span>
                            <span>点击：5次</span>
                        </p>
                    </div>
                </router-link>
            </li>
		</ul>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
    name: 'NewsList',
    data() {
        return {
            newsList: []
        }
    },
    created () {
        this.getNewsList()
    },
    methods: {
        getNewsList() {
            this.$http.get('/api/getnewslist').then((res) => {
                if (res.body.state === 0) {
                    this.newsList = res.body.message
                } else {
                    Toast('获取新闻列表失败！')
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.mui-table-view {
    li {
        h1 {
            font-size: 14px;
        }

        .mui-ellipsis {
            font-size: 12px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>