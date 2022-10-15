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

        <v-toolbar-title>课程管理</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon @click="reveal_like_dialog = true">
          <v-icon>mdi-heart</v-icon>
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
        课程信息
        <v-icon>mdi-account-box</v-icon>
      </v-tab>
      <v-tab>
        选课学生
        <v-icon>mdi-heart</v-icon>
      </v-tab>


      <v-tab-item>
        <v-container class="my-3">
          <v-card class="mx-auto" :max-width="$vuetify.breakpoint.mobile ? '100%' : '65%'">
            <v-card-title>
              <v-icon>mdi-account-details-outline</v-icon>
              <span class="ml-3">查看课程信息</span>
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
                  <div class="text-h5">{{ this.$route.query['name'] }}</div>
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
                  <v-btn text class="body-1 text-right" color="error" @click="showDialog">修改课程信息</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-dialog @click:outside="cancel" v-model="dialog" :max-width="dialogWidth">
            <v-card>
              <v-toolbar color="green lighten-3" class="text-h6">修改课程信息</v-toolbar>
              <v-card-text>
                <v-form ref="editForm" v-model="editedItem.valid" class="mt-12 mb-1" lazy-validation>
                  <v-row>
                    <v-col cols="12" sm="8" md="6">
                      <v-text-field color="success" v-model="editedItem.course_id" :label="course_headers[1].text" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="8" md="6">
                      <v-text-field
                          color="success"
                          v-model="editedItem.name"
                          :label="course_headers[2].text"
                          disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="8" md="6">
                      <v-text-field
                          color="success"
                          v-model="editedItem.teacher"
                          :label="course_headers[3].text"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="8" md="6">
                      <v-text-field
                          color="success"
                          v-model="editedItem.classroom"
                          :label="course_headers[4].text"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="8" md="6">
                      <v-text-field
                          color="success"
                          v-model="editedItem.max_capacity"
                          :label="course_headers[5].text"
                          disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="8" md="6">
                      <v-text-field
                          color="success"
                          v-model="editedItem.cur_capacity"
                          :label="course_headers[6].text"
                          disabled
                      ></v-text-field>
                    </v-col>
                    <v-btn class="ma-2 ml-3" color="success" @click="cancel">取消修改</v-btn>
                    <v-btn class="ma-2 ml-3" color="error" @click="submitCourseProfile">确认修改</v-btn>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-container>
      </v-tab-item>

      <v-tab-item>
        <v-data-table
            :headers="cur_student_headers"
            :items="cur_student_filter.students"
            sitem-key="name"
            :page.sync="cur_student_page"
            :items-per-page="cur_student_itemsPerPage"
            hide-default-footer
            disable-sort
            calculate-widths
        >
          <template v-slot:[`item.action`]="{ item }">
            <v-btn text color="primary" class="ml-n3" @click="detail(item)">
              <v-icon small class="mr-2">mdi-pencil</v-icon>退选
            </v-btn>
          </template>
        </v-data-table>
        <v-divider></v-divider>
        <v-toolbar flat class="mb-6">
          <v-spacer></v-spacer>
          <v-pagination color="success" v-model="cur_student_page" :length="cur_student_pageCount" total-visible="7"></v-pagination>
          <v-toolbar-items v-if="!$vuetify.breakpoint.mobile" class="ml-2 mt-10">
            <span>跳至</span>
            <v-text-field
                color="success"
                v-model="cur_student_jumpPage"
                style="width: 28px; margin-top: -2px"
                @blur="cur_student_jump"
                @keyup.enter.native="cur_student_jump"
                dense
            ></v-text-field>
            <span>页，每页显示</span>
            <v-select
                color="success"
                item-color="success"
                v-model="cur_student_itemsPerPage"
                :items="itemsPerPageList"
                style="width: 50px; margin-top: -2px"
                dense
            ></v-select>
            <span>条</span>
          </v-toolbar-items>
        </v-toolbar>
      </v-tab-item>

    </v-tabs>
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
import {getCourseProfile, queryCourseStudent, updateCourse} from "@/api/course";

