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
                  <v-btn text class="body-1 text-right" color="error" @click="showDialog">修改学生信息</v-btn>
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
                    <v-text-field color="success" v-model="editedItem.student_id" :label="student_headers[0].text" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="8" md="6">
                      <v-text-field
                          color="success"
                          v-model="editedItem.name"
                          :label="student_headers[2].text"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="8" md="6">
                      <v-text-field
                          color="success"
                          v-model="editedItem.college_grade"
                          :label="student_headers[3].text"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="8" md="6">
                      <v-text-field
                          color="success"
                          v-model="editedItem.major"
                          :label="student_headers[4].text"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="8" md="6">
                      <v-text-field
                          color="success"
                          v-model="editedItem.class"
                          :label="student_headers[5].text"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="8" md="6">
                      <v-text-field
                          color="success"
                          v-model="editedItem.email"
                          :label="student_headers[6].text"
                      ></v-text-field>
                    </v-col>
                    <v-btn class="ma-2 ml-3" color="success" @click="cancel">取消修改</v-btn>
                    <v-btn class="ma-2 ml-3" color="error" @click="submitStudentProfile">确认修改</v-btn>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-container>
      </v-tab-item>

      <v-tab-item>
        <v-data-table
            :headers="cur_course_headers"
            :items="cur_course_filter.courses"
            sitem-key="name"
            :page.sync="cur_course_page"
            :items-per-page="cur_course_itemsPerPage"
            hide-default-footer
            disable-sort
            calculate-widths
        >
          <template v-slot:[`item.action`]="{ item }">
            <v-btn text color="primary" class="ml-n3" @click="quit(item)">
              <v-icon small class="mr-2">mdi-pencil</v-icon>退选
            </v-btn>
          </template>
        </v-data-table>
        <v-divider></v-divider>
        <v-toolbar flat class="mb-6">
          <v-spacer></v-spacer>
          <v-pagination color="success" v-model="cur_course_page" :length="cur_course_pageCount" total-visible="7"></v-pagination>
          <v-toolbar-items v-if="!$vuetify.breakpoint.mobile" class="ml-2 mt-10">
            <span>跳至</span>
            <v-text-field
                color="success"
                v-model="cur_course_jumpPage"
                style="width: 28px; margin-top: -2px"
                @blur="cur_course_jump"
                @keyup.enter.native="cur_course_jump"
                dense
            ></v-text-field>
            <span>页，每页显示</span>
            <v-select
                color="success"
                item-color="success"
                v-model="cur_course_itemsPerPage"
                :items="itemsPerPageList"
                style="width: 50px; margin-top: -2px"
                dense
            ></v-select>
            <span>条</span>
          </v-toolbar-items>
        </v-toolbar>
      </v-tab-item>

      <v-tab-item>
        <v-data-table
            :headers="available_course_headers"
            :items="available_course_filter.courses"
            sitem-key="name"
            :page.sync="available_course_page"
            :items-per-page="available_course_itemsPerPage"
            hide-default-footer
            disable-sort
            calculate-widths
        >
          <template v-slot:[`item.action`]="{ item }">
            <v-btn text color="primary" class="ml-n3" @click="choose(item)">
              <v-icon small class="mr-2">mdi-pencil</v-icon>选课
            </v-btn>
          </template>
        </v-data-table>
        <v-divider></v-divider>
        <v-toolbar flat class="mb-6">
          <v-spacer></v-spacer>
          <v-pagination color="success" v-model="available_course_page" :length="available_course_pageCount" total-visible="7"></v-pagination>
          <v-toolbar-items v-if="!$vuetify.breakpoint.mobile" class="ml-2 mt-10">
            <span>跳至</span>
            <v-text-field
                color="success"
                v-model="available_course_jumpPage"
                style="width: 28px; margin-top: -2px"
                @blur="available_course_jump"
                @keyup.enter.native="available_course_jump"
                dense
            ></v-text-field>
            <span>页，每页显示</span>
            <v-select
                color="success"
                item-color="success"
                v-model="available_course_itemsPerPage"
                :items="itemsPerPageList"
                style="width: 50px; margin-top: -2px"
                dense
            ></v-select>
            <span>条</span>
          </v-toolbar-items>
        </v-toolbar>
      </v-tab-item>

    </v-tabs>

  </v-app>
</template>


<script>
import {delClass, getStudentProfile, queryStudentCourse, queryStudentSelectable, updateStudent} from "@/api/student";

