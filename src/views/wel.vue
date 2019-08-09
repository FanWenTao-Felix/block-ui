<template>
    <div>
        <div class="wel__header">
            <div class="wel__info">
                <div class="wel__info-content">
                    <div class="wel__info-title">
                        block-ui
                    </div>
                </div>
            </div>
        </div>
        <basic-container>
            <avue-data-box :option="option1"></avue-data-box>
        </basic-container>
    </div>
</template>

<script>
  export default {
    name: 'wel',
    data () {
      return {
        data: 123
      }
    },
    computed: {
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
      option4 () {
        return {
          index: true,
          column: [
            {
              label: this.$t('wel.table.rw'),
              prop: 'rw'
            },
            {
              width: 500,
              label: this.$t('wel.table.nr'),
              prop: 'nr',
              overHidden: true
            },
            {
              label: this.$t('wel.table.sj'),
              prop: 'sj'
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