export default {
  data () {
    return {
      name: 'courseInfo',
      tab: null,
      dialogWidth: null,
      dialog: false,
      reveal_like_dialog: false,
      editedItem: {
        // TODO: 改成向后端请求course_profile后，这里就不用赋初值了
        id: '',
        course_id: '',
        name: '',
        teacher: '',
        classroom: '',
        max_capacity: '',
        cur_capacity: '',
        valid: true
      },
      course_profile: {
        id: '',
        course_id: '',
        name: '',
        teacher: '',
        classroom: '',
        max_capacity: '',
        cur_capacity: '',
      },
      student_profile: {
        id: '',
        name: '',
        major: '',
        class: '',
        email: '',
        college_grade: '',
        student_id: '',
      },

      cur_student_filter: {
        id: '',
        name: '',
        class: '',
        college_grade: '',
        students: []
      },
      cur_student_page: 1,
      cur_student_jumpPage: '',
      cur_student_pageCount: 1,
      cur_student_itemsPerPage: 15,
      itemsPerPageList: [5, 10, 15, 20, 30, 50],

    }
  },
  computed: {
    cur_student_headers() {
      return [
        {
          text: '学号',
          value: 'student_id'
        },
        {
          text: '姓名',
          value: 'name'
        },
        {
          text: '年级',
          value: 'college_grade'
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
        }
      ];
    },
    course_headers() {
      return [
        {
          text: 'ID',
          value: 'id'
        },
        {
          text: '课程号',
          value: 'course_id'
        },
        {
          text: '课程名',
          value: 'name'
        },
        {
          text: '授课教师',
          value: 'teacher'
        },
        {
          text: '教室',
          value: 'classroom',
          width: '12%'
        },
        {
          text: '最大容量',
          value: 'max_capacity'
        },
        {
          text: '当前容量',
          value: 'cur_capacity'
        }
      ];
    },

    items() {
      return [
        {
          icon: 'mdi-card-account-details',
          type: '课程号',
          value: this.course_profile['course_id']
        },
        {
          icon: 'mdi-account-multiple',
          type: '课程名',
          value: this.course_profile['name']
        },
        {
          icon: 'mdi-email',
          type: '授课教师',
          value: this.course_profile['teacher']
        },
        {
          icon: 'mdi-calendar-range',
          type: '教室',
          value: this.course_profile['classroom']
        },
        {
          icon: 'mdi-school',
          type: '最大容量',
          value: this.course_profile['max_capacity']
        },
        {
          icon: 'mdi-school',
          type: '已选容量',
          value: this.course_profile['cur_capacity']
        }
      ];
    },
  },
  watch: {
    cur_student_page: async function () {
      await this.refresh();
    },
    cur_student_itemsPerPage: async function () {
      await this.updateWithFix();
    },
  },
  beforeMount() {
    this.dialogWidth = this.$vuetify.breakpoint.mobile ? '85%' : '30%';
  },
  async mounted() {
    await this.refresh();
  },
  methods: {
    roll_back() {
      this.$router.back();
    },
    async updateWithFix() {
      // cur_page设了一个watch属性，如果cur_page的值发生变化，则一定会刷新页面
      if (this.cur_student_page === 1) {
        await this.refresh();
      } else {
        this.cur_student_page = 1;
      }
    },

    async cur_student_jump() {
      let next = !isNaN(parseInt(this.cur_student_jumpPage, 10)) ? parseInt(this.cur_student_jumpPage) : this.page;
      next = Math.min(Math.max(1, next), this.cur_student_pageCount);
      if (next !== this.cur_student_page) {
        this.cur_student_page = next;
      }
      this.cur_student_jumpPage = '';
    },

    async refresh() {
      // TODO: 与后端交互，获取course_profile, cur_courses, available_courses
      let payload = {
        course_id: this.$route.query['course_id']
      };
      let response_profile = await getCourseProfile(payload);
      console.log(response_profile)
      this.course_profile = response_profile.data;

      let response_current_student = await queryCourseStudent(payload);
      console.log(response_current_student)
      this.cur_student_filter.students = response_current_student.data;
      this.cur_student_pageCount = Math.ceil(this.cur_student_filter.students.length / this.cur_student_itemsPerPage);
    },

    showDialog() {
      // TODO: 改成向后端请求course_profile后，需要相应修改这里
      this.dialog = true;
      this.editedItem.name = this.course_profile['name'];
      this.editedItem.teacher = this.course_profile['teacher'];
      this.editedItem.classroom = this.course_profile['classroom'];
      this.editedItem.id = this.course_profile['id'];
      this.editedItem.course_id = this.course_profile['course_id'];
      this.editedItem.cur_capacity = this.course_profile['cur_capacity'];
      this.editedItem.max_capacity = this.course_profile['max_capacity'];
    },

    submitCourseProfile() {
      let response =  updateCourse({
        name: this.editedItem.name,
        teacher: this.editedItem.teacher,
        classroom: this.editedItem.classroom,
        id: this.editedItem.id,
        course_id: this.editedItem.course_id,
        max_capacity: this.editedItem.max_capacity,
        cur_capacity: this.editedItem.cur_capacity,
      });
      console.log(response)
      this.refresh();
      this.cancel();
    },

    cancel() {
      this.dialog = false;
      this.refresh();
    },
  }
}
</script>