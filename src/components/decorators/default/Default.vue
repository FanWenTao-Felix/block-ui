<template>
  <div class="main">
    <decorator-header class="header" :page="page" :widget="widget" :i="i" :j="j">
      <slot name="header">
        <span class="header-title">
          <slot name="icon">
            <i class="iconfont icon-cf-c57"></i>
          </slot>
          <span v-if="badge && badge.isDot" >
          	<badge :name="params.badge">
          		<slot name="title">
          			{{params.title}}
          		</slot>
          	</badge>
          </span>
          <span v-else>
          	{{params.title}} <i v-if="badge && badge.value" class="tip-number">({{badge.value}})</i>
          </span>
        </span>
        <decorator-toolbar class="header-toolbar" :page="page" :widget="widget" :i="i" :j="j" :minimized.sync="minimized">
          <slot name="buttons"></slot>
        </decorator-toolbar>
      </slot>
    </decorator-header>
    <div class="content" v-if="!minimized" :style="'height:'+ params.widgetHeight +'px;overflow: auto;'">
      <slot></slot>
    </div>
    <div class="footer" v-if="!minimized && $slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'decorator-default',
    props: ['page', 'widget', 'params', 'i', 'j', 'editMode'],
    data () {
      return {
        minimized: false
      }
    },
    computed: {
      badge () {
        if (this.params.badge) {
          return this.$store.getters.badge(this.params.badge)
        }
      }
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
.footer {
  padding: 5px 10px;
}
.tip-number{color:red;font-style:normal;}
</style>
