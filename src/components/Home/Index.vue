<template>
  <a-table :columns="columns" :dataSource="data" bordered
            :pagination="pagination"
            :loading="loading"

  >
    <template v-for="col in ['name', 'age', 'address']" :slot="col" slot-scope="text, record, index">
      <div :key="col">
        <a-input
          v-if="record.editable"
          style="margin: -5px 0"
          :value="text"
          @change="e => handleChange(e.target.value, record.key, col)"
        />
        <template v-else>{{text}}</template>
      </div>
    </template>
    <template slot="operation" slot-scope="text, record, index">
      <div class='editable-row-operations'>
        <span v-if="record.editable">
          <a @click="() => save(record.key)">Save</a>
          <a-popconfirm title='Sure to cancel?' @confirm="() => cancel(record.key)">
            <a>Cancel</a>
          </a-popconfirm>
        </span>
        <span v-else>
          <a @click="() => edit(record.key)">Edit</a>
        </span>
        <span>
          <router-link :to="{ name: 'user', params: { userId: 123 }}">Check</router-link>
          <!-- <router-link  to="/home/c">Check</router-link> -->
        </span>
      </div>
    </template>
  </a-table>



</template>
<script>
const columns = [{
  title: 'name',
  dataIndex: 'name',
  width: '25%',
  scopedSlots: { customRender: 'name' },
}, {
  title: 'age',
  dataIndex: 'age',
  width: '15%',
  scopedSlots: { customRender: 'age' },
}, {
  title: 'address',
  dataIndex: 'address',
  width: '40%',
  scopedSlots: { customRender: 'address' },
}, {
  title: 'operation',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' },
}]

const data = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  })
}
export default {
  data () {
    this.cacheData = data.map(item => ({ ...item }))
    return {
      data,
      columns,
      pagination: {},
      loading: false,
    }
  },
  methods: {
    handleTableChange(pagination, filters, sorter){
        const pager = { ...this.pagination };
        pager.current = pagination.current;
        this.pagination = pager;
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    },
    fetch(params = {}){
        this.loading = true
        http.request({
            url: 'https://randomuser.me/api',
            method: 'get',
            data: {
                results: 10,
                ...params,
            },
            type: 'json',
            success: ()=>{
                const pagination = { ...this.pagination };
                // Read total count from server
                // pagination.total = data.totalCount;
                pagination.total = 200;
                this.loading = false;
                this.data = data.results;
                this.pagination = pagination;
            }
        })
    },
    handleChange (value, key, column) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    edit (key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target.editable = true
        this.data = newData
      }
    },
    save (key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        delete target.editable
        this.data = newData
        this.cacheData = newData.map(item => ({ ...item }))
      }
    },
    cancel (key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
        delete target.editable
        this.data = newData
      }
    },
    check (key){

    },
  },
}


// const lang = {
//     strict:{
//         zh: '地区',
//         jp: '日本语'
//     },
//     language:{
//         zh: '语言',
//         jp: '日本'
//     }
// }

// let language = localStorage.getItem('language');
// window.getLanguage =function (str) {
//     if(language === 'en'){
//         return str;
//     }else if(language === 'zh'){
//         return lang[str]['zh'];
//     }else if(language === 'japan'){
//         return language[str]['jp'];
//     }
// }

// <div>getLanguage('strict')</div>    //地区

</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
