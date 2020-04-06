<template>
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" />
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'

export default {
    name: 'GoodsInfo-numbox',
    mounted () {
        // 初始化数字选择框组件
        mui('.mui-number').numbox()
    }
}
</script>

<style lang="scss" scoped>

</style>