<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr/>
        <textarea placeholder="请输入要吐槽的内容，最多120个字" maxlength="120" v-model="msg"></textarea>
        
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
    
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
            comments: [], // 所有的评论数据
            msg: '' // 评论输入的内容
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
        },
        // 发布评论
        postComment () {
            // 校验评论的内容是否为空
            // trim() 方法可以去除空格
            if (this.msg.trim().length === 0) {
                return Toast('评论的内容不能为空！')
            }

            // 发表评论
            // 参数1： 请求的URL地址
            // 参数2： 提交给服务器的数据对象 { content: this.msg }
            // 参数3： 定义提交时候，表单中数据的格式  { emulateJSON:true }
            this.$http.post('/api/postcomment/' + this.$route.params.id, {
                content: this.msg.trim()
            }).then((res) => {
                if (res.body.status === 0 ) {
                    // 拼接出一个评论对象
                    var cmt = {
                        user_name: '匿名用户',
                        add_tiem: Date.now(),
                        content: this.msg.trim()
                    };
                    // 将最新提交的评论信息添加到所有的评论数据中，保证是最新最先展示的
                    this.comments.unshift(cmt)
                    this.msg = ''
                }
            })


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