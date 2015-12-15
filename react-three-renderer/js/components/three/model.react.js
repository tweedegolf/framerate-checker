import React from 'react';
import React3 from 'react-three-renderer';
import THREE from 'three';


class Model3D extends React.Component {

  static displayName = 'Model3D';

  constructor(props) {
    super(props);
  }


  render() {

    if(typeof this.props.model === 'undefined'){
      let size = 500;
      this.props.position.z = (size / 2) * this.props.scale;
      return (
        <mesh
          key={THREE.Math.generateUUID()}
          position={this.props.position}
          scale={this.props.scale}
        >
          <boxGeometry
            width={size}
            height={size}
            depth={size}
          />
          <meshBasicMaterial
            color={0xffffff}
          />
        </mesh>
      );
    }

/*
    // render model with merged geometries
    if(this.props.model.merge){
      let geometry = this.props.model.mergedGeometry;
      let material = this.props.model.material;
      return(
        <mesh
          position={this.props.position}
        >
          <geometry
            vertices={geometry}
            faces={geometry}
          />
          <material
            vertices={geometry}
            faces={geometry}
          />

        </mesh>
      );
    }
*/


    // render model with separate geometries
    let children = [];
    let geometries = this.props.model.geometries;
    let materialsArray = this.props.model.materialsArray;
    let materialIndices = this.props.model.materialIndices;

    geometries.forEach((geometry, uuid) => {
      let material = materialsArray[materialIndices.get(uuid)];
      //console.log(materialIndices.get(uuid), material);
      console.log(geometry);
      console.log(material);
      children.push(
        <mesh
          key={uuid}
        >
          <geometry
            vertices={geometry.vertices}
            faces={geometry.faces}
          />
          <meshBasicMaterial
            color={0xff0000}
          />
        />
        </mesh>
      );
    });

    return (
      <object3D
        key={THREE.Math.generateUUID()}
        quaternion={this.props.model.quaternion}
        position={this.props.position}
        scale={this.props.scale}
      >
        {children}
      </object3D>
    );
  }
}


Model3D.propTypes = {
  model: React.PropTypes.object,
  position: React.PropTypes.instanceOf(THREE.Vector3),
  quaternion: React.PropTypes.instanceOf(THREE.Quaternion),
  scale: React.PropTypes.number
};

export default Model3D;
