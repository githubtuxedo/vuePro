<template>
  <div style="overflow:hidden;height:100%;">
    <!-- 左侧导航 -->
    <a-menu mode="inline" :openKeys="openKeys" @openChange="onOpenChange" id='leftMainNav'>
      <a-sub-menu key="sub1">
        <span slot="title"><a-icon type="mail" /><span>Navigation One</span></span>
        <a-menu-item key="1"><router-link to="/home/a">Option 1</router-link></a-menu-item>
        <a-menu-item key="2"><router-link to="/home/b">Option 2</router-link></a-menu-item>
        <a-menu-item key="3"><router-link to="/home/c">Option 3</router-link></a-menu-item>
        <a-menu-item key="4"><span slot="slotTest">默认值</span></a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <span slot="title"><a-icon type="appstore" /><span>Navigation Two</span></span>
        <a-menu-item key="5">Option 5</a-menu-item>
        <a-menu-item key="6">Option 6</a-menu-item>
        <a-sub-menu key="sub3" title="Submenu">
          <a-menu-item key="7">Option 7</a-menu-item>
          <a-menu-item key="8">Option 8</a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
      <a-sub-menu key="sub4">
        <span slot="title"><a-icon type="setting" /><span>Navigation Three</span></span>
        <a-menu-item key="9">Option 9</a-menu-item>
        <a-menu-item key="10">Option 10</a-menu-item>
        <a-menu-item key="11">Option 11</a-menu-item>
        <a-menu-item key="12">Option 12</a-menu-item>
      </a-sub-menu>
    </a-menu>

    <div class='right-part'>
      <!-- 右侧头部导航 -->
      <header>
        <nav>
          <ul>
            <li>刷新</li>
            <li>消息</li>
            <li>语言</li>
          </ul>
        </nav>
      </header>

      <!-- 右侧主体 -->
      <div id="mianContent">
        <transition name="mine-page">
          <!-- <keep-alive> -->
            <router-view />
          <!-- </keep-alive> -->
        </transition>
      </div>

    </div>
  </div>
</template>

<style lang="less">
  @import './test.less';
</style>


<script>
export default {
    name: 'Looper',
    data(){
        return {
           rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
           openKeys: ['sub1'],
        }
    },
    methods:{
      onOpenChange (openKeys) {
        const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          this.openKeys = openKeys
        } else {
          this.openKeys = latestOpenKey ? [latestOpenKey] : []
        }
      },
    }
}
</script>
