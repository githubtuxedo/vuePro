<template>
    <!-- <transition name="coupon-page"> -->
        <div class="coupon" @click="test('hi',$event)" ref="testid">
            <!-- 类型 满减 折扣  -->
            <div v-if="show">
                <div data-shopName>蓝宝石旗舰店</div>
                <!-- 面额 -->
                <div>
                    <span>￥</span>
                    <span data-cost>5</span>
                </div>
                <!-- 使用条件 -->
                <div>
                    <span>满</span>
                    <span data-least>100</span>
                    <span>减</span>
                    <span data-cost>50</span>
                </div>
            </div>
            <!-- 使用日期 -->
            <div>
                <span data-startTime  :visible="show" >2018-03-15</span>
                <span>-</span>
                <span data-endTime>2018-10-12</span>
            </div>
            <input type="text" v-model="input" @keyup="inputing"/>
                {{input}}
            <span>{{show}}</span><br>
            <span v-text="show"></span><br>
            <span v-html="html"></span><br>
            <span v-show="show">v-show</span>

            <br><br>
  <span>here</span>
  <div style="padding:10px 15px;
position:relative;
display:-webkit-box;
display:-webkit-flex;
display:flex;
-webkit-box-align:center;
-webkit-align-items:center;
align-items:center;
"></div>

        </div>
    <!-- </transition> -->
</template>

<script>
import {mapState} from 'vuex';
export default {
    name: 'Coupon',
    data: ()=>{
        return{
            type: true,
            html: `<span style='color:red'>hi</span>`
        }
    },
    methods:{
        test(params,e){
            console.log(params,e);
            this.$store.dispatch('switch_login_state');
        },
        inputing(){
            console.log(arguments);
        }
    },
    computed:{
        // 箭头函数可使代码更简练
        ...mapState({
            show: state => state.login.show,
        })

    },



}
</script>


