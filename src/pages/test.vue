<template>
    <div>
        <div class="main">
            <div>
                <div ref="drag" class="drag-cover" @dragstart="dragstart"  @dragover="dragover" @drop="drop" @dragend='dragend'>
                    <div class="scroll" ref='scroll'>
                        <div draggable="true" v-for="(item, index) in counts" :key="index" :data-index="index">
                            <div class="detail"><span></span>{{item}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div>真在加载<dot>...</dot></div> -->
    </div>
</template>


<style>
.hide {
    display: none!important;
}
.unvisible{
    visibility: hidden!important;
}
</style>


<style lang="less" scoped>
@keyframes dot {
    33% {
        transform: translateY(-2em);
    }
    66% {
        transform: translateY(-1em);
    }
}
dot {
    display: inline-block;
    height: 1em;
    line-height: 1;
    text-align: left;
    vertical-align: -.25em;
    overflow: hidden;
    // &::after {
    //     display: block;
    //     content: '...\A..\A.';
    //     white-space: pre-wrap;
    //     animation:  dot 3s infinite step-start both;
    // }
    &::before {
        display: block;
        content: '...\A..\A.';
        white-space: pre-wrap;
        animation:  dot 3s infinite step-start both;
    }
}
.drag-cover {
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    width: 60%;
    margin: 0 auto;
    transition: all 0.2s;
    overflow: scroll;
    max-height: 500px;
    .scroll {
        &:after, &:before {
            clear: both;
            content: ' ';
            display: block;
            height: 0;
            visibility: hidden;
        }
        >div {
            width: 25%;
            float: left;
            text-align: center;
            transition: all 0.5s ease-in-out;
            transform: scale(1,1);
            &.ani {
                transform: scale(0.5,1.3);
            }
            .detail {
                margin: 5px;
                background-color: rgba(0,0,0,0.2);
                border: 1px solid black;
            }
        }
    }
}
</style>
<script>
export default {
    name: 'test',
    data: ()=> {
        return{
            counts: [1,2,3,4,5,6,7,8],
            containInfo: {//容器信息
                $dom : null,//容器dom
                originPoint: [-1, -1],//左上角顶点位置  暂时用不上
                len: 0,//容器长度
                height: 0,//容器高度
                perLen: 0,//每个item的宽度
                perHeight: 0,//每个item的宽度
                perLineCount: 4,//每行个数
                perHeightCount: 2,//行数
                dragDom: null,//拖动元素dom
            },
            timer:null,
        }
    },
    computed: {
    },
    created: function () {
        let arr = [];
        for(let i = 0; i < 10000; i ++){
            arr.push(i);
        }
        this.counts = arr;
    },
    updated: function () {
    },
    mounted:function (params) {
        console.log(this);
        this.$axios.get('/test/date').then((res) => {
        })
        this.containInfo.perHeightCount = 10000 / this.containInfo.perLineCount;
        document.querySelector(".main").addEventListener('scroll', this.throttle(this.throttleHandler,300));
        // console.log(this);
        let $dom = this.$refs['drag'],
            totalLen = getComputedStyle($dom).width.split('px')[0],
            totalHeight = getComputedStyle($dom).height.split('px')[0];
        this.containInfo.$dom = $dom;
        this.containInfo.perLen = totalLen / this.containInfo.perLineCount;
        this.containInfo.perHeight = parseInt(getComputedStyle(this.$refs['scroll']).height.split('px')[0],10) / this.containInfo.perHeightCount;
        this.containInfo.len = totalLen;
        this.containInfo.height = totalHeight;
        // console.log(this.containInfo);
    },
    methods:{
        dragend: function(e) {
            // /**拿到容器左上角顶点信息 */
            console.time();
            let rect = this.containInfo.$dom.getBoundingClientRect(),
                //中心位置
                center = {
                    left: rect.left + (rect.right - rect.left) / 2,
                    top: rect.top + (rect.bottom - rect.top) / 2
                },
                scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft,
                scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            //最终的 左 和 上位置
            center.left = screenLeft + center.left;
            center.top = scrollTop + center.top;
            //内部滚动距离
            let innerY = this.containInfo.$dom.scrollTop;
            let x = e.pageX,
                y = e.pageY,
                originStartX = center.left - this.containInfo.len / 2,
                originStartY = center.top - this.containInfo.height / 2,
                originEndX = originStartX + parseInt(this.containInfo.len, 10),
                originEndY = originStartY + parseInt(this.containInfo.height, 10),
                perWidth = this.containInfo.perLen,
                perHeight = this.containInfo.perHeight;
            if(originStartX < x && x < originEndX && originStartY < y && y < originEndY) {
                let xGap = x - originStartX,
                    // yGap = y - (originStartY + (!!innerY ? innerY : 0)),
                    yGap = y + (!!innerY ? innerY : 0) - originStartY,
                    whichRow = Math.ceil(xGap / perWidth),
                    whichCol = Math.ceil(yGap / perHeight),

                    newIndex = (whichCol - 1)  * this.containInfo.perLineCount + whichRow;
                // console.log(this.containInfo, newIndex, 'col:',whichCol, 'row:',whichRow, 'newIndex:', newIndex);
                let tarNode = e.target;
                if(!!tarNode.parentNode) {
                    let $insertBefore = tarNode.parentNode.children[newIndex - 1],
                        _newDom = this.dragDom;
                    tarNode.parentNode.insertBefore(_newDom, $insertBefore);
                    this.timer = setTimeout(() => {
                        _newDom.classList.remove("ani");
                        if(!!this.dragDom) { this.dragDom = null; }
                        clearTimeout(this.timer);
                        this.timer = null;

                        console.timeEnd();
                    }, 300);
                    tarNode.parentNode.removeChild(tarNode);
                }

            }
        },
        drop: function(e) {
            console.error(e);
        },
        dragstart: function(e) {
            if(!!this.timer){
                return false;
            }
            e.target.classList.add("ani");
            this.dragDom = e.target.cloneNode(true);
            e.target.classList.add("unvisible");
        },
        dragover: function(e) {
            // e.dataTransfer.dropEffect = 'move';
            // console.log('over: ',e)
        },
        /**
         * 节流函数 throttle
         */
        throttleHandler: function() {
            // console.log('work',arguments);
        },
        throttle: function(fn, delay) {
            let timer = null,
                last = 0;
            return function() {
                let now = +new Date(),
                    content = this,
                    args = arguments;
                if(now - last < delay){
                    clearTimeout(timer);
                    timer = setTimeout(function() {
                        fn.apply(content, args);
                    }, delay);
                } else {
                    last = now;
                    fn.apply(content, args);
                }
            }
        },
        testFn:function (params) {
            this.key++;
            this.msg = {
                info1: this.key,
                info3: this.key,
                info2: this.key,
                info4: this.key,
            }
            // this.show = !this.show;
            // console.log(arguments,this.key);
        },
        login:function () {
            this.$store.commit('base/decrement');
            // this.$store.dispatch('base/decrement',{aa:'aa',bb:'bb'});
            // this.$store.$router.replace(!!this.$route.query.redirect?this.$route.query.redirect:'/');
        },

    }
}
</script>

