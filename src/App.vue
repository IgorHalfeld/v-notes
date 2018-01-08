<template>
  <div class="container">

    <!-- navbar -->
    <header-main></header-main>

    <!-- main -->
    <router-view transition="left"></router-view>
  </div>
</template>

<script>
 import HeaderMain from './components/header.vue';

 export default {
   data () {
     return {

     }
   },

   components: {
     HeaderMain
   },

   // Call method to start a structure on localStorage
   // ================================================
   attached () {
     const notes = localStorage.getItem('vNotes');
     if(notes == null || !Object.keys(notes) > 0) {
       this.start();
     }
   },

   methods: {
     start () {
       localStorage.setItem('vNotes', JSON.stringify({
         version: '0.1.0',
         notes: []
       }));
     }
   }
 }
</script>

<style>
   @import "styles/_normalize.scss";

   body {
     color: #444;
     font-family: 'Lora';
   }

   .container {
     display: flex;
     flex-direction: column;
   }

  .left-transition {
    transition: all .2s ease-in-out;
  }

  .left-enter, .left-leave {
    margin-right: -2000px;
    opacity: 0.0;
  }


 /** {
   background-color: rgba(0, 0, 0, 0.2);
 }*/
</style>
