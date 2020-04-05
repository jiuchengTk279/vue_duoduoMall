<template>
    <div>
        <!-- 轮播图区域 -->
        <mt-swipe :auto="4000" v-if="BannerList.length>0">
            <mt-swipe-item v-for="item in BannerList" :key="item.url">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>

        <mt-swipe :auto="4000" v-else>
            <mt-swipe-item>轮播图1</mt-swipe-item>
            <mt-swipe-item>轮播图2</mt-swipe-item>
            <mt-swipe-item>轮播图3</mt-swipe-item>
        </mt-swipe>

        <!-- 九宫格区域 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../images/menu1(1).png" alt="">
                    <div class="mui-media-body">新闻资讯</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../images/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../images/menu3.png" alt="">
                    <div class="mui-media-body">商品购买</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../images/menu4.png" alt="">
                    <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../images/menu5.png" alt="">
                    <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../images/menu6.png" alt="">
                    <div class="mui-media-body">联系我们</div></a></li>
        </ul>

        HomeContainer
    </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
    data() {
        return {
            BannerList: [] // 保存轮播图的数组
        }
    },
    created () {
        this.getBanner()
    },
    methods: {
        getBanner() {
            this.$http.get('http://vue.studyit.io/api/getlunbo').then((res) => {
                if (res.body.status === 0) {
                    this.BannerList = res.body.message
                } else {
                    Toast('加载轮播图失败！')
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.mint-swipe { 
    height: 200px;

    .mint-swipe-item {
        &:nth-child(1) {
            background-color: red;
        }
        &:nth-child(2) {
            background-color: blueviolet;
        }
        &:nth-child(3) {
            background-color: cornflowerblue;
        }
        img {
            width: 100%;
            height: 100%;
        }

        .mui-media-body {
            font-size: 13px;
        }
    }
}

.mui-grid-view.mui-grid-9 {
    background-color: #fff;
    border: none;
    img {
        width: 60px;
        height: 60px;
    }
}

.mui-grid-view.mui-grid-9.mui-table-view-cell {
    border: 0;
}
</style>