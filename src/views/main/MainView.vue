<template>
  <v-app>

    <v-card
        color="grey lighten-4"
        flat
        tile
    >
      <v-toolbar dense>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>主页</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
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
                Origin
              </p>
              <p>late 16th century (as a noun denoting a place where alms were distributed): from medieval Latin
                eleemosynarius, from late Latin eleemosyna ‘alms’, from Greek eleēmosunē ‘compassion’ </p>
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

  </v-app>
</template>


<script>
export default {
  data() {
    return {
      name: 'MainView',
      show: false,
    }
  },
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
