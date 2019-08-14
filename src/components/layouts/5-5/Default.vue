<template>
  <el-row>
    <el-col :span="12">
      <port :page="page" :index="0"></port>
    </el-col>
    <el-col :span="12">
      <port :page="page" :index="1"></port>
    </el-col>
  </el-row>
</template>

<script>
  import Port from '@/components/port/index'
  export default {
    components: {Port},
    name: 'layout-5-5',
    props: ['page', 'layout'],
    data () {
      return {}
    }
  }
</script>

<style>
</style>
