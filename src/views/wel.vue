<template>
    <div>
        <div class="wel__header">
            <div class="wel__info">
              　<img data-v-332773f0="" src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                    alt="" class="wel__info-img">
                <div class="wel__info-content">
                    <div class="wel__info-title">
                        block-ui
                    </div>
                </div>
            </div>
          <div class="wel__extra">
            <div class="wel__extra-item">
              <p class="wel__extra-title">
                56 56
              </p>
              <p class="wel__extra-subtitle">
                56
              </p>
            </div>
            <div class="wel__extra-item">
              <p class="wel__extra-title">
                block-ui
              </p>
              <p class="wel__extra-subtitle">
                8 <span>/ 24</span>
              </p>
            </div>
            <div class="wel__extra-item">
              <p class="wel__extra-title">
                block-ui
              </p>
              <p class="wel__extra-subtitle">
                2,223
              </p>
            </div>
          </div>
        </div>
      <basic-container>
        <avue-data-box :option="option1"></avue-data-box>
      </basic-container>

      <el-row :span="24">
        <el-col :span="18">
          <basic-container>
            <avue-data-progress :option="option3"
                                style="margin-bottom:20px"></avue-data-progress>
            <avue-data-tabs :option="option"></avue-data-tabs>
          </basic-container>
        </el-col>
        <el-col :span="6">
          <basic-container>
            <avue-data-icons :option="option2"></avue-data-icons>
          </basic-container>
        </el-col>
      </el-row>
      <basic-container>
<!--    <avue-crud :option="option4"
                   :data="data">
        </avue-crud>-->
      </basic-container>
    </div>
</template>

<script>
  import avueDataBox from '@/components/data-box/main'
  import avueDataProgress from '@/components/data-progress/main'
  import avueDataIcons from '@/components/data-icons/main'
  import avueDataTabs from '@/components/data-tabs/main'

  export default {
    components: { avueDataBox, avueDataProgress, avueDataIcons, avueDataTabs },
    name: 'wel',
    data () {
      return {
        data: 123
      }
    },
    computed: {
      option () {
        return {
          span: 8,
          data: [
            {
              title: this.$t('wel.data.column1'),
              subtitle: this.$t('wel.data.subtitle'),
              count: 7993,
              allcount: 10222,
              text: this.$t('wel.data.text1'),
              color: 'rgb(27, 201, 142)',
              key: this.$t('wel.data.key1')
            },
            {
              title: this.$t('wel.data.column2'),
              subtitle: this.$t('wel.data.subtitle'),
              count: 3112,
              allcount: 10222,
              text: this.$t('wel.data.text2'),
              color: 'rgb(230, 71, 88)',
              key: this.$t('wel.data.key2')
            },
            {
              title: this.$t('wel.data.column3'),
              subtitle: this.$t('wel.data.subtitle'),
              count: 908,
              allcount: 10222,
              text: this.$t('wel.data.text3'),
              color: 'rgb(56, 161, 242)',
              key: this.$t('wel.data.key3')
            }
          ]
        }
      },
      option1 () {
        return {
          span: 6,
          data: [
            {
              title: this.$t('wel.data4.column1'),
              count: 12332,
              icon: 'el-icon-warning',
              color: 'rgb(49, 180, 141)',
              href: 'https://avue.top',
              target: '_blank'
            },
            {
              title: this.$t('wel.data4.column2'),
              count: 33,
              icon: 'el-icon-view',
              color: 'rgb(56, 161, 242)',
              href: 'https://avue.top',
              target: '_blank'
            },
            {
              title: this.$t('wel.data4.column3'),
              count: 2223,
              icon: 'el-icon-setting',
              color: 'rgb(117, 56, 199)',
              href: 'https://avue.top',
              target: '_blank'
            },
            {
              title: this.$t('wel.data4.column4'),
              count: 2223,
              icon: 'el-icon-setting',
              color: 'rgb(230, 71, 88)',
              href: 'https://avue.top',
              target: '_blank'
            }
          ]
        }
      },
      option2 () {
        return {
          span: 12,
          data: [
            {
              title: this.$t('wel.data2.column1'),
              count: 12678,
              icon: 'el-icon-tickets',
              href: 'https://avue.top',
              target: '_blank'
            },
            {
              title: this.$t('wel.data2.column2'),
              count: 22139,
              icon: 'el-icon-success',
              href: 'https://avue.top',
              target: '_blank'
            },
            {
              title: this.$t('wel.data2.column3'),
              count: 35623,
              icon: 'el-icon-info',
              href: 'https://avue.top',
              target: '_blank'
            },
            {
              title: this.$t('wel.data2.column4'),
              count: 16826,
              icon: 'el-icon-message',
              href: 'https://avue.top',
              target: '_blank'
            }
          ]
        }
      },
      option3 () {
        return {
          span: 8,
          data: [
            {
              title: this.$t('wel.data3.column1'),
              color: 'rgb(178, 159, 255)',
              count: 32,
              href: 'https://avue.top',
              target: '_blank'
            },
            {
              title: this.$t('wel.data3.column2'),
              color: 'rgb(230, 71, 88)',
              count: 32,
              href: 'https://avue.top',
              target: '_blank'
            },
            {
              title: this.$t('wel.data3.column3'),
              color: 'rgb(230, 71, 88)',
              count: 32,
              href: 'https://avue.top',
              target: '_blank'
            }
          ]
        }
      }
    },
    created () {
    },
    methods: {}
  }
</script>

<style scoped="scoped" lang="scss">
  .wel {
    &__header {
      padding: 25px 40px;
      border-bottom: 1px solid #e8e8e8;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__info {
      display: flex;
      align-items: center;

      &-img {
        border-radius: 72px;
        display: block;
        width: 72px;
        height: 72px;

        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }

      &-content {
        position: relative;
        margin-left: 24px;
        color: rgba(0, 0, 0, 0.45);
        line-height: 22px;
      }

      &-title {
        font-size: 20px;
        line-height: 28px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
        margin-bottom: 12px;
      }

      &-subtitle {
        position: relative;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        line-height: 22px;
      }
    }

    &__extra {
      &-item {
        position: relative;
        padding: 0 32px;
        display: inline-block;

        &:last-child {
          &::after {
            display: none;
          }
        }

        &:after {
          background-color: #e8e8e8;
          position: absolute;
          top: 30px;
          right: 0;
          width: 1px;
          height: 40px;
          content: "";
        }
      }

      &-title {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        line-height: 22px;
        margin-bottom: 4px;
      }

      &-subtitle {
        color: rgba(0, 0, 0, 0.85);
        font-size: 30px;
        line-height: 38px;
        margin: 0;

        span {
          color: rgba(0, 0, 0, 0.45);
          font-size: 20px;
        }
      }
    }
  }
</style>
