
//react-three
import ReactTHREE from '../../../lib/react-three-commonjs';

let Scene = ReactTHREE.Scene;
let Camera = ReactTHREE.PerspectiveCamera;
let AmbientLight = ReactTHREE.AmbientLight;
let Mesh = ReactTHREE.Mesh;

<Scene>
  <Camera/>
  <AmbientLight/>
  <Mesh/>
</Scene>







//react-three-renderer
import React3 from 'react-three-renderer';

<React3>
  <scene>
    <perspectiveCamera/>
    <ambientLight/>
    <mesh>
      <boxGeometry/>
      <meshBasicMaterial/>
    </mesh>
  </scene>
</React3>


