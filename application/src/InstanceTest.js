//https://codesandbox.io/s/instanced-vertex-colors-8fo01?from-embed=&file=/src/App.js:839-979




import { Object3D, MeshBasicMaterial } from "three/src/Three";
import React, { useRef, useMemo, useCallback, Component } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";

const list = [
  { name: "example1", id: "1", color: "red" },
  { name: "example2", id: "2" }
];

function Box() {
  const mesh = useRef();
  const devices = useMemo(() => new Object3D(), []);

  useFrame(() => {
    list.map((item, index) => {
      
      devices.position.set(index * 5, 0, 0);
      devices.updateMatrix();
      mesh.current.instanceId = index;
  
      mesh.current.setMatrixAt(index, devices.matrix);
    });

  });
  const onClick = (e) => {
    console.log(mesh.current.isObject3D);
    mesh.current.isObject3D = false
    console.log(mesh.current.isObject3D)
    mesh.current.instanceMatrix.needsUpdate = true;
  };

  return (
    <instancedMesh
      ref={mesh}
      args={[null, null, list.length]}
      onClick={(e) => onClick(e)}
    >
      <boxGeometry attach="geometry" args={[2, 2, 2]} />

      <meshBasicMaterial attach="material" color={0xff0000} />
    </instancedMesh>
  );
}



export class InstanceTest extends Component {
    constructor(props) {
      super(props);
      this.state = { color: ""};
  
    }




    render() {

    


        return(
            <div  style={{ width: "100%", height: "100vh"}}>
            <Canvas shadows>
   <Box/>
<OrbitControls/>

      </Canvas>
      </div>
        )

    }

}