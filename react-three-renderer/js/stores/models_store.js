import THREE from 'three';
import EventEmitter from 'events';
import ActionTypes from '../constants';
import AppDispatcher from '../app_dispatcher';
import createExecutor from '../util/filereader_executor';
import ParsedModel from '../util/parsed_model';
import Globals from '../globals';


let quaternion = Globals.WORLD_ROTATION.clone().inverse();
let CHANGE_EVENT = 'change';


class ModelsStore extends EventEmitter {

  constructor () {
    super();

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    //this.model = null;

    AppDispatcher.register((action) => {
      this.handle(action);
    });
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getSettings() {
    return {
      model: this.model,
      width: this.width,
      height: this.height
    };
  }

  handle(action) {
    switch(action.type) {

      case ActionTypes.LOAD_MODEL:
        setTimeout(() => {
          this.model = null;
          this.emitChange();
        }, 5000);
        // let loader = new THREE.ObjectLoader();
        // loader.load('../models/zitbank.json', (model) => {
        //   //model.scale.set(1, 1, 1);
        //   this.model = null;//new ParsedModel(model, quaternion);
        //   this.emitChange();
        // });
        break;

      case ActionTypes.RESIZE:
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.emitChange();
        break;

      default:
      // do nothing
    }
  }
}

export default new ModelsStore();
