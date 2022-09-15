<template>
  <v-app>
    <v-navigation-drawer permanent dark app :mini-variant.sync="fold">
      <v-list-item class="px-2">
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            学生选课管理系统
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list dense>
        <v-list-item
            @click="updateActive"
            v-for="item in items"
            :key="item.title"
            :to="item.index"
            active-class="select-item"
            color="white"
            link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      name: 'HomeView',
      items: [
        {
          action: 'mdi-dialpad',
          title: '主页',
          index: '/main',
          icon: 'mdi-view-dashboard'
        },
        {
          action: 'mdi-school-outline',
          title: '学生管理',
          index: '/student/student-manage',
          icon: 'mdi-view-dashboard'
        },
        {
          action: 'mdi-file-tree',
          title: '课程管理',
          index: '/course/course-manage',
          icon: 'mdi-view-dashboard'
        },
        {
          action: 'mdi-dialpad',
          title: '关于',
          index: '/about/detail',
          icon: 'mdi-view-dashboard'
        }
      ],
      right: null,
      mini: true,
      fold: this.$vuetify.breakpoint.mobile,
    }
  },
  methods: {
    updateActive() {
      let active = this.items.find((i) => this.$route.matched.length > 0 && i.index === this.$route.matched[0].path);
      active.active = true;
    }
  }
}
</script>
