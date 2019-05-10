<template>
<a-form @submit="handleSubmit" :form="form">
  <!-- <a-form-item
    v-bind="formItemLayout"
    label='电子邮件'
    :labelCol="{ span: 8 }"
    :wrapperCol="{ span: 8 }"
  >
    <a-input
      v-decorator="[
        'email',
        {
          rules: [{
            type: 'email', message: 'The input is not valid E-mail!',
          }, {
            required: true, message: 'Please input your E-mail!',
          }]
        }
      ]"
    />
  </a-form-item>
  <a-form-item
    :labelCol="{ span: 8 }"
    :wrapperCol="{ span: 8 }"
    v-bind="formItemLayout"
    label='密码'
  >
    <a-input
      v-decorator="[
        'password',
        {
          rules: [{
            required: true, message: 'Please input your password!',
          }, {
            validator: this.validateToNextPassword,
          }],
        }
      ]"
      type='password'
    />
  </a-form-item>
  <a-form-item
    v-bind="formItemLayout"
    label='确认密码'
    :labelCol="{ span: 8 }"
    :wrapperCol="{ span: 8 }"
  >
    <a-input
      v-decorator="[
        'confirm',
        {
          rules: [{
            required: true, message: 'Please confirm your password!',
          }, {
            validator: compareToFirstPassword,
          }],
        }
      ]"
      type='password'
      @blur="handleConfirmBlur"
    />
  </a-form-item>
  <a-form-item
    v-bind="formItemLayout"
    :labelCol="{ span: 8 }"
    :wrapperCol="{ span: 8 }"
  >
    <span slot="label">
      昵称&nbsp;
      <a-tooltip title='What do you want others to call you?'>
        <a-icon type='question-circle-o' />
      </a-tooltip>
    </span>
    <a-input
      v-decorator="[
        'nickname',
        {
          rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }]
        }
      ]"
    />
  </a-form-item>
  <a-form-item
    v-bind="formItemLayout"
    label='Habitual Residence'
    :labelCol="{ span: 8 }"
    :wrapperCol="{ span: 8 }"
  >
    <a-cascader
      v-decorator="[
        'residence',
        {
          initialValue: ['zhejiang', 'hangzhou', 'xihu'],
          rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }],
        }
      ]"
      :options="residences"
    />
  </a-form-item>
  <a-form-item
    v-bind="formItemLayout"
    label='手机号'
    :labelCol="{ span: 8 }"
    :wrapperCol="{ span: 8 }"
  >
    <a-input
      v-decorator="[
        'phone',
        {
          rules: [{ required: true, message: 'Please input your phone number!' }],
        }
      ]"
      style="width: 100%"
    >
      <a-select
        v-decorator="[
          'prefix',
          { initialValue: '86' }
        ]"
        slot="addonBefore"
        style="width: 70px"
      >
        <a-select-option value='86'>+86</a-select-option>
        <a-select-option value='87'>+87</a-select-option>
      </a-select>
    </a-input>
  </a-form-item>
  <a-form-item
    v-bind="formItemLayout"
    label='Website'
    :labelCol="{ span: 8 }"
    :wrapperCol="{ span: 8 }"
  >
    <a-auto-complete
      v-decorator="[
        'website',
        {rules: [{ required: true, message: 'Please input website!' }]}
      ]"
      @change="handleWebsiteChange"
      placeholder='website'
    >
      <template slot="dataSource">
        <a-select-option v-for="website in autoCompleteResult" :key="website">{{website}}</a-select-option>
      </template>
      <a-input />
    </a-auto-complete>
  </a-form-item>
  <a-form-item
    v-bind="formItemLayout"
    label='Captcha'
    extra='We must make sure that your are a human.'
  >
    <a-row :gutter="8">
      <a-col :span="12">
        <a-input
          v-decorator="[
            'captcha',
            {rules: [{ required: true, message: 'Please input the captcha you got!' }]}
          ]"
        />
      </a-col>
      <a-col :span="12">
        <a-button>Get captcha</a-button>
      </a-col>
    </a-row>
  </a-form-item>
  <a-form-item v-bind="tailFormItemLayout">
    <a-checkbox
      v-decorator="['agreement', {valuePropName: 'checked'}]"
    >I have read the <a href=''>agreement</a></a-checkbox>
  </a-form-item> -->
  <a-form-item v-bind="tailFormItemLayout">
    <a-button type='primary' htmlType='submit'>注册</a-button>
  </a-form-item>
</a-form>
</template>

<script>
const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}]

export default {
  name: 'register',
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  data () {
    return {
      confirmDirty: false,
      residences,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      },
    }
  },
  methods: {
    handleSubmit  (e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          location.hash = "#/home"
        }
      })
    },
    handleConfirmBlur  (e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },
    compareToFirstPassword  (rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!')
      } else {
        callback()
      }
    },
    validateToNextPassword  (rule, value, callback) {
      const form = this.form
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true })
      }
      callback()
    },
    handleWebsiteChange  (value) {
      let autoCompleteResult
      if (!value) {
        autoCompleteResult = []
      } else {
        autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`)
      }
      this.autoCompleteResult = autoCompleteResult
    },
  },
}
</script>