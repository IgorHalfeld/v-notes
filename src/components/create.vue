<template>
  <section class="createnote">
    <div class="createnote__field">
      {{getNote($route.params.noteId)}}
      <input class="createnote__field--title" type="text" placeholder="Title note" v-model="note.title" @keyup="$dispatch('NewNote', note)">
      <textarea class="createnote__field--text" placeholder="This is my note written in Markdown" v-model="note.text" @keyup="$dispatch('NewNote', note)"></textarea>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      note: {
        title: '',
        text: ''
      }
    }
  },
  methods: {
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
