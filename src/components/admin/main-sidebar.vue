<template>
  <aside class="site-sidebar" :class="'site-sidebar--' + sidebarLayoutSkin">
    <div class="site-sidebar__inner">
      <el-menu
        :default-active="menuActiveName || 'home'"
        :collapse="sidebarFold"
        :collapseTransition="false"
        class="site-sidebar__menu">
<!--        <el-menu-item index="home" @click="$router.push({ name: 'home' })">-->
<!--          <icon-svg name="shouye" class="site-sidebar__menu-icon"></icon-svg>-->
<!--          <span slot="title">首页</span>-->
<!--        </el-menu-item>-->
        <sub-menu
          v-for="menu in menuList"
          :key="menu.menuId"
          :menu="menu"
          :dynamicMenuRoutes="dynamicMenuRoutes">
        </sub-menu>
      </el-menu>
    </div>
  </aside>
</template>

<script>
import SubMenu from './main-sidebar-sub-menu'
import { isURL } from '@/utils/validate'
export default {
  data () {
    return {
      dynamicMenuRoutes: [],
      menuList:[
        {
          "menuId":30,
          "parentId":0,
          "name":"博文管理",
          "url":'/',
          "perms":null,
          "type":0,
          "icon":"article",
          "orderNum":0,
          "parentName":null,
          "open":null,
          "list":[
            {
              "menuId":31,
              "parentId":30,
              "name":"新增博文",
              "url":"ArticleAddOrUpdate",
              "perms":"article:save,article:update",
              "type":1,
              "icon":"add",
              "orderNum":0,
              "parentName":null,
              "open":null,
              "list":null
            },
            {
              "menuId":32,
              "parentId":30,
              "name":"博文列表",
              "url":"articleList",
              "perms":null,
              "type":1,
              "icon":"list",
              "orderNum":0,
              "parentName":null,
              "open":null,
              "list":null
            }
          ]
        },
        {
          "menuId":66,
          "parentId":0,
          "name":"阅读管理",
          "url":null,
          "perms":null,
          "type":0,
          "icon":"read",
          "orderNum":1,
          "parentName":null,
          "open":null,
          "list":[
            {
              "menuId":73,
              "parentId":66,
              "name":"新增笔记",
              "url":"book/note-add-or-update",
              "perms":"",
              "type":1,
              "icon":"add",
              "orderNum":0,
              "parentName":null,
              "open":null,
              "list":null
            },
            {
              "menuId":67,
              "parentId":66,
              "name":"新增图书",
              "url":"book/book-add-or-update",
              "perms":"",
              "type":1,
              "icon":"add",
              "orderNum":1,
              "parentName":null,
              "open":null,
              "list":null
            },
            {
              "menuId":68,
              "parentId":66,
              "name":"笔记管理",
              "url":"book/note",
              "perms":null,
              "type":1,
              "icon":"list",
              "orderNum":2,
              "parentName":null,
              "open":null,
              "list":null
            },
            {
              "menuId":61,
              "parentId":66,
              "name":"图书管理",
              "url":"book/book",
              "perms":null,
              "type":1,
              "icon":"list",
              "orderNum":3,
              "parentName":null,
              "open":null,
              "list":null
            }
          ]
        }
      ],
      sidebarLayoutSkin: 'light',
      sidebarFold: false
    }
  },
  components: {
    SubMenu
  },
  computed: {
    sidebarFold: {
      get () { return this.sidebarFold }
    },
    menuList: {
      get () { return this.menuList },
      set (val) { this.$store.commit('common/updateMenuList', val) }
    },
    menuActiveName: {
      get () { return this.$store.state.common.menuActiveName },
      set (val) { this.$store.commit('common/updateMenuActiveName', val) }
    },
    mainTabs: {
      get () { return this.$store.state.common.mainTabs },
      set (val) { this.$store.commit('common/updateMainTabs', val) }
    },
    mainTabsActiveName: {
      get () { return this.$store.state.common.mainTabsActiveName },
      set (val) { this.$store.commit('common/updateMainTabsActiveName', val) }
    }
  },
  watch: {
    $route: 'routeHandle'
  },
  created () {
    this.menuList = this.menuList
    this.dynamicMenuRoutes = JSON.parse(sessionStorage.getItem('dynamicMenuRoutes') || '[]')
    this.routeHandle(this.$route)
  },
  methods: {
    // 路由操作
    routeHandle (route) {
      if (route.meta.isTab) {
        // tab选中, 不存在先添加
        var tab = this.mainTabs.filter(item => item.name === route.name)[0]
        if (!tab) {
          if (route.meta.isDynamic) {
            route = this.dynamicMenuRoutes.filter(item => item.name === route.name)[0]
            if (!route) {
              return console.error('未能找到可用标签页!')
            }
          }
          tab = {
            menuId: route.meta.menuId || route.name,
            name: route.name,
            title: route.meta.title,
            type: isURL(route.meta.iframeUrl) ? 'iframe' : 'module',
            iframeUrl: route.meta.iframeUrl || ''
          }
          this.mainTabs = this.mainTabs.concat(tab)
        }
        this.menuActiveName = tab.menuId + ''
        this.mainTabsActiveName = tab.name
      }
    }
  }
}
</script>