export default {
  data () {
    return {
      name: 'studentInfo',
      tab: null,
      dialogWidth: null,
      dialog: false,
      editedItem: {
        // TODO: 改成向后端请求student_profile后，这里就不用赋初值了
        id: '',
        name: '',
        major: '',
        class: '',
        email: '',
        college_grade: '',
        student_id: '',
        valid: true
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
      cur_course_filter: {
        id: '',
        course_id: '',
        name: '',
        teacher: '',
        classroom: '',
        max_capacity: '',
        cur_capacity: '',
        courses: [
          {
            'id': '1',
            'course_id': '1',
            'name': 'Database',
            'teacher': 'Lang',
            'classroom': 'F102',
            'max_capacity': '100',
            'cur_capacity': '99',
          }
        ]
      },
      cur_course_page: 1,
      cur_course_jumpPage: '',
      cur_course_pageCount: 1,
      cur_course_itemsPerPage: 15,

      available_course_filter: {
        id: '',
        course_id: '',
        name: '',
        teacher: '',
        classroom: '',
        max_capacity: '',
        cur_capacity: '',
        courses: [
          {
            'id': '1',
            'course_id': '1',
            'name': 'Database',
            'teacher': 'Lang',
            'classroom': 'F102',
            'max_capacity': '100',
            'cur_capacity': '99',
          }
        ]
      },
      available_course_page: 1,
      available_course_jumpPage: '',
      available_course_pageCount: 1,
      available_course_itemsPerPage: 15,
      itemsPerPageList: [5, 10, 15, 20, 30, 50],
    }
  },
  computed: {
    student_headers() {
      return [
        {
          text: 'ID',
          value: 'id'
        },
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
        },
        {
          text: '用户管理',
          value: 'action',
          width: '32%'
        }
      ];
    },
    cur_course_headers() {
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
        },
        {
          text: '最大容量',
          value: 'max_capacity'
        },
        {
          text: '当前容量',
          value: 'cur_capacity'
        },
        {
          text: '退选',
          value: 'action',
        }
      ];
    },
    available_course_headers() {
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
        },
        {
          text: '最大容量',
          value: 'max_capacity'
        },
        {
          text: '当前容量',
          value: 'cur_capacity'
        },
        {
          text: '选课',
          value: 'action',
        }
      ];
    },
    items() {
      return [
        {
          icon: 'mdi-card-account-details',
          type: '学号',
          value: this.student_profile['student_id']
        },
        {
          icon: 'mdi-account-multiple',
          type: '专业',
          value: this.student_profile['major']
        },
        {
          icon: 'mdi-email',
          type: '邮箱',
          value: this.student_profile['email']
        },
        {
          icon: 'mdi-calendar-range',
          type: '年级',
          value: this.student_profile['college_grade']
        },
        {
          icon: 'mdi-school',
          type: '班级',
          value: this.student_profile['class']
        }
      ];
    },
  },
  watch: {
    cur_course_page: async function () {
      await this.refresh();
    },
    cur_course_itemsPerPage: async function () {
      await this.updateWithFix();
    },
    available_course_page: async function () {
      await this.refresh();
    },
    available_course_itemsPerPage: async function () {
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
    async updateWithFix() {
      // cur_page设了一个watch属性，如果cur_page的值发生变化，则一定会刷新页面
      if (this.cur_course_page === 1) {
        await this.refresh();
      } else {
        this.cur_course_page = 1;
      }
      if (this.available_course_page === 1) {
        await this.refresh();
      } else {
        this.available_course_page = 1;
      }
    },
    async quit(item) {
      let payload = {
        student_id: this.student_profile['student_id'],
        course_id: item['course_id']
      };
      let response = await delClass(payload);
      console.log(response)
      await this.refresh();
    },
    async refresh() {
      let payload = {
        student_id: this.$route.query['student_id']
      };
      let response_profile = await getStudentProfile(payload);
      console.log(response_profile)
      this.student_profile = response_profile.data;

      let response_current_course = await queryStudentCourse(payload);
      console.log(response_current_course)
      this.cur_course_filter.courses = response_current_course.data;
      this.cur_course_pageCount = Math.ceil(this.cur_course_filter.courses.length / this.cur_course_itemsPerPage);

      let response_available_course = await queryStudentSelectable(payload);
      console.log(response_available_course)
      this.available_course_filter.courses = response_available_course.data;
      this.available_course_pageCount = Math.ceil(this.available_course_filter.courses.length / this.available_course_itemsPerPage);
    },
    async cur_course_jump() {
      let next = !isNaN(parseInt(this.cur_course_jumpPage, 10)) ? parseInt(this.cur_course_jumpPage) : this.cur_course_page;
      next = Math.min(Math.max(1, next), this.cur_course_pageCount);
      if (next !== this.cur_course_page) {
        this.cur_course_page = next;
      }
      this.cur_course_jumpPage = '';
    },
    async available_course_jump() {
      let next = !isNaN(parseInt(this.available_course_jumpPage, 10))  ? parseInt(this.available_course_jumpPage) : this.available_course_page;
      next = Math.min(Math.max(1, next), this.available_course_pageCount);
      if (next !== this.available_course_page) {
        this.available_course_page = next;
      }
      this.available_course_jumpPage = '';
    },
    showDialog() {
      this.dialog = true;
      this.editedItem.name = this.student_profile['name'];
      this.editedItem.major = this.student_profile['major'];
      this.editedItem.class = this.student_profile['class'];
      this.editedItem.id = this.student_profile['id'];
      this.editedItem.student_id = this.student_profile['student_id'];
      this.editedItem.college_grade = this.student_profile['college_grade'];
      this.editedItem.email = this.student_profile['email'];
    },
    submitStudentProfile() {
      let response =  updateStudent({
        name: this.editedItem.name,
        major: this.editedItem.major,
        class: this.editedItem.class,
        id: this.editedItem.id,
        student_id: this.editedItem.student_id,
        college_grade: this.editedItem.college_grade,
        email: this.editedItem.email,
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