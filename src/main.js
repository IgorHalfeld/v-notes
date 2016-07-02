import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';


// Vuex store
// =========
import store from './vuex/store';

// Components
// ==========
import App from './App.vue';
import Article from './components/article.vue';
import Create from './components/create.vue';
import View from './components/view.vue';

Vue.use(VueRouter);

const router = new VueRouter();

// Route map
// =========
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


// Start App
// ========
router.start({
  store,
  components: { App }
}, '#app');
