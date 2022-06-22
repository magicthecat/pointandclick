import { Component, useRef, useEffect, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Sky, Html, PointerLockControls, MapControls, Edges, OrbitControls, TrackballControls, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";
import { Physics, useSphere, usePlane, useBox } from "@react-three/cannon";
import * as THREE from "three"
 


  export const Ground = (props) => {
    const [ref] = useBox(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))

 
    return (
      <mesh ref={ref} receiveShadow>
       <boxGeometry args={props.args} position={props.position} />
        <meshStandardMaterial  color={props.color} />

      </mesh>
    )
  }




  function LineBlock(props) {
    const copyArray = new Array(props.squareroot).fill()
    let x = props.x
    return(
      <>
      {copyArray.map((j, i) => {
      x = i
      const y = props.y
      const z = props.z
      return <Ground key={i} position={[x, y, z]} color={props.color}  />
    })}
      </>)}

export function SquareBlock(props) {
    const copyArray = new Array(props.squareroot).fill()
    let z = props.z;
    return(
      <>
      {copyArray.map((j, i) => {

      z = i
      return <LineBlock z={i} squareroot={props.squareroot} color={props.color} x={props.x} y={props.y} />
    })}
      </>)}




export class Isometric extends Component {
    constructor(props) {
      super(props);
      this.state = { color: ""};
  
    }


    render() {

        return(
            <div  style={{ width: "100%", height: "100vh"}}>
            <Canvas shadows gl={{ alpha: true }} orthographic   camera={{ position: [-4, 100, -5], zoom: 10, up: [0, 0, 1], far: 1000 }}>
       
            <Sky distance={4500000} sunPosition={[0, 1, 0]}  />
            <ambientLight/>
            <MapControls/>
             <Physics gravity={[0, -30, 0]}>            
         
             <SquareBlock squareroot={5} z={10} x={1} y={4.5} color="green" />
             <SquareBlock squareroot={5} z={10} x={1} y={3.5} color="brown" />
             <SquareBlock squareroot={5} z={10} x={1} y={2.5} color="yellow" />
            <SquareBlock squareroot={5} z={10} x={1} y={1.5} color="grey" />
            <SquareBlock squareroot={5} z={10} x={1} y={0.5} color="black" />
    
            </Physics>
      </Canvas>
      </div>
        )

    }

}