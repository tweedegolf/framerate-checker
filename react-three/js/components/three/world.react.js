import React from 'react';
//import ReactTHREE from 'react-three';
import ReactTHREE from '../../../lib/react-three-commonjs';
import THREE from 'three';
import Model from './model.react';
import Globals from '../../globals';
import ParsedModel from '../../util/parsed_model';


let Object3D = ReactTHREE.Object3D;
let Mesh = ReactTHREE.Mesh;

class World extends React.Component{

  static displayName = 'World';

  constructor(props){
    super(props);
    this.geometry = new THREE.PlaneBufferGeometry(300, 300, 10, 10);
    this.material = new THREE.MeshBasicMaterial({opacity: 0.5, color: 0x333000, side: THREE.DoubleSide});
    this.worldRotation = Globals.WORLD_ROTATION;
  }

  render() {

    let w = (
      <Object3D quaternion={this.worldRotation}>
        <Mesh
          geometry={this.geometry}
          material={this.material}
          position={this.props.position}
          visible={this.props.visible}
        />
        <Model
          key={THREE.Math.generateUUID()}
          model={this.props.model}
          position={new THREE.Vector3()}
        />
      </Object3D>
    );
    //console.log(w);
    return w;
  }
}

World.propTypes = {
  model: React.PropTypes.instanceOf(ParsedModel),
  position: React.PropTypes.instanceOf(THREE.Vector3),
  quaternion: React.PropTypes.instanceOf(THREE.Quaternion),
  scale: React.PropTypes.number,
  visible: React.PropTypes.bool
};

export default World;
