//https://codesandbox.io/s/instanced-vertex-colors-8fo01?from-embed=&file=/src/App.js:839-979


import * as THREE from "three";
import React, { useRef, Component, useState, useMemo, useEffect, useTransition } from "react";
import ReactDOM from "react-dom";
import { Canvas, useFrame } from "react-three-fiber";
import { OrbitControls, Stats, Edges, MapControls } from "@react-three/drei";
import { Color } from "three";
import vertexColors from "three"

function getRandomColor()

{

  return "#" + Math.floor(Math.random()*16777215).toString(16)
}

const Randomcolor = "#" + Math.floor(Math.random()*16777215).toString(16);

const tempBoxes = new THREE.Object3D();
const tempColor = new THREE.Color()
const data = Array.from({ length: 1000 }, () => ({ color: getRandomColor(), scale: 1, type:"food" }))
const tempObject = new THREE.Object3D()


export function Boxes(props) {


  const [x_value, x_length, x_space, y_value, y_length, z_value, z_length ] = [props.x_value, props.x_length, props.x_space, props.y_value, props.y_length, props.z_value, props.z_length];
  const [clicked, set] = useState()
  const colorArray = useMemo(() => Float32Array.from(new Array(1000).fill().flatMap((_, i) => tempColor.set(data[i].color).toArray())), [])
  const meshRef = useRef()
  const prevRef = useRef()
  useEffect(() => void (prevRef.current = clicked), [clicked])
  useFrame(() => {

    let i = 0
    for (let y = y_value; y < y_length; y++)
      for (let x = x_value; x < x_length; x++)
        for (let z = z_value; z < z_length; z++) {
          const id = i++
          tempObject.position.set(x, y, z)

          if (clicked !== prevRef.Current) {
            (id === clicked ? tempColor.setRGB(0, 255, 0) : tempColor.set(data[id].color)).toArray(colorArray, id * 3)
            meshRef.current.geometry.attributes.color.needsUpdate = true
           
          }
    
          tempObject.updateMatrix()
          meshRef.current.setMatrixAt(id, tempObject.matrix)
        }
    meshRef.current.instanceMatrix.needsUpdate = true
  })
  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, 1000]}
      onClick={(e) => (e.stopPropagation(), set(e.instanceId))}
      onPointerOut={(e) => set(undefined)}>
      <boxGeometry args={[1, 1, 1]}>
        <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />

      </boxGeometry>

      <meshBasicMaterial toneMapped={false} vertexColors={true} />

    </instancedMesh>
  )
}



export class Terrain extends Component {
    constructor(props) {
      super(props);
      this.state = { color: ""};
  
    }




    render() {

    


        return(
            <div  style={{ width: "100%", height: "100vh"}}>
            <Canvas shadows >
            <pointLight position={[5, 5, 5]} />
        <Boxes x_value={0} x_length={10} z_value={0} z_length={10} y_value={0} y_length={10}/>
        <Boxes x_value={20} x_length={30} z_value={0} z_length={10} y_value={0} y_length={10}/>
        <Boxes x_value={0} x_length={10} z_value={20} z_length={30} y_value={0} y_length={10}/>
        <Boxes x_value={20} x_length={30} z_value={20} z_length={30} y_value={0} y_length={10}/>

      <OrbitControls />



      </Canvas>
      </div>
        )

    }

}