import React from 'react';
import React3 from 'react-three-renderer';
import THREE from 'three';
import Model from './model.react';
import Globals from '../../globals';
import ParsedModel from '../../util/parsed_model';


class World extends React.Component{

  static displayName = 'World';

  constructor(props){
    super(props);
    this.worldRotation = Globals.WORLD_ROTATION;
  }

  render() {

    let w = (
      <object3D quaternion={this.worldRotation}>
        <mesh
          position={this.props.position}
        >
          <planeBufferGeometry
            widthSegments={10}
            heightSegments={10}
            width={300}
            height={300}
          />
          <meshBasicMaterial
            color={0x333000}
            opacity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      </object3D>
    );
    //console.log(w);
    return w;
  }
        // <Model
        //   model={this.props.model}
        // />
}

World.propTypes = {
  model: React.PropTypes.instanceOf(ParsedModel),
  position: React.PropTypes.instanceOf(THREE.Vector3),
  quaternion: React.PropTypes.instanceOf(THREE.Quaternion),
  scale: React.PropTypes.number,
  visible: React.PropTypes.bool
};

export default World;
