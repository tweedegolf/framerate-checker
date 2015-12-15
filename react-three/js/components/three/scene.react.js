import React from 'react';
//import ReactTHREE from 'react-three';
import ReactTHREE from '../../../lib/react-three-commonjs';
import THREE from 'three';
import World from './world.react';
import ParsedModel from '../../util/parsed_model';


let Scene = ReactTHREE.Scene;
let Camera = ReactTHREE.PerspectiveCamera;
let AmbientLight = ReactTHREE.AmbientLight;
let DirectionalLight = ReactTHREE.DirectionalLight;

/* scene graph */

class SceneComponent extends React.Component {

  static displayName = 'Scene3D';

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState){
    return !nextProps.sliderBusy;
  }

  componentWillReceiveProps(){
    //nextProps.sceneRotation =
  }


  render() {
    //console.log('Threejs render scene');

    let scene = (

      <Scene
        ref="scene"
        width={this.props.width}
        height={this.props.height}
        camera={'camera'}
        antialias={true}
        autoClear={true}
        transparent={true}
        shadowMapEnabled={true}
        shadowMapSoft={true}
        enableRapidRender={false}
        orbitControls={THREE.OrbitControls}
        background={0xffffff}
      >
        <Camera
          aspect={this.props.width / this.props.height}
          far={1000}
          fov={50}
          lookat={new THREE.Vector3(0, 0, 0)}
          name={'camera'}
          near={1}
          position={new THREE.Vector3(0, 300, 500)}
        />
        <AmbientLight
          color={new THREE.Color(0x333333)}
          intensity={0.5}
          target={new THREE.Vector3(0, 0, 0)}
        />
        <DirectionalLight
          color={new THREE.Color(0xFFFFFF)}
          intensity={1.5}
          position={new THREE.Vector3(0, 0, 60)}
        />
        <World
          model={this.props.model}
          position={new THREE.Vector3(0, 0, 0)}
          scale={this.props.scale}
          visible={true}
        />
      </Scene>
    );
    //console.log(this.refs.scene);
    return scene;
  }
}

SceneComponent.propTypes = {
  model: React.PropTypes.instanceOf(ParsedModel),
  width: React.PropTypes.number,
  height: React.PropTypes.number
};

export default SceneComponent;
