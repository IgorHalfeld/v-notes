<template>
    <section class="listnotes">
      <div class="listnotes__note" v-for="note in notes | filterBy search in 'title'" v-link="{ name: 'view', params: { noteId: note.date }}">
        <svg class="listnotes__note--edit" v-link="{ name: 'edit', params: { noteId: note.date }}" >
          <use xlink:href="#icon-icon-pens"></use>
        </svg>
        <svg class="listnotes__note--close" @click="removeNote($index)">
          <use xlink:href="#icon-icon-close"></use>
        </svg>
        <h1>{{note.title | capitalize}}</h1>
        <span>{{formatDate(new Date(note.date))}}</span>
        {{{render(note.text)}}}
      </div>
    </section>
</template>

<script>
  import marked from 'marked';
  import highlight from 'highlight.js';
  import '../../node_modules/highlight.js/styles/github.css';

  marked.setOptions({
    highlight (code) {
      return highlight.highlightAuto(code).value;
    }
  });

  export default {
    vuex: {
      getters: {
        search: store => store.search
      }
    },
    data () {
      return {
        notes: []
      }
    },
    ready () {
      this.listNotes();
    },
    methods: {
      listNotes () {
        let note = localStorage.getItem('vNotes');
        note = JSON.parse(note);
        note.notes.forEach(n => {
          this.notes.push(n);
        });
      },

      removeNote(index) {
        let note = localStorage.getItem('vNotes');
        note = JSON.parse(note);
        note.notes.splice(index, 1);
        this.notes = [];
        localStorage.setItem('vNotes', JSON.stringify(note));
        this.listNotes();
      },

      render (text) {
        return marked(text);
      },

      formatDate (date) {
        const month = 'jan fev mar apr may jun jul aug sep oct nov dec'.split(' ');
        return `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`;
      }
    }
  }
</script>

<style>
  $gray_first: #fff;
  $gray_second: #f5f5f5;
  $main_color: #ff9999;

  @keyframes write {
    from { transform: rotate(-40deg); }
    to { transform: rotate(20deg); }
  }

  @define-extend icons {
    opacity: 0.0;
    position: absolute;
    width: 20px;
    height: 20px;
    fill: $gray_second;
    background-color: #ff8080;
    border: 1px solid #ff6666;
    padding: 10px;
    border-radius: 50%;
    transition: all .1s ease-in-out;
  }

  .listnotes {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    height: 100px;

    .listnotes__note {
      position: relative;
      padding: 10px;
      margin: 10px;
      background-color: $main_color;
      color: $gray_second;
      flex-basis: 250px;
      height: 230px;
      overflow: hidden;
      transition: all .3s ease;
      box-shadow: 0px 0px 30px 15px $gray_second;
      cursor: pointer;


      &:hover {
        box-shadow: 0px 0px 20px #ccc;
      }
      &:hover .listnotes__note--close,
      &:hover .listnotes__note--edit {
        opacity: 0.8;
      }


      > .listnotes__note--edit {
        @extend icons;
        top: 24%;
        right: 5%;

        &:hover {
          animation: write .2s ease;
        }
      }

      > .listnotes__note--close {
        @extend icons;
        top: 5%;
        right: 5%;

        &:hover {
          transform: rotate(90deg);
        }
      }
    }
  }
</style>
