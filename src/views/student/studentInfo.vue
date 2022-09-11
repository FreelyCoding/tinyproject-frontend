<template>
  <v-app>
    <v-card
        color="grey lighten-4"
        flat
        tile
    >
      <v-toolbar flat>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>学生管理</v-toolbar-title>

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

    <v-tabs
        v-model="tab"
        centered
        icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab>
        学生信息
        <v-icon>mdi-account-box</v-icon>
      </v-tab>

      <v-tab>
        已选课程
        <v-icon>mdi-heart</v-icon>
      </v-tab>

      <v-tab>
        学生选课
        <v-icon>mdi-heart</v-icon>
      </v-tab>

      <v-tab-item>
        <v-container class="my-3">
          <v-card class="mx-auto" :max-width="$vuetify.breakpoint.mobile ? '100%' : '65%'">
            <v-card-title>
              <v-icon>mdi-account-details-outline</v-icon>
              <span class="ml-3">查看学生信息</span>
            </v-card-title>
            <v-divider></v-divider>

            <v-card-text>
              <v-row no-gutters>
                <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 5" class="my-6">
                  <v-avatar size="100" class="mt-4">
                    <v-img>
                      <template v-slot:placeholder>
                        <v-img :src="require('@/assets/user.svg')" />
                      </template>
                    </v-img>
                  </v-avatar>
                  <v-row no-gutters class="justify-center">
                    <v-col cols="6">
                      <v-divider class="my-6 align-center"></v-divider>
                    </v-col>
                  </v-row>
                  <div class="text-h5">{{ this.$route.query['real_name'] }}</div>
                </v-col>

                <v-col>
                  <v-col v-for="item in items" :key="item.type" cols="12" class="text-left my-2">
                    <v-icon>{{ item.icon }}</v-icon>
                    <span class="ml-3" style="display: inline-block; vertical-align: top" v-if="$vuetify.breakpoint.mobile">
                  <span style="display: block">{{ item.type }}</span>
                  <span style="display: block">{{ item.value }}</span>
                </span>
                    <span class="ml-3" v-else>
                  {{ item.type }}
                  <span class="mx-3"></span>
                  {{ item.value }}
                </span>
                  </v-col>
                </v-col>
              </v-row>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-text>
              <v-row no-gutters>
                <v-col class="text-right">
                  <v-btn text class="body-1 text-right" color="error" @click="dialog = true">修改个人信息</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <v-dialog @click:outside="cancel" v-model="dialog" :max-width="dialogWidth">
            <v-card>
              <v-toolbar color="green lighten-3" class="text-h6">修改学生信息</v-toolbar>
              <v-card-text>
                <v-form ref="editForm" v-model="editedItem.valid" class="mt-12 mb-1" lazy-validation>
                  <v-row>
                    <v-col cols="12" sm="8" md="6">
                    <v-text-field color="success" v-model="editedItem.id" :label="headers[0].text" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="8" md="6">
                      <v-text-field
                          color="success"
                          v-model="editedItem.name"
                          :label="headers[1].text"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="8" md="6">
                      <v-text-field
                          color="success"
                          v-model="editedItem.grade"
                          :label="headers[2].text"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="8" md="6">
                      <v-text-field
                          color="success"
                          v-model="editedItem.major"
                          :label="headers[3].text"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="8" md="6">
                      <v-text-field
                          color="success"
                          v-model="editedItem.class"
                          :label="headers[4].text"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="8" md="6">
                      <v-text-field
                          color="success"
                          v-model="editedItem.email"
                          :label="headers[5].text"
                      ></v-text-field>
                    </v-col>
                    <v-btn class="ma-2 ml-3" color="success" @click="cancel">取消修改</v-btn>
                    <v-btn class="ma-2 ml-3" color="error" @click="cancel">确认修改</v-btn>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>

        </v-container>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>
              Sed aliquam ultrices mauris. Donec posuere vulputate arcu. Morbi ac felis. Etiam feugiat lorem non metus. Sed a libero.
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>
              Sed aliquam ultrices mauris. Donec posuere vulputate arcu. Morbi ac felis. Etiam feugiat lorem non metus. Sed a libero.
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>

    </v-tabs>

  </v-app>
</template>


<script>
export default {
  data () {
    return {
      name: 'studentInfo',
      tab: null,
      dialogWidth: null,
      dialog: false,
      editedItem: {
        id: this.$route.query['id'],
        name: this.$route.query['real_name'],
        major: this.$route.query['major'],
        class: this.$route.query['class'],
        email: this.$route.query['email'],
        grade: this.$route.query['grade'],
        valid: true
      },

    }
  },
  computed: {
    headers() {
      return [
        {
          text: '学号',
          value: 'id'
        },
        {
          text: '姓名',
          value: 'real_name'
        },
        {
          text: '年级',
          value: 'grade'
        },
        {
          text: '专业',
          value: 'major',
          width: '12%'
        },
        {
          text: '班级',
          value: 'class'
        },
        {
          text: '用户邮箱',
          value: 'email'
        },
        {
          text: '用户管理',
          value: 'action',
          width: '32%'
        }
      ];
    },
    items() {
      return [
        {
          icon: 'mdi-card-account-details',
          type: '学号',
          value: this.$route.query['id']
        },
        {
          icon: 'mdi-account-multiple',
          type: '专业',
          value: this.$route.query['major']
        },
        {
          icon: 'mdi-email',
          type: '邮箱',
          value: this.$route.query['email']
        },
        {
          icon: 'mdi-calendar-range',
          type: '年级',
          value: this.$route.query['grade']
        },
        {
          icon: 'mdi-school',
          type: '班级',
          value: this.$route.query['class']
        }
      ];
    },
  },
  beforeMount() {
    this.dialogWidth = this.$vuetify.breakpoint.mobile ? '85%' : '30%';
  },
  async mounted() {
    await this.refresh();
  },
  async refresh() {
    this.editedItem.name = this.$route.query['real_name'];
    this.editedItem.major = this.$route.query['major'];
    this.editedItem.class = this.$route.query['class'];
    this.editedItem.id = this.$route.query['id'];
    this.editedItem.grade = this.$route.query['grade'];
    this.editedItem.email = this.$route.query['email'];
  },
  methods: {
    cancel() {
      this.dialog = false;
      this.refresh();
    },
  }
}
</script>