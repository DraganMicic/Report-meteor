import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    meteors: []
  },
  mutations: {
    set_meteors: function (state,meteors){
      state.meteors = meteors;
    },
    add_meteor: function (state,meteor){
      state.meteors.push(meteor);
    },
    remove_meteor: function (state,id){
      for(let m = 0; m < state.meteors.length; m++){
        if(state.meteors[m].id === id){
          state.meteors.splice(m,1);
          break;
        }
      }
    },
    update_meteor: function (state,payload){
      for(let m = 0; m < state.meteors.length; m++){
        if(state.meteors[m].id === parseInt(payload.id)){
          state.meteors[m].datum = payload.meteor.datum;
          state.meteors[m].vreme = payload.meteor.vreme;
          state.meteors[m].mesto = payload.meteor.mesto;
          state.meteors[m].magnituda = payload.meteor.magnituda;
          break;
        }
      }
    }

  },
  actions: {
    load_meteors: function ({commit}){
      fetch('http://localhost/api/meteori',{method: "get"}).then((resp)=>{
        if(!resp.ok)
          throw resp;
        return resp.json();
      }).then((jsonData) =>{
        commit('set_meteors',jsonData);
      }).catch((err)=>{
        if (typeof err.text === 'function')
          err.text().then((errorMessage) =>{
            alert(errorMessage);
          })
        else
          alert(err);
      });
    },
    delete_meteor: function({commit},id){
      fetch(`http://localhost/api/meteor/${id}`, { method: 'delete' }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json()
      }).then((jsonData) => {
        commit('remove_meteor', jsonData.id)
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    new_meteor: function ({commit},meteor){

      fetch('http://localhost/api/meteori', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: meteor
      }).then((response) => {
        if (!response.ok)
          throw response;
        return response.json();
      }).then((jsonData) => {
        commit('add_meteor', jsonData);
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });


    },
    change_meteor: function ({commit}, payload) {
      fetch(`http://localhost/api/meteor/${payload.id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: payload.meteor
      }).then((response) => {
        if (!response.ok)
          throw response;
        return response.json();
      }).then((jsonData) => {
        commit('update_meteor', {id: payload.id, meteor:jsonData});
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    }


  },


})
