
var Mutations = require('./../src/vuex/mutations').default;

describe('Local Storage', function () {

  beforeAll(function() {
    localStorage.setItem('vNotes', JSON.stringify({
      version: '0.1.0',
      notes: []
    }));
  });

  afterAll(function() {
    localStorage.clean();
  });

  it('Should create object base on localStorage', function() {
    expect(localStorage.getItem('vNotes')).toBeDefined();
  });

  it('Should set note on store', function() {
    var store = {
      note: ''
    };
    Mutations.SET_NOTE(store, 'testing');
    expect(store.note).toEqual('testing');
  });

  it('Should set search engine on store', function() {
    var store = {
      search: ''
    };
    Mutations.SET_ENGINE_SEARCH(store, 'testing');
    expect(store.search).toEqual('testing');
  });

  it('Should add note on localStorage', function() {
    var store = {
      note: {
        name: 'hello',
        text: 'world',
        date: ''
      }
    };
    Mutations.ADD_NOTE(store, '123123');
    expect(JSON.parse(localStorage.getItem('vNotes')).notes[0]).toBeDefined();
  });

  it('Should not add note on localStorage if already exists', function() {
    var store = {
      note: {
        name: 'hello',
        text: 'world',
        date: '123123'
      }
    };
    Mutations.ADD_NOTE(store, '123123');
    expect(JSON.parse(localStorage.getItem('vNotes')).notes[0]).toBeDefined();
  });
});
