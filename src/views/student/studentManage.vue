<template>
  <v-app>
    <v-card
        color="grey lighten-4"
        flat
        tile
    >
      <v-toolbar dense>
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

    <v-container>
      <v-card class="mx-auto mt-6" max-width="90%">
      <v-container class="text-left" v-if="!$vuetify.breakpoint.mobile">
        <v-form ref="form" class="mb-n6" lazy-validation @keyup.enter.native="select">
          <v-text-field
              color="success"
              class="search-textarea mr-3"
              v-model="filter.id"
              append-icon="mdi-magnify"
              label="学号"
              outlined
              clearable
              dense
          ></v-text-field>
          <v-text-field
              color="success"
              class="search-textarea mr-3"
              v-model="filter.name"
              append-icon="mdi-magnify"
              label="姓名"
              outlined
              clearable
              dense
          ></v-text-field>
          <v-text-field
              color="success"
              class="search-textarea mr-3"
              v-model="filter.class"
              append-icon="mdi-magnify"
              label="班级"
              outlined
              clearable
              dense
          ></v-text-field>
          <v-text-field
              color="success"
              item-color="success"
              class="search-textarea mr-3"
              append-icon="mdi-magnify"
              v-model="filter.college_grade"
              label="年级"
              outlined
              clearable
              dense
          ></v-text-field>
          <v-btn color="success" @click="select" class="mb-1 mr-3" height="40px">筛选</v-btn>
          <v-btn color="warning" @click="clear" class="mb-1" height="40px">清除筛选</v-btn>
        </v-form>
      </v-container>
        <v-divider></v-divider>
        <v-data-table
            :headers="headers"
            :items="filter.students"
            sitem-key="name"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-footer
            disable-sort
            calculate-widths
        >
          <template v-slot:[`item.action`]="{ item }">
            <v-btn text color="primary" class="ml-n3" @click="detail(item)">
              <v-icon small class="mr-2">mdi-pencil</v-icon>查看详情
            </v-btn>
          </template>
        </v-data-table>
        <v-divider></v-divider>
        <v-toolbar flat class="mb-6">
          <v-spacer></v-spacer>
          <v-pagination color="success" v-model="page" :length="pageCount" total-visible="7"></v-pagination>
          <v-toolbar-items v-if="!$vuetify.breakpoint.mobile" class="ml-2 mt-10">
            <span>跳至</span>
            <v-text-field
                color="success"
                v-model="jumpPage"
                style="width: 28px; margin-top: -2px"
                @blur="jump"
                @keyup.enter.native="jump"
                dense
            ></v-text-field>
            <span>页，每页显示</span>
            <v-select
                color="success"
                item-color="success"
                v-model="itemsPerPage"
                :items="itemsPerPageList"
                style="width: 50px; margin-top: -2px"
                dense
            ></v-select>
            <span>条</span>
          </v-toolbar-items>
        </v-toolbar>

      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import {queryAllStudent} from "@/api/student";

export default {
  data () {
    return {
      name: 'studentManage',
      filter: {
        student_id: '',
        name: '',
        class: '',
        college_grade: '',
        students: []
      },
      page: 1,
      jumpPage: '',
      pageCount: 1,
      itemsPerPage: 15,
      itemsPerPageList: [5, 10, 15, 20, 30, 50],
    }
  },
  watch: {
    page: async function () {
      await this.refresh();
    },
    itemsPerPage: async function () {
      await this.updateWithFix();
    }
  },
  async mounted() {
    await this.refresh();
  },
  methods: {
    async refresh() {
      // TODO: 筛选的逻辑需要后端支持，后端查询API增加stduent_id, name, class, college_grade字段，返回符合要求的项目从而实现筛选
      // TODO: 同理，每次重新选择分页都会刷新，分页也需要后端支持，即传入limit和offset，返回相应页面的limit个数值
      let payload = {
        limit: this.itemsPerPage,
        offset: (this.page - 1) * this.itemsPerPage
      };
      if (this.filter.id !== null && this.filter.id !== '') {
        payload['student_id'] = this.filter.student_id;
      }
      if (this.filter.name !== null && this.filter.name !== '') {
        payload['name'] = this.filter.name;
      }
      if (this.filter.class !== null && this.filter.class !== '') {
        payload['class'] = this.filter.class;
      }
      if (this.filter.college_grade !== null && this.filter.college_grade !== '') {
        payload['college_grade'] = this.filter.college_grade;
      }
      let response = await queryAllStudent(payload);
      console.log(response)
      this.filter.students = response.data
      this.pageCount = Math.ceil(this.filter.students.length / this.itemsPerPage);
    },
    async jump() {
      let next = !isNaN(parseInt(this.jumpPage, 10)) ? parseInt(this.jumpPage) : this.page;
      next = Math.min(Math.max(1, next), this.pageCount);
      if (next !== this.page) {
        this.page = next;
      }
      this.jumpPage = '';
    },
    async select() {
      await this.updateWithFix();
    },
    async updateWithFix() {
      // page设了一个watch属性，如果page的值发生变化，则一定会刷新页面
      if (this.page === 1) {
        await this.refresh();
      } else {
        this.page = 1;
      }
    },
    hasSelect() {
      if (this.filter.id !== null && this.filter.id !== '') {
        return true;
      }
      // TODO: 补齐所有的select
    },
    async clear() {
      if (this.hasSelect()) {
        this.$refs.form.reset();
        await this.updateWithFix();
      }
    },
    detail(item) {
      this.$router.push({
        path: 'student-info/' + item['id'],
        query: {
          id: item['id'],
          student_id: item['student_id'],
          name: item['name'],
          email: item['email'],
          college_grade: item['college_grade'],
          class: item['class'],
          major: item['major']
        }
      });
    },
  },
  computed: {
    headers() {
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
        }
      ];
    }
  }
}
</script>

<style scoped>
.search-textarea {
  display: inline-block;
  width: 15%;
}
</style>
