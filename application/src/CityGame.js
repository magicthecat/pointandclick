import React from "react";
import { Canvas, useThree, useFrame  } from "@react-three/fiber";
import { Component } from "react";
import { Sky, Stars } from "@react-three/drei";
import { Material } from "three";
import * as THREE from "three"
import { useTexture, PointerLockControls, Billboard, Text } from "@react-three/drei"
import { Physics, usePlane,useSphere } from "@react-three/cannon"
import grass from "./assets/grass.jpg"
import GrassTexture from "./assets/GrassTexture.png"
import { Reflector } from "@react-three/drei";
import { SquareBlock } from "./Isometric";
import { useGLTF } from "@react-three/drei"
import axeUrl from "./assets/axe.glb"
import { Cube, Cubes } from "./shapes/cube";
import dirt from "./assets/dirt.jpg"

import { useEffect, useRef, useState } from "react"
import { Boxes, Boxes2 } from "./Terrain";
const SPEED = 5
const keys = { KeyW: "forward", KeyS: "backward", KeyA: "left", KeyD: "right", Space: "jump" }
const moveFieldByKey = (key) => keys[key]
const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()
const rotation = new THREE.Vector3()
const speed = new THREE.Vector3()

const usePlayerControls = () => {
  const [movement, setMovement] = useState({ forward: false, backward: false, left: false, right: false, jump: false })
  useEffect(() => {
    const handleKeyDown = (e) => setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: true }))
    const handleKeyUp = (e) => setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: false }))
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
    }
  }, [])
  return movement
}

export const Player = (props) => {
  const axe = useRef()
  const [ref, api] = useSphere(() => ({ mass: 1, type: "Dynamic", position: [0, 10, 0], ...props }))
  const { forward, backward, left, right, jump } = usePlayerControls()
  const { camera } = useThree()
  const velocity = useRef([0, 0, 0])
  useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), [])
  useFrame((state) => {
    ref.current.getWorldPosition(camera.position)
    frontVector.set(0, 0, Number(backward) - Number(forward))
    sideVector.set(Number(left) - Number(right), 0, 0)
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(camera.rotation)
    speed.fromArray(velocity.current)
    axe.current.children[0].rotation.x = THREE.MathUtils.lerp(
      axe.current.children[0].rotation.x,
      Math.sin((speed.length() > 1) * state.clock.elapsedTime * 10) / 6,
      0.1,
    )
    axe.current.rotation.copy(camera.rotation)
    axe.current.position.copy(camera.position).add(camera.getWorldDirection(rotation).multiplyScalar(1))
    api.velocity.set(direction.x, velocity.current[1], direction.z)
    if (jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05) api.velocity.set(velocity.current[0], 10, velocity.current[2])
  })
  return (
    <>
      <mesh ref={ref} />
      <group ref={axe} onPointerMissed={(e) => (axe.current.children[0].rotation.x = -0.5)}>
        <Axe position={[0.3, -0.35, 0.5]} />
      </group>
    </>
  )
}


export default function Axe(props) {
    const group = useRef()
    const { nodes, materials } = useGLTF(axeUrl)
    return (
      <group ref={group} dispose={null} {...props}>
        <group rotation={[0, Math.PI / 1.8, -0.3]} scale={0.5}>
          <mesh geometry={nodes.Mesh_1001_1.geometry} material={materials.material_2} />
          <mesh geometry={nodes.Mesh_1001_2.geometry} material={materials.material_3} />
        </group>
      </group>
    )
  }
  
  useGLTF.preload("/axe.glb")


  export const Ground = (props) => {
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
    const texture = useTexture(grass)
    const roughness = useTexture(GrassTexture)
  
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    return (
      <mesh ref={ref} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial  normalMap={roughness} map={texture} map-repeat={[24, 24]}  />
      </mesh>
    )
  }
  



export class CityGame extends Component {
    constructor(props) {
      super(props);
      this.state = { color: ""};
  
    }


    render() {

        return(

            <div  style={{ width: "100%", height: "100vh"}}>
            <Canvas shadows dpr={[5, 2]} gl={{ alpha: true }} camera={{ position: [-4, 3, -5], fov: 40 }}>
            <Sky sunPosition={[100, 20, 100]} />
            <ambientLight intensity={0.3} />
      <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
      <Physics gravity={[0, -30, 0]}>



        <Player/>
        <Ground />
        <Cube texture={dirt} position={[0, 0.5, -10]} />

            <Cubes/>
      </Physics>
      <PointerLockControls />

 
      </Canvas>
      </div>
        
        
        )
    }


}
