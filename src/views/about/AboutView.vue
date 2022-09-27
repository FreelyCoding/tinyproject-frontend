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

      <v-toolbar-title>关于</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="reveal_like_dialog = showSakana = true">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-toolbar>
    </v-card>

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

    <v-container>
      <v-card
          class="mx-auto"
          max-width="500px"
      >
        <v-card-text>
          <v-container>
          <v-row no-gutters>
            <v-col :key="1">
              <div>本页面由vue.js渲染呈现</div>
              <p class="text-h4 text--primary">
                <v-img src="@/assets/logo.png" height="125" contain></v-img>
              </p>
            </v-col>
            <v-col :key="2">
              <div>本页面采用vuetify框架</div>
              <p class="text-h4 text--primary">
                <v-img src="@/assets/logo.svg" height="125" contain></v-img>
              </p>
            </v-col>
          </v-row>
          </v-container>

          <p>系统信息</p>
          <div class="text--primary">
            {{text}}
          </div>
          <p></p>
          <p>作者</p>
          <div class="text--primary">
            Longxmas, flyinglandlord, Sicong Li
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
              text
              color="teal accent-4"
              @click="addCount"
          >
            不要点我~
          </v-btn>
        </v-card-actions>

        <v-snackbar
            v-model="snackbar"
            :timeout="500"
        >
          再点{{5-this.count}}下试试？
          <template v-slot:action="{ attrs }">
            <v-btn
                color="pink"
                text
                v-bind="attrs"
                @click="snackbar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-card>
      <v-card v-if="count >= 5">
      <iframe src="https://lab.magiconch.com/sakana/deto.html?scale=0.4" style="width: 800px; height: 500px;transform-origin: left top;">
      </iframe>
      </v-card>
    </v-container>
  </v-app>
</template>
<script>

export default {
  data () {
    return {
      name: 'AboutView',
      reveal_like_dialog: false,
      reveal: false,
      dialogWidth: null,
      showSakana: false,
      count: 0,
      snackbar: false,
      text: null
    }
  },
  beforeMount() {
    this.dialogWidth = this.$vuetify.breakpoint.mobile ? '85%' : '30%';
    this.text = navigator.userAgent;
  },
  methods: {
    addCount() {
      if (this.count < 5) {
        this.count = this.count + 1;
        this.snackbar = true;
      }
    },
    roll_back() {
      this.$router.back();
    }
  }
}
</script>
