export default {
  // Add note to localStorage
  // ========================
  ADD_NOTE (store, noteId) {
    let note = JSON.parse(localStorage.getItem('vNotes'));
    note.notes.forEach((n, index) => {
      if(noteId == n.date) note.notes.splice(index, 1);
    });
    note.notes.unshift(store.note);
    localStorage.setItem('vNotes', JSON.stringify(note));
  },

  // Set search engine
  // =================
  SET_ENGINE_SEARCH (store, engine) {
    store.search = engine;
  },

  // Set note state
  // ==============
  SET_NOTE (store, note) {
    store.note = note;
  }
}
