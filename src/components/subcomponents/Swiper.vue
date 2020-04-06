<template>
    <div>
        <mt-swipe :auto="4000">
        <!-- 在组件中，使用v-for循环的话，一定要使用 key -->
        <!-- 将来，谁使用此 轮播图组件，谁为我们传递 bannerList -->
        <!-- 此时，bannerList 应该是 父组件向子组件传值来设置 -->
            <mt-swipe-item v-for="item in bannerList" :key="item.url">
                <img :src="item.img" alt="" :class="{'full': isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
    name: 'Swiper',
    props: ['bannerList', 'isFull']
}
</script>

<style lang="scss" scoped>
.mint-swipe {
    height: 200px;

    .mint-swipe-item {
    text-align: center;

    img {
      // width: 100%;
        height: 100%;
        }
    }
}

.full {
    width: 100%;
}
</style>