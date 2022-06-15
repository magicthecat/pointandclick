import { Canvas } from '@react-three/fiber'
import { Physics, usePlane, useBox } from '@react-three/cannon'
import React from 'react'
import { Ball } from './movingbox'
import { useState, setState, useContext } from 'react'
import { globalStateContext } from '../App'
import { authContext } from '../App'

function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[1000, 1000]} />
      <shadowMaterial color="#171717" transparent opacity={0.4} />
    </mesh>
  )
}


function Cube(props) {
    const {Color, authenticated, primaryColor, clickColor, hoverColor } = React.useContext(authContext);
    const { setAuthenticated } = useContext(authContext);

  
  const [ref] = useBox(() => ({ mass: 1, position: [0, 5, 0], rotation: [0.4, 0.2, 0.5], ...props }))
  const [color, setColor] = useState(primaryColor);

 
  

  return (
    <>

    <mesh 
    onPointerOver={(e) => setColor(hoverColor)}
    onPointerOut={(e) => setColor(primaryColor)}
    onClick={(e) => setColor(clickColor)} receiveShadow castShadow ref={ref} >
      <boxGeometry />
      <meshLambertMaterial color={Color} />
    </mesh>
    </>
  )
}






export class FallingBox extends React.Component {
  static contextType = authContext;
  constructor(props) {
    super(props);


  }

  componentDidMount() {
    const context = this.contextType
  
    console.log(context) // { name: 'Tania', loggedIn: true }
  }
  


    render() {
  
  
      return (

        <div id="canvas-container">
      <p>{this.props.status}</p>
  <Canvas shadows dpr={[1, 2]} gl={{ alpha: false }} camera={{ position: [-1, 5, -1], fov: 45 }}>
    <color attach="background" args={['white']} />
    <ambientLight />
    <directionalLight position={[10, 10, 10]} castShadow shadow-mapSize={[2048, 2048]} />
    <Physics>
      <Plane position={[0, -5.5, 0]} />
      <Cube  id="menu1" position={[0.1, 5, 0]} />
      <Cube id="menu2" position={[0, 10, -1]} />
      <Cube id="menu3"  position={[0, 20, -2]} />
      <Cube id="menu4"  position={[0, 60, -2]} />
    </Physics>
  </Canvas>
  </div>
)

      }
      }