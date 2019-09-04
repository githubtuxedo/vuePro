<template>
    <div id="loginPage">
        <div class="login">
            <a-form @submit="handleSubmit" :form="form">
                <div>登陆</div>
                <a-form-item label='Account' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
                <a-input v-decorator="['note',
                    {rules: [{ required: true, message: 'Please input your note!' }]}]"
                />
                </a-form-item>
                <a-form-item label='PassWord' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
                    <a-input v-decorator="['note',
                    {rules: [{ required: true, message: 'Please input your note!' }]}]"
                />
                </a-form-item>
                <div>
                    <a-button type='primary' htmlType='submit'><router-link to="/HomePage">submit</router-link></a-button>
                    <a-button type='primary' htmlType='submit'>Forget?</a-button>
                </div>
                <div @click.stop.prevent="eventBus($event)">点我EeventBus测试</div>
            </a-form>
        </div>
    </div>
</template>

<style>
    #loginPage{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .login{
        position: absolute;
        top:50%;
        right: 30px;
        width: 400px;
        height: 500px;
        margin-top: -250px;
        display: flex;
        display: -webkit-box;
        align-items: center;
        justify-content: center;
    }
    .login>form{
        width:100%;
    }
</style>
<script>
import Bus from "@/bus/bus.js";
export default {
    name: 'Login',
    data(){
        return {
            form: this.$form.createForm(this),
        }
    },
    beforeDestroy(){
        Bus.$emit('get', this.target)
    },
    methods:{
        eventBus(event){
            // console.log(index, date, item)
            this.target = event.target;
            this.$router.replace({path: '/home'})
        },
        handleSubmit (e) {
            e.preventDefault()
            this.form.validateFields((err, values) => {
                if (!err) {
                // console.log('Received values of form: ', values)
                }
            })
            },
            handleSelectChange (value) {
                // console.log(value)
                this.form.setFieldsValue({
                    note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
                })
            },
    }
}
</script>

