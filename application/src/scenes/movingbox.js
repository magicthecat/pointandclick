import { Canvas } from "@react-three/fiber";
import { useSpring, animated, toggle } from "@react-spring/three";
import { door_image } from "../data/images";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import React from "react";


function updateColor()

{
    console.log("clicked")
    return "pink"
}


function Box(props) {

  const spring = useSpring({
    loop: { reverse: props.loopAnimation },
    from: { position: props.springStartPosition },
    to: { position: props.springEndPosition },
    config: { velocity: props.velocity }
  });

  let color = props.color;

  return (
    <animated.mesh   onClick={(e) => color = updateColor()}
    position={spring.position} rotation={props.rotation}>
      <boxGeometry args={props.geometry} />
      <meshStandardMaterial emissive={props.emissive} color={color} />
    </animated.mesh>
  );
}

export default function AnimatedBoxScene(props) {
  return (
      <>
    <Canvas style={{ width: "50%", height: "250px" }}  >
      <ambientLight />
      <pointLight position={[1, 10, 10]} />
      <group position={[0, 0, 0]}>
      <Box color="red" geometry={[1.2, 1.2, 1.2]} rotation={[Math.PI / 4, Math.PI / 4, 0]} loopAnimation={true} springStartPosition={[-5, 0, 0]}
        springEndPosition={[-1, 3, 0]} velocity={0.00001} />
      <Box color="blue" geometry={[1.2, 1.2, 1.2]} rotation={[Math.PI / 4, Math.PI / 4, 0]} loopAnimation={true} springStartPosition={[-1, 0, 0]}
        springEndPosition={[1, 0, 0]} velocity={0.00001} />
             <Box color="pink" geometry={[1.2, 1.2, 1.2]} rotation={[Math.PI / 4, Math.PI / 4, 0]} loopAnimation={true} springStartPosition={[3, 0, 0]}
        springEndPosition={[5, -3, 0]} velocity={0.00001} />
    </group>
    </Canvas>

    </>
  );
}

export class Ball extends React.Component {
    constructor(props) {
        super(props);
        this.state = {id: props.id, color: "#ebc334", position: props.position };

      }

      changeColor()
      {
          let color = null;
  
          if (this.state.color === "#ebc334")
  
          {
              color = "#a4e391";
          }
  
          else color = "#ebc334"
  
          this.setState({ color: color})
  
      }

      displayText()

      {
          if (this.state.color === "#a4e391")
          { console.log(this.state.id + " active") }
          else  { console.log(this.state.id + " inactive") }
      }

render()
{
    return(
        <>
        <mesh position={this.state.position}  onClick={(e) => this.changeColor()}>
        <sphereBufferGeometry />
        <meshStandardMaterial color={this.state.color} />
      </mesh>
      {this.displayText()}
      </>
    )
}

    }

export class AnimatedBall extends React.Component {
    constructor(props) {
        super(props);

      }



    render()

    {
        

        return (
            <>
            <Canvas>
            <pointLight position={[10, 10, 10]} />
            <group position={[0, 0, 0]}>
            <Ball  id="menu1" position={[0, 0, 3]}/>
            <Ball id="menu2" position={[2, 0, 2]}/>
            <Ball id="menu3" position={[5, 0, 1]}/>

            </group>
          </Canvas>
          </>
        )
    }



}
