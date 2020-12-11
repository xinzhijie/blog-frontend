import Vue from 'vue'
import Router from 'vue-router'
import {LoadingBar} from 'iview'
import Index from '@/components/index/Index'
import main from '@/components/admin/main'
// 公共区域
// import CommonHeader from '@/components/header/CommonHeader';
import SimpleHeader from '@/components/header/SimpleHeader/SimpleHeader'
import CommonFooter from '@/components/footer/CommonFooter'
import ArticleAddOrUpdate from '@/components/views/Article/Article-add-or-update'
import Article from '@/components/views/Article/article'
// 首页
import HomeContent from '@/components/content/HomeContent'
import ArticleContent from '@/components/content/ArticleContent'
import BookNoteContent from '@/components/content/BookNoteContent'
import BookContent from '@/components/content/BookContent'
import ArticleListContent from '@/components/content/ArticleListContent'
import BookListContent from '@/components/content/BookListContent'
import TimeLineContent from '@/components/content/TimeLineContent'
import SearchResultContent from '@/components/content/SearchResultContent'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/',
          name: 'index',
          components: {
            header: SimpleHeader,
            content: HomeContent,
            footer: CommonFooter
          },
          meta: {
            title: '码农'
          }
        },
        {
          path: 'article/:articleId',
          name: 'article',
          components: {
            header: SimpleHeader,
            content: ArticleContent,
            footer: CommonFooter
          }
        },
        {
          path: 'articles',
          name: 'articles',
          components: {
            header: SimpleHeader,
            content: ArticleListContent,
            footer: CommonFooter
          },
          meta: {
            title: '码农'
          }
        },
        {
          path: 'articles/category/:id',
          name: 'articles/category',
          components: {
            header: SimpleHeader,
            content: ArticleListContent,
            footer: CommonFooter
          },
          meta: {
            title: '码农'
          }
        },
        {
          path: 'articles/search',
          name: 'search',
          components: {
            header: SimpleHeader,
            content: SearchResultContent,
            footer: CommonFooter
          },
          meta: {
            title: '码农'
          }
        },
        {
          path: 'bookNote/:bookNoteId',
          name: 'bookNote',
          components: {
            header: SimpleHeader,
            content: BookNoteContent,
            footer: CommonFooter
          }
        },
        {
          path: 'book/:bookId',
          name: 'book',
          components: {
            header: SimpleHeader,
            content: BookContent,
            footer: CommonFooter
          }
        },
        {
          path: 'books',
          name: 'books',
          components: {
            header: SimpleHeader,
            content: BookListContent,
            footer: CommonFooter
          },
          meta: {
            title: '阅读 | 码农'
          }
        },
        {
          path: 'books/category/:id',
          name: 'books/category',
          components: {
            header: SimpleHeader,
            content: BookListContent,
            footer: CommonFooter
          },
          meta: {
            title: '阅读 | 码农'
          }
        },
        {
          path: 'timeline',
          name: 'timeline',
          components: {
            header: SimpleHeader,
            content: TimeLineContent,
            footer: CommonFooter
          },
          meta: {
            title: '时间轴 | 码农'
          }
        }
      ],
    },
    {
      path: '/',
      component: main,
      name: 'main',
      meta: { title: '主入口整体布局' },
      children: [
        { path: '/articleAddOrUpdate',
          component: ArticleAddOrUpdate,
          name: 'article-update',
          meta: {
            menuId: 'article-update',
            title: '博文修改',
            isTab: true
          }
        },
        { path: '/articleList',
          component: Article,
          name: 'article-update',
          meta: {
            menuId: 'article-update',
            title: '博文修改',
            isTab: true
          }
        }
      ]
    }
  ]
})

// 配置加载进度条
LoadingBar.config({
  color: '#5cb85c',
  failedColor: '#f0ad4e',
  height: 2
})

router.beforeEach((to, from, next) => {
  LoadingBar.start()
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

router.afterEach((to, from, next) => {
  LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
