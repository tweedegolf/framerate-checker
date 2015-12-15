import AppDispatcher from '../app_dispatcher';
import ActionTypes from '../constants';

export default {

  loadModel(){
    console.log('loadModel');
    AppDispatcher.dispatch({
      type: ActionTypes.LOAD_MODEL
    });
  },

  resize(){
    //console.log('resize', e);
    AppDispatcher.dispatch({
      type: ActionTypes.RESIZE
    });
  }
};
