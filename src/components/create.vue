<template>
  <section class="createnote">
    <div class="createnote__field">
      <!-- Load Fied -->
      {{getNote($route.params.noteId)}}
      <input class="createnote__field--title" type="text" placeholder="Title note" v-model="note.title" @keyup="setNote() | debounce 500">
      <textarea class="createnote__field--text" placeholder="This is my note written in Markdown" v-model="note.text" @keyup="setNote() | debounce 500"></textarea>
    </div>
  </section>
</template>

<script>
export default {
  vuex: {
    actions: {
      // Set current note state
      // =====================
      setNote ({ dispatch }) {
        this.note.date = new Date().getTime();
        dispatch('SET_NOTE', this.note);
      }
    }
  },

  data () {
    return {
      note: {
        title: '',
        text: ''
      }
    }
  },

  methods: {
    // Populate fields on route edit
    // =============================
    getNote (id) {
      const note = JSON.parse(localStorage.getItem('vNotes'));
      note.notes.filter(n => {
        if(n.date == id) {
          this.note.title = n.title;
          this.note.text = n.text;
        }
      });
    }
  }

}
</script>

<style>

  @define-extend inputs {
    border: none;
    border-radius: 4px;
    padding: 10px;
    width: 100%;
    margin-bottom: 10px;
    background-color: #fafafa;
  }

  .createnote {
    display: flex;
    flex-wrap: wrap;
    width: 1000px;
    max-width: 1000px;
    margin: 26px auto;

    > .createnote__field {
      flex-basis: 1000px;

      > .createnote__field--title {
        @extend inputs;
        height: 50px;
        font-size: 25px;
        font-weight: bold;
        /*color: #ff9999;*/
      }

      > .createnote__field--text {
        @extend inputs;
        height: 500px;
        font-size: 20px;
      }

    }
  }

</style>
