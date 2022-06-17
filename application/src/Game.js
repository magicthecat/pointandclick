import * as THREE from 'three'
import {React, Component, useState, useMemo, useRef, Suspense } from "react";
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { Reflector, MapControls, CameraShake, OrbitControls, useTexture, FirstPersonControls, FlyControls } from '@react-three/drei'
import { PointerLockControls, Stars } from '@react-three/drei';
import { KernelSize } from 'postprocessing'
import { EffectComposer, Bloom } from '@react-three/postprocessing'


function Triangle({ color, ...props }) {

    return (
      <group>
        <mesh>
        <boxGeometry />
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
      </group>
    )
  }

  export function Ground(props) {
    const [floor, normal] = useTexture(['/SurfaceImperfections003_1K_var1.jpg', '/SurfaceImperfections003_1K_Normal.jpg'])
    return (
      <Reflector resolution={1024} args={[8, 8]} {...props}>
        {(Material, props) => <Material color="#f0f0f0" metalness={0} roughnessMap={floor} normalMap={normal} normalScale={[2, 2]} {...props} />}
      </Reflector>
    )
  }

function Rig({ children }) {
    const ref = useRef()
    const vec = new THREE.Vector3()
    const { camera, mouse } = useThree()
    useFrame(() => {
      camera.position.lerp(vec.set(mouse.x * 2, 0, 3.5), 0.05)
      ref.current.position.lerp(vec.set(mouse.x * 1, mouse.y * 0.1, 0), 0.1)
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, (-mouse.x * Math.PI) / 20, 0.1)
    })
    return <group ref={ref}>{children}</group>
  }
  
export class Game extends Component {
    constructor(props) {
      super(props);
      this.state = { color: ""};
  
    }


    render() {

        return(

            <div  style={{ width: "80vw", height: "60vh", margin: "5vmin"}}>
            <Canvas shadows dpr={[5, 2]} gl={{ alpha: true }} camera={{ position: [-4, 3, -5], fov: 40 }}>
<color attach="background" args={['hotpink']} />


<FirstPersonControls  />
<FlyControls/>
<OrbitControls enableZoom={true} enableRotate={true} />
    <ambientLight />
    <Suspense fallback={null}>
<spotLight/>
<Triangle color="cyan" scale={0.009} position={[0, 0, 0]}  />
<Ground mirror={1} blur={[500, 100]} mixBlur={12} mixStrength={1.5} rotation={[-Math.PI / 2, 0, Math.PI / 2]} position-y={-0.51} />

<EffectComposer multisampling={8}>
          <Bloom kernelSize={3} luminanceThreshold={0} luminanceSmoothing={0.4} intensity={0.6} />
          <Bloom kernelSize={KernelSize.HUGE} luminanceThreshold={0} luminanceSmoothing={0} intensity={0.5} />
        </EffectComposer>
        </Suspense>
        <CameraShake yawFrequency={0.001} pitchFrequency={0.001} rollFrequency={0.001} />

      </Canvas>
      </div>
        
        
        )
    }


}

