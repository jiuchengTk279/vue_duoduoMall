<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr/>
        <textarea placeholder="请输入要吐槽的内容，最多120个字" maxlength="120"></textarea>
        
        <mt-button type="primary" size="large">发表评论</mt-button>
    
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key="i">
                <div class="cmt-title">
                    第( i+1 )楼&nbsp;&nbsp;用户：{{ item.user_name}}&nbsp;&nbsp;发表时间：{{ item.add_time | dataFormat}}
                </div>
                <div class="cmt-body">
                    {{ item.content === 'undefind' ? '此用户很懒，什么都没有说' : item.content}}
                </div>
            </div>
            <!-- <div class="cmt-item">
                <div class="cmt-title">
                    第1楼&nbsp;&nbsp;用户：匿名用户&nbsp;&nbsp;发表时间：2018-12-12 12:12:12
                </div>
                <div class="cmt-body">
                    一二三四五六
                </div>
            </div> -->
        </div>

        <mt-button type="danger" size="large" plain @click="getMore()">加载更多</mt-button>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
    name: 'Comment',
    data() {
        return {
            pageIndex: 1, // 默认展示第一页数据
            comments: [] // 所有的评论数据
        }
    },
    props: ['id'],
    created() {
        this.getComments()
    },
    methods: {
        // 获取评论数据的方法
        getComments() {
            this.$http.get('/api/getcomments/'+ this.id +'?pageindex='+ this.pageIndex).then((res) => {
                if (res.body.status === 0) {
                    // this.comments = res.body.message
                    // 每当获取新评论数据的时候，让老数据拼接上新数据
                    this.comments = this.comments.concat(res.body.message)
                } else {
                    Toast('获取评论数据失败！')
                }
            })
        },
        // 加载到更多的数据
        getMore() {
            this.pageIndex++;
            this.getComments()
        }
    }
}
</script>

<style lang="scss" scoped>
.cmt-container {
    h3 {
        font-size: 18px;
    }
    textarea {
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    
    .cmt-list {
        margin: 5px 0;
        .cmt-item {
            font-size: 13px;
            .cmt-title {
                line-height: 30px;
                background-color: #ccc;
            }
            .cmt-body {
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
}
</style>