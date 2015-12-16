import React from 'react';
import React3 from 'react-three-renderer';
import THREE from 'three.js';


class Model3D extends React.Component {

  static displayName = 'Model3D';

  constructor(props) {
    super(props);
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
      default:
        m = (
          <meshBasicMaterial
            color={0xff0000}
          />
        );
    }
    return m;
  }

  render() {
    const model = this.props.model;

    if(typeof model === 'undefined'){
      return(
        <mesh>
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

    let geometries = model.geometries;
    let materialArray = model.materialsArray;
    let materialIndices = model.materialIndices;
    let meshes = [];

    geometries.forEach((geometry, uuid) => {
      let material = materialArray[materialIndices.get(uuid)];

      meshes.push(
        <mesh
          key={uuid}
          scale={new THREE.Vector3(this.props.scale, this.props.scale, this.props.scale)}
        >
          <geometry
            vertices={geometry.vertices}
            faces={geometry.faces}
          />
          {this.getMaterial(material)}
        </mesh>
      );
    });

    return (
      <group>
        {meshes}
      </group>
    );
  }
}

export default Model3D;
