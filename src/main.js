import Vue from 'vue';
import App from './App.vue';
import Article from './components/article.vue';
import Create from './components/create.vue';
import View from './components/view.vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter();

router.map({
  '/': {
    component: Article
  },
  '/create/': {
    component: Create
  },
  '/edit/:noteId': {
    name: 'edit',
    component: Create
  },
  '/view/:noteId/': {
    name: 'view',
    component: View
  }
});

router.redirect({
  '*': '/'
});

router.start(App, '#app');
