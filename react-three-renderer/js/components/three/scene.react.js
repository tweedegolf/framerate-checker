import React from 'react';
import React3 from 'react-three-renderer';
import THREE from 'three';
import World from './world.react';
import ParsedModel from '../../util/parsed_model';

/* scene graph */

class SceneComponent extends React.Component {

  static displayName = 'Scene3D';

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(){
  }


  render() {
    //console.log('Threejs render scene');

    let scene = (
      <React3
        mainCamera="camera"
        width={this.props.width}
        height={this.props.height}
        clearColor={0xffffff}
      >
        <scene>
          <perspectiveCamera
            name="camera"
            fov={50}
            aspect={this.props.width / this.props.height}
            near={1}
            far={1000}
            position={new THREE.Vector3(0, 300, 500)}
            lookAt={new THREE.Vector3(0, 0, 0)}
          />
          <ambientLight
            color={0x333333}
          />
          <directionalLight
            color={0xffffff}
            intensity={1.5}
          />
          <World
            model={this.props.model}
            position={new THREE.Vector3(0, 0, 0)}
            scale={this.props.scale}
            visible={true}
          />
        </scene>
      </React3>
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
