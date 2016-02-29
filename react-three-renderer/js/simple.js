import React from 'react';
import React3 from 'react-three-renderer';
import THREE from 'three.js';
import Model from './components/three/model.react';
import ParsedModel from './util/parsed_model';
import Globals from './globals';

let quaternion = Globals.WORLD_ROTATION;

class Simple extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.cameraPosition = new THREE.Vector3(0, 0, 5);

    this.state = {
      cubeRotation: new THREE.Euler(),
      color: 0x00ff00
    };

    this._onAnimate = () => {
      this.setState({
        cubeRotation: new THREE.Euler(
          this.state.cubeRotation.x + 0.1,
          this.state.cubeRotation.y + 0.1,
          0
        ),
      });
    };
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.state.color = 0xff000f;
    //   this.setState(this.state);
    // }, 1000);
    let loader = new THREE.ObjectLoader();
    loader.load('../models/zitbank.json', (model) => {
      //model.scale.set(1, 1, 1);
      this.state.model = new ParsedModel(model, quaternion);
      this.setState(this.state);
      //this.emitChange();
    });
  }


  getMaterial(material){
    //console.log(material);
    let m;
    switch(material.type){
      case 'MeshBasicMaterial':
        m = (
          <meshBasicMaterial
            color={material.color}
          />
        );
        break;
      case 'MeshLambertMaterial':
        m = (
          <meshLambertMaterial
            transparent={material.transparent}
            alphaTest={material.alphaTest}
            side={material.side}
            opacity={material.opacity}
            visible={material.visible}
            color={material.color}
            emissive={material.emissive}
            wireframe={material.wireframe}
            wireframeLinewidth={material.wireframeLinewidth}
          />
        );
        break;
    }

    return m;
  }


  getModel(){
    if(typeof this.state.model === 'undefined'){
      return(
        <mesh
          rotation={this.state.cubeRotation}
        >
          <boxGeometry
            width={1}
            height={1}
            depth={1}
          />
          <meshBasicMaterial
            color={0x00ff00}
          />
        </mesh>
      );
    }

    let geometries = this.state.model.geometries;
    let materialArray = this.state.model.materialsArray;
    let materialIndices = this.state.model.materialIndices;
    let meshes = [];

    geometries.forEach((geometry, uuid) => {
      let material = materialArray[materialIndices.get(uuid)];

      meshes.push(
        <mesh
          key={uuid}
          scale={new THREE.Vector3(0.01, 0.01, 0.01)}
        >
          <geometry
            vertices={geometry.vertices}
            faces={geometry.faces}
          />
          {this.getMaterial(material)}
        </mesh>
      );
    })

    return (
      <group>
        {meshes}
      </group>
    );
  }


  render() {
    console.log('render', this.state);
    const width = window.innerWidth;
    const height = window.innerHeight;

    let r = (<React3
      mainCamera="camera"
      width={width}
      height={height}

      //onAnimate={this._onAnimate}
    >
      <scene>
        <perspectiveCamera
          name="camera"
          fov={75}
          aspect={width / height}
          near={0.1}
          far={1000}

          position={this.cameraPosition}
        />
        {this.getModel()}
      </scene>
    </React3>);

    console.log(r);
    return r;
  }
}
/*
        <Model
          model={this.state.model}
          scale={0.01}
          position={new THREE.Vector3()}
        />
*/
export default Simple;
