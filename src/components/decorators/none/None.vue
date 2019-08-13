<template>
  <div :class="{'main': editMode}">
    <decorator-header v-if="editMode" class="header" :page="page" :widget="widget" :i="i" :j="j">
      <slot name="header">
        <span class="header-title">
          <slot name="icon">
            <i class="iconfont icon-cf-c57"></i>
          </slot>
          <slot name="title">
            {{params.title}}
          </slot>
        </span>
        <decorator-toolbar class="header-toolbar" :page="page" :widget="widget" :i="i" :j="j">
          <slot name="buttons"></slot>
        </decorator-toolbar>
      </slot>
    </decorator-header>
    <div :class="editMode ? 'content' : 'none'" :style="'height:'+ params.widgetHeight +'px;overflow:auto;'">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'decorator-none',
    props: ['page', 'widget', 'params', 'i', 'j', 'editMode'],
    data () {
      return {}
    }
  }
</script>

<style scoped>
.main{background: #fff;margin:0 10px 10px 0;border: 1px solid #dbe0e5;}
.header{
  min-height: 34px;
  line-height: 34px;
  border-bottom:1px solid #ededed ;
  font-size: 14px;
  padding: 0 10px;
  box-sizing:border-box;
}
.header-title{float: left;}
.header-toolbar{float: right;}
.header-toolbar >>> i{font-size: 14px;display: inline-block;padding:0 5px;box-sizing:border-box;cursor: pointer;}
.main .content{min-height:130px;width:100%;padding: 10px 10px;box-sizing:border-box;color: #666;font-size: 12px;}
.main .none{
  padding: 0 0 0 0px;
  width:100%;
}
</style>