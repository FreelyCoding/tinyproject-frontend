<template>
  <v-app>

    <v-card
        color="grey lighten-4"
        flat
        tile
    >
      <v-toolbar dense>
        <v-btn icon class="hidden-xs-only" @click="roll_back">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>

        <v-toolbar-title>主页</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon @click="reveal_like_dialog = true">
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>

    <v-container>
      <v-card
          class="mx-auto"
      >
        <v-card-text>
          <p class="text-h4 text--primary">
            欢迎来到学生选课管理系统
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn
              text
              color="teal accent-4"
              @click="reveal = true"
          >
            Learn More
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <v-card
              v-if="reveal"
              class="transition-fast-in-fast-out v-card--reveal"
              style="height: 100%;"
          >
            <v-card-text class="pb-0">
              <p class="text-h4 text--primary">
                系统功能
              </p>
              <p>本系统实现了学生选课、课程信息、学生信息的查询、修改、删除等功能 </p>
            </v-card-text>
            <v-card-actions class="pt-0">
              <v-btn
                  text
                  color="teal accent-4"
                  @click="reveal = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-expand-transition>
      </v-card>
    </v-container>

    <div class="rightullidiv">
      <img
          src="@/assets/buaa.jpg"
          class="rightulliimg"
      >
    </div>

    <v-dialog v-model="reveal_like_dialog" :max-width="dialogWidth">
      <v-card>
        <v-card-title>
        </v-card-title>
        <v-card-text>
          <p class="text-h4 text--primary">
            感谢支持
          </p>
        </v-card-text>
        <v-btn @click="reveal_like_dialog = false">
          关闭
        </v-btn>
      </v-card>
    </v-dialog>

  </v-app>
</template>


<script>
export default {
  data() {
    return {
      name: 'MainView',
      show: false,
      reveal: false,
      reveal_like_dialog: false,
      dialogWidth: null
    }
  },
  beforeMount() {
    this.dialogWidth = this.$vuetify.breakpoint.mobile ? '85%' : '30%';
  },
  methods:{
    roll_back() {
      this.$router.back();
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.rightullidiv {
  width: 100%;
  /*background: #f2f2f2;*/
  display: flex;
  justify-content: center;
  align-items: center;
  .rightulliimg {
    max-width: 100%;
    max-height: 500px;
    justify-content: center;
    align-items: center;
  }
}
</style>
