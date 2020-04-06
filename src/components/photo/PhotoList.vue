<template>
    <div>
        <!-- 顶部滑动条区域 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item', item.id === 0 ? 'mui-active': '']" v-for="item in cates" :key="item.id" @tap="getPhotoListByCateId(item.id)">
                        {{ item.title }}
                    </a>
                    <!-- <a class="mui-control-item" href="#item2mobile" data-wid="tab-top-subpage-2.html">
                        热点
                    </a>
                    <a class="mui-control-item" href="#item3mobile" data-wid="tab-top-subpage-3.html">
                        北京
                    </a>
                    <a class="mui-control-item" href="#item4mobile" data-wid="tab-top-subpage-4.html">
                        社会
                    </a>
                    <a class="mui-control-item" href="#item5mobile" data-wid="tab-top-subpage-5.html">
                        娱乐
                    </a> -->
                    <!--<a class="mui-control-item" href="#item6mobile" data-wid="tab-top-subpage-6.html">
                        科技
                    </a>-->
                </div>
            </div>
		</div>

        <!-- 图片列表区域 -->
        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoInfo'+item.id" tag="li">
                <img v-lazy="item_img_url">
                <div class="info">
                    <h1 class="info-title">{{ item.title }}</h1>
                    <div class="info-body">{{ item.zhaiyao }}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
// 导入的mui的js文件
import mui from '../../lib/mui/js/mui.min.js'

export default {
    name: 'PhotoList',
    data() {
        return {
            // 所有分类的列表数组
            cates: [],
            // 图片列表的数组
            list: []
        }
    },
    created() {
        // 调用所有的分类列表
        this.getCategory()
        // 
        this.getPhotoListByCateId(0)
    },
    mounted() {
        // 当组件中的DOM结构渲染好并放到页面中，会执行这个钩子函数
        // 如果需要操作元素，最好在mounted里面，这个里面的DOM元素是最新的
        // 初始化滚动控件
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });

    },
    methods: {
        // 获取顶部导航的分类列表
        getCategory() {
            this.$http.get('api/getimgcategory').then((res) => {
                if (res.body.status === 0) {
                    // 手动拼接出一个完整的分类列表
                    res.body.message.unshift({title: '全部', id: 0})
                    this.cates = res.body.message
                }
            })
        },
        // 根据分类id获取对应的图片数组
        getPhotoListByCateId (cateId) {
            this.$http.get('api/getimages/' + cateId).then((res) => {
                if (res.body.status === 0) {
                    this.list = res.body.message
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
* {
    touch-action: pan-y;
}


.photo-list {
    list-style: none;
    margin: 0;
    padding: 10px;
    padding-bottom: 0;
    li {
        background-color: #ccc;
        text-align: center;
        margin-bottom: 10px;
        box-shadow: 0 0 9px #999;
        img {
            width: 100%;
            vertical-align: middle;
        }
        image[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
        }

        .info {
            color: white;
            text-align: left;
            position: absolute;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.4);
            max-height: 84px;
            .info-title {
                font-size: 14px;
            }
            .info-body {
                font-size: 13px;
            }
        }
    }
}
</style>