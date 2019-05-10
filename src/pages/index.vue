<template>
    <section class="page_home" ref="page_home" id="pageHome">
        <header>
            {{$t('m.home')}}
            <!-- <TabBtn :size='0.5' :parTap="onTap"></TabBtn> -->
            <div style="width:80%;">
                <nav>
                    <ul>
                        <li v-on:mouseenter="showList('',$event)" v-on:mouseleave="hideList('',$event)" data-index="0">
                            <a href="javascript:;" >首页</a>
                            <div class="list" v-bind:class="{ active: activeIndex == 0 }">
                            </div>
                        </li>
                        <li v-on:mouseenter="showList('',$event)" v-on:mouseleave="hideList('',$event)" data-index="1">
                            <a href="javascript:;" ref="page_home_nav">商家服务</a>
                            <div class="list" v-bind:class="{ active: activeIndex == 1 }">
                                <div>
                                    <p style="margin:0 auto; width:80%;font-size:12px;color:rgba(0,0,0,0.5)">解决方案</p>
                                    <div style="margin:0 auto; width:80%">
                                        <a-row>
                                            <a-col :span="8">
                                                <p><strong>小程序</strong></p>
                                                <span>一键接入，方便快捷</span>
                                            </a-col>
                                            <a-col :span="8">
                                                <p>小程序</p>
                                                <span>一键接入，方便快捷</span>
                                            </a-col>
                                            <a-col :span="8">
                                                <p>小程序</p>
                                                <span>一键接入，方便快捷</span>
                                            </a-col>
                                        </a-row>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <!-- <a-button type="primary">注册</a-button> -->
                            <a-button type="primary"><router-link to="/register">注册</router-link></a-button>
                        </li>
                        <li>
                            <a-button type="primary"><router-link :to="{ name: 'user', params: { userId: 123 }}">登陆</router-link></a-button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
        <!-- <Looper :store="$store">
            <li data='1' data-index='1'><div>1</div></li>
            <li data='2' data-index='2'><div>2</div></li>
            <li data='3' data-index='3'><div>3</div></li>
            <li><div>4</div></li>
        </Looper> -->
        <!-- <Ferris></Ferris> -->
        <!-- <Flex>sdfsdfdsf</Flex> -->
        <!-- <Clock></Clock> -->
        <!-- <NoCache></NoCache> -->
        <div @click="mshowModel">showModel</div>
        <!-- <TimePickerV1></TimePickerV1> -->


        <SerchList></SerchList>
        <!-- <Square>klsjdlkfjldkjf</Square> -->
        <!-- <UpLoad></UpLoad> -->
        <Model :show="showModel" :confirm="confirm" :cancel="cancel"></Model>
        <section class="looper">
            <a-carousel autoplay>
                <div><h3>1</h3></div>
                <div><h3>2</h3></div>
                <div><h3>3</h3></div>
                <div><h3>4</h3></div>
            </a-carousel>
        </section>
        <section class="resolution">
            <div>
                <h3>美业 美业经营一体化解决方案</h3>
                <div class="contain">
                    <div class="left">
                        <div class="left-item">
                            <p>科学美观的解决方案</p>
                            <p>定制化小程序，满足客户要求</p>
                        </div>
                        <div class="left-item">
                            <p>完善的系统体系</p>
                            <p>全方位技术支持性服务，解决一切问题</p>
                        </div>
                        <div class="left-item">
                            <p>高效的服务团队</p>
                            <p>策划到落实的一站式服务</p>
                        </div>
                        <div class="left-item">
                            <p>健全的管理方针</p>
                            <p>承诺期间内，24小时的支持</p>
                        </div>
                        <div class="left-item">
                            <p>健全的管理方针</p>
                            <p>承诺期间内，24小时的支持</p>
                        </div>
                    </div>
                    <div class="right">
                        <figure>
                            <img src="@/assets/image/index/pc_meiye.png" alt="图片失效">
                            <figcaption>这里是描述</figcaption>
                        </figure>
                    </div>
                </div>
            </div>
        </section>
        <section class="involved">
            <div>
                <h3>为超过30个行业和场景提供解决方案</h3>
                <div class="contain">
                    <div class="float-item" v-for="(item, index) in resolution" :key="index">
                        <Square>
                            <div class="inner-item" res-href="https://www.youzan.com/intro/solution/piaowu">
                                <div>
                                    <figure>
                                        <img src="@/assets/image/index/pc_bg_mapp.png" alt="">
                                    </figure>
                                </div>
                                <div>
                                    <p>小程序</p>
                                    <a href="https://www.youzan.com/intro/solution/piaowu">了解更多</a>
                                </div>
                            </div>
                        </Square>
                    </div>

                </div>
            </div>
        </section>
        <footer>
            <div class="sec_01">
                <div>
                    <p>联系我们</p>
                    <span>联系电话:18701878710</span><br>
                    <span>工作时间:周一到周日 9:00~18:00</span>
                </div>
                <div>
                    <p>关于我们</p>
                    <a href="javascript:;">公司文化</a><br>
                    <a href="javascript:;">合作联系</a><br>
                    <a href="javascript:;">加入我们</a>
                    <figure>
                        <img src="" alt="扫描二维码">
                        <figcaption></figcaption>
                    </figure>
                </div>
                <div>
                    <p>联系我们</p>
                    <span>联系电话:</span><br>
                    <span>工作时间</span>
                </div>
                <div>
                    <p>联系我们</p>
                    <span>联系电话:</span><br>
                    <span>工作时间</span>
                </div>
            </div>
            <hr/>
            <div class="sec_02">
                <a href="">（浙）网械平台备字【2018】第00003号</a>
                <span>|</span>
                <a href="">（浙）网械平台备字【2018】第00003号</a>
                <br>
                <span>© 2012-2019 shenyong.com</span>
            </div>
        </footer>
    </section>
</template>



<style>
    @import '../assets/style/common/quill.snow.css';
</style>
<style lang="less">
    @import '../assets/style/index.less';
</style>



<script>
import Vue from 'vue';
import TabBtn from "@/components/common/TabBtn";
import {Looper, Model,Flex,Square,Ferris,UpLoad,SerchList,TimePickerV1} from "@/components/common/common.js";
import {mapState} from 'vuex';

import { Clock } from "@/components/common/canvas.js";

export default {
    name: 'Index',
    components:{
        Clock,
        Square,
        TabBtn,
        Looper,
        Flex,
        Model,
        Ferris,
        UpLoad,
        SerchList,
        TimePickerV1,
        // NoCache
    },
    data:()=>{
        return{
            // message:message,
            activeIndex:-1,
            resolution:[1,2,3,4,5],
            showModel: false,
        }
    },
    computed:{
        ...mapState({
            active: state => state.tab.active,
        }),
    },
    props:{

    },
    methods:{
        mshowModel(){
            this.showModel = true;
        },
        confirm(){
            // console.log('parents confirm');
            this.showModel = false;
        },
        cancel(){
            this.showModel = false;
        },
        showList(){
            let target = arguments[1].target,
            index = target.dataset['index'];
            if(!!index){
                this.activeIndex = index;
            }
        },
        hideList(){
            this.activeIndex = -1;
        },
        onTap(){
            // console.log('here is parent method');
        }
    },
    mounted:function(){
        console.log(this.$route,this.$router,"this",this,);
    },
}
</script>
