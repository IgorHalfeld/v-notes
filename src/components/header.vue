<template>
    <header class="header">
      <div class="header__searchbox">
        <input :disabled="$route.path == '/create/'" class="header__searchbox--input" type="text" placeholder="search your notes" v-model="quest" @keyup="$dispatch('QuestEngine', quest)">
      </div>
      <div class="header__btngroup">
        <button v-link="'/create/'" class="header__btngroup--new" type="button">New</button>
        <button v-if="($route.path == '/create/') || ($route.name == 'edit')" v-link="'/'" class="header__btngroup--save" type="button" @click="addNote(note, $route.params.noteId)">Save</button>
      </div>
    </header>
</template>

<script>
  export default {
    props: {
      note: Object
    },
    data () {
      return {
        quest: ''
      }
    },
    methods: {
      addNote (newNote, noteId) {
        let note = JSON.parse(localStorage.getItem('vNotes'));
        note.notes.filter(n => {
          if(noteId == n.date) note.notes.splice(n, 1);
        });
        note.notes.unshift({
          title: newNote.title,
          text: newNote.text,
          date: newNote.date
        });
        localStorage.setItem('vNotes', JSON.stringify(note));
      }
    }
  }
</script>

<style>
  $gray_first: #f2f2f2;
  $gray_second: #e6e6e6;
  $main_color: #ff9999;

  @define-extend btn {
    border: none;
    border-radius: 4px;
    background-color: white;
  }

  .header {
    display: flex;
    width: 100%;
    height: 100px;
    background-image: linear-gradient(to right, $gray_first 70%, $gray_second, $gray_first 70%);

    /*Search Box*/
    > .header__searchbox {
      width: auto;
      max-width: 300px;
      margin: 26px auto;
      flex-basis: 300px;


      > .header__searchbox--input {
        border: none;
        border-radius: 4px;
        padding: 5px;
        width: 100%;
        height: 30px;

        &:disabled {
          cursor: not-allowed;
        }
      }
    }

    /*Buttons group*/
    > .header__btngroup {
      margin: 26px auto;
      flex-basis: 300px;

      > .header__btngroup--new,
      > .header__btngroup--save {
        @extend btn;
        padding: 15px;
        transition: all .3s ease;
        color: #aaa;

        &:hover {
          color: white;
          background-color: $main_color;
        }
      }

    }
  }
</style>
