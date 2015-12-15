import React from 'react';
import ModelsStore from '../stores/models_store';
import ModelsAction from '../actions/models_action';
import Stats from './stats.react';
import Scene3D from './three/scene.react';

/* main react component, the only component with state */

class App extends React.Component{

  static displayName = 'App';

  constructor(props){
    super(props);
    this.state = ModelsStore.getSettings();
    this.onChangeListener = this.onChange.bind(this);
  }

  _onResize(){
    ModelsAction.resize();
  }

  componentDidMount() {
    ModelsStore.addChangeListener(this.onChangeListener);
    window.addEventListener('resize', this._onResize);
    //ModelsAction.loadModel();
  }

  componentWillUnmount() {
    ModelsStore.removeChangeListener(this.onChangeListener);
    window.removeEventListener('resize', this._onResize);
  }

  onChange(){
    let state = ModelsStore.getSettings();
    this.setState(state);
  }

  render(){
    return(
      <div>
        <Scene3D
          width={this.state.width}
          height={this.state.height}
          model={this.state.model}
        />
        <Stats />
      </div>
    );
  }
}

App.propTypes = {};


export default App;
