<template>
  <section class="viewnote">
    <div class="viewnote__body">
      {{getNote($route.params.noteId)}}
      <h1 class="viewnote__body--title">{{{title}}}</h1>
      {{{text}}}
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
  data () {
    return {
      title: '',
      text: ''
    }
  },
  methods: {
    // Get note on localStorage
    getNote (id) {
      const note = JSON.parse(localStorage.getItem('vNotes'));
      note.notes.filter(n => {
        if(n.date == id) {
          this.title = n.title;
          this.text = marked(n.text);
        }
      });
    }
  }
}
</script>

<style>

  $gray_first: #f2f2f2;
  $gray_second: #e6e6e6;
  $main_color: #ff9999;
  $main_second_color: #ff6666;


  .viewnote {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 1000px;
    max-width: 1000px;
    margin: 26px auto;

    > .viewnote__body {
      flex-basis: 800px;
      color: #999;

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        color: $main_color;
      }

      p {
        line-height: 160%;
      }

      table {
        margin: 50px auto;

        th,
        td {
          border: 2px solid $gray_first;
          padding: 10px;
        }

      }

      > img,
      > p > img {
        width: 100%;
      }

      > iframe {
        width: 100%;
        box-shadow: 0px 10px 30px 2px #aaa;

      }

      code {
        background-color: $gray_first;
        color: #444;
        border-radius: 4px;
        padding: 3px;
        font-size: 15px;
      }

      pre {
        padding: 15px;
        background-color: #f4f4f4;

        code[class="lang-javascript"] {
          background-color: transparent;
        }
      }

      > blockquote {
        padding: 10px;
        background-image: linear-gradient(45deg, $gray_first, $gray_second, $gray_first);
        color: #444;
      }

      a {
        padding: 3px;
        color: $main_color;
        text-decoration: none;
        transition: .2s linear all;

        &:hover {
          color: $gray_first;
          background-color: $main_color;
          border-radius: 4px;
        }
      }


      > .viewnote__body--title {
        color: $main_second_color;
        border-bottom: 1px solid $gray_first;
        /*color: $main_color;*/
      }
    }
  }
</style>
