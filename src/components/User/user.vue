<template>
    <section class="user-part">
        <div class="head">
            <div class="title">名称： 客户A{{ $route.params.userId }}</div>
            <div class="title">状态： 跟踪中{{ $route.params.userId }}</div>
        </div>
        <section style="width:70%">
            <quill-editor v-model="content"
                            ref="myQuillEditor"
                            :options="editorOption"
                            @blur="onEditorBlur($event)"
                            @focus="onEditorFocus($event)"
                            @ready="onEditorReady($event)">
            </quill-editor>
        </section>

        <TimeAxis/>

    </section>
</template>

<style lang="less" scoped>
    .user-part{
        .head{
            display: flex;
            align-items: center;
            justify-content: space-between;
            .title{
                font-weight: bold;
                padding: 10px 0;
            }
        }
    }
</style>



<script>
import {TimeAxis} from "@/components/common/common.js";
import 'quill/dist/quill.snow.css';
import { quillEditor } from "vue-quill-editor";
export default {
    name: 'User',
    components:{
        quillEditor,
        TimeAxis,
    },
    data:()=>{
        return{
            content: '',
            editorOption: {
                modules: {
                    toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block'],
                    [{ 'header': 1 }, { 'header': 2 }],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],
                    [{ 'indent': '-1' }, { 'indent': '+1' }],
                    [{ 'direction': 'rtl' }],
                    [{ 'size': ['small', false, 'large', 'huge'] }],
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    [{ 'font': [] }],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'align': [] }],
                    ['clean'],
                    ['link', 'image', 'video']
                    ],
                    // syntax: {
                    // highlight: text => hljs.highlightAuto(text).value
                    // }
                }
            },
        }
    },
    computed:{
        editor() {
            return this.$refs.myQuillEditor.quill
        },
    },
    methods:{

        onEditorBlur(quill) {
            console.log('editor blur!', quill)
        },
        onEditorFocus(quill) {
            console.log('editor focus!', quill)
        },
        onEditorReady(quill) {
            console.log('editor ready!', quill)
        },
        onEditorChange({ quill, html, text }) {
            console.log('editor change!', quill, html, text)
            this.content = html
        },
    },
    // beforeRouteUpdate (to, from, next){
    //     console.log('router change beforeRouteUpdate')
    // },
    watch:{
        '$route' (to, from){
            console.log('router change')
        }
    },
    mounted:function (params) {
        console.log(this.$route.params);
    }
}
</script>

