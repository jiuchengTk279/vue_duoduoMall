<template>
    <div>
        <comment :id="$route.params.id"></comment>
    </div>
</template>

<script>
import Comment from '../subcomponents/comment.vue'

export default {
    name: 'GoodsComment',
    components: {
        Comment
    }
}
</script>

<style lang="scss" scoped>

</style>