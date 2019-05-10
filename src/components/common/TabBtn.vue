<template>
    <div :class="active?'active':'' " class="tab-item"  @click="ontap('',$event)">
        <slot></slot>
    </div>
</template>

<style lang="less" scoped>
    .tab-item{
        width: 50px;
        height:50px;
        border-radius:50%;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 17px 7px inset;
        transition: box-shadow 300ms;
        &.active{
            box-shadow: rgba(136, 123, 123, 0.2) 0px 0px 17px 7px inset;
        }
    }
</style>

<script>
import {mapState} from 'vuex';
export default {
    props:{
        size:{
            type: Number,
            default: 1,
        },
        // active:{
        //     type: Boolean,
        //     default: true,
        // },
        parTap:{
            type:Function,
        }
    },
    name:'TabBtn',
    data:function(){
        return {
            duration: 400,
            active:true,
        }
    },
    computed:{
        // ...mapState({
        //     active: state => state.tab.active,
        // })
    },
    methods:{
        ontap:function(){
            if(!!this.timer) {return};
            // this.$store.dispatch('switch_tab_state');
            this.active = !this.active
            this.timer = setTimeout(() => {
                // this.$store.dispatch('switch_tab_state');
                this.active = !this.active
                clearTimeout(this.timer);
                this.timer =null;
            }, this.duration);
            !!this.parTap && this.parTap();
        },
    },

}
</script>





