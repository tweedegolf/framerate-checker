import THREE from 'three.js';

export default class ParsedModel{

  constructor(model, quaternion = new THREE.Quaternion()){
    this.model = model;
    this.name = model.name;
    this.quaternion = quaternion;
    this.geometries = new Map();
    this.materialIndices = new Map();
    this.materialsArray = [];
    this.merge = true;

    // adjust the rotation of the model according to the rotation of the world
    this.model.quaternion.copy(this.quaternion);
    this.model.updateMatrix();

    let index = 0;
    this.model.traverse((child) => {
      if(child instanceof THREE.Mesh){
        // create an array of the use materials
        let uuid = child.material.uuid;
        this.materialIndices.set(uuid, index++);
        this.materialsArray.push(child.material);
        this.geometries.set(uuid, child.geometry);
        //console.log(child.geometry)
        //console.log(child.material)
      }
    });
    console.log('number of geometries merged', index);

    // create multimaterial
    this.material = new THREE.MeshFaceMaterial(this.materialsArray);

    let merged = new THREE.Geometry();
    // merge the geometry and apply the matrix of the new position
    this.geometries.forEach((g, uuid) => {
      merged.merge(g, this.model.matrix, this.materialIndices.get(uuid));
    });

    this.mergedGeometry = new THREE.BufferGeometry().fromGeometry(merged);
  }
}
