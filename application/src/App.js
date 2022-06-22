// https://codepen.io/chrisgannon/pen/NwXdYd - For Typewriter effect


import './App.css';
import React, { Component, useContext, useState, useEffect, useMemo, useRef } from 'react'
import { Link, Route } from "wouter"
import {  Canvas,  useThree, useFrame } from '@react-three/fiber';
import {Box, Reflector, MeshDistortMaterial, MeshWobbleMaterial, Html, Text, Icosahedron, CubeCamera, OrbitControls, PresentationControls, PerspectiveCamera, Float, Edges, useTexture } from '@react-three/drei'
import { Game } from './Game';
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three'
import { AboutUsPage, blog } from './pages/aboutPage';
import { animated, useSpring } from '@react-spring/three';
import CameraControls from 'camera-controls'
import FadeInOut from './FadeIn';
import { welcome } from './pages/aboutPage';
import { CityGame } from './CityGame';
import { Isometric } from './Isometric';
import { Terrain } from './Terrain';
import { InstanceTest } from './InstanceTest';
function createMarkup(data) {
  return {__html: data};
}





const pages = [
  {
    id: 1,
    route: "/welcome",
    text: "Welcome",
    description: "To a Fiber Three Sample site",
    pageData: welcome
  },
  {
    id: 2,
    route: "/about",
    text: "About",
    description: "How it is put together...",
    pageData: "https://dynamicportfolio888.web.app/",
  },
  {
    id: 3,
    route: "/examples",
    text: "Examples",
    description: "React Fiber Three Examples",
    pageData: "https://news-aggregator-f19bc.web.app/news/uk-news"

  },
  {
    id: 4,
    route: "/contact",
    text: "Contact",
    description: "Find ways to contact here"

  }

];



export let themes = {
  light: {
    foreground: 'red',
    background: 'yellow',
    test: ''

  },
  dark: {
    foreground: 'green',
    background: 'hotpink',
    test: ''
  },
};

export const ThemeContext = React.createContext(
  themes.light 
);


function reverseString(str) {
  var newString = "";
  for (var i = str.length - 1; i >= 0; i--) {
      newString += str[i];
  }
  return newString;
}

class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
    render() {
      console.log(this.props.routes)

      return(

        this.props.routes.map(page => 

          <Route path={page.route}>
            <p>{page.text}</p>
            </Route>
          )

      )
    }
}


class PreviewText extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: ""};
  }

  componentDidMount()

  {
    this.setState({
      text: this.props.text
    })
  }

  render()
  {

    return(
      <h1>{this.props.text}</h1>
    ) 
    
    
  }
}

function TextScene(props) {

    return (
      <React.Suspense fallback={null}>
            <Text characters="abcdefghijklmnopqrstuvwxyz0123456789!"
              color={props.color}
              fontSize={props.fontSize}
              maxWidth={50}
              position={props.position}
              lineHeight={1}
              textAlign={'left'}
              font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
              anchorX="center"
              anchorY="middle"
              
            >
            {props.text}
            </Text>
          </React.Suspense>
    )
  }



class ContextTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: ""};

  }
  componentDidMount()

  {
    let props = this.props;
    let theme = this.context;

    this.setState({
      color: theme.foreground
    })
    

  }


  getText()

  {
    let text = "";
    if (this.props.value > 5)
    {
      text = "This is a menu"
    }

    if (this.props.value <= 5)
    {
      text = "This is another menu"
    }

    return text;
  }

  render() {
    let props = this.props;
    let theme = this.context;

    return (
    <>
        <h3 style={{color: theme.foreground}}>{this.props.value} </h3>
    </>)
  }

}

ContextTest.contextType = ThemeContext;

function Sphere(props)

{
  const [bumpMap, normal] = useTexture(['/SurfaceImperfections003_1K_var1.jpg', '/SurfaceImperfections003_1K_Normal.jpg'])




  return(
<Icosahedron scale={0.75} args={[0.5, 3]}>
      
<MeshDistortMaterial color={props.color} 
    roughness={1}
    metalness={0.1}
    bumpScale={0.005}
    clearcoat={1}
    clearcoatRoughness={1}
    radius={1}
    distort={1}
    bumpMap={bumpMap}
    envMap={normal}


/>

    
  </Icosahedron>
  )
}


class Cube extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: "" };

  }



  changeTheme()

  {
    let theme = this.props.theme
    this.props.changeTheme(this.props.id);
    this.setState({
      color: theme.foreground
    })


  }

  changePreview()

  {
    this.props.changePreview(this.props.id)

  }

  componentDidMount()

  {
    let theme = this.props.theme;
    console.log(theme)

    this.setState({
      color: theme.foreground
    })
    

  }


  setOverColor()
  {
    const Randomcolor = "#" + Math.floor(Math.random()*16777215).toString(16);
    console.log(Math.floor(Math.random()*16777215).toString(16))
    this.changePreview()
    let theme = this.props.theme;
    this.setState({
    color: Randomcolor})
  
  }

  findRoute() {
    return pages[this.props.id -1].route 
  }



 goToLink()

  {
//    const url = window.location.protocol + "//" + window.location.host;
  //  window.open(url  +  this.findRoute(), "_blank");
    this.props.changePageData(this.props.id)

 
  }

  setOutColor()
  {

    let theme = this.props.theme;
    this.setState({
    color: theme.background})
  
  }

  render() {



    return (

<>
  <mesh
        onClick={(e) => this.changeTheme()} receiveShadow castShadow 
        onDoubleClick={(e) => this.goToLink()} 

        onPointerOver={(e) => this.setOverColor()}
        onPointerOut={(e) => this.setOutColor()}
        position={this.props.position}

        >

          <Sphere color={this.state.color}/>

</mesh>

</>
    );

  }

}

Cube.contextType = ThemeContext;



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
      preview: 1,
      pageData: "Hello"
    };

    this.toggleTheme = (value) => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
        value: value
      }));
    };

    this.togglePreview = (value) => {
      this.setState(state => ({
        preview: value
      }));

    };

    this.toggleDescription = (value) => {
      this.setState(state => ({
        description: value
      }));

    };
      this.togglePageData = (value) => {
        this.setState(state => ({
          pageData: value,
          displayPageData: true
        }));
      
  

    };

  }


  findText() {
    return pages[this.state.preview -1].text 
  }

  findDescription() {
    return pages[this.state.preview -1].description
  }

  findPageData() {
    return pages[this.state.preview -1].pageData
  }


  render() {

console.log(this.findText())

    return (
      <>

  
        <ThemeContext.Provider value={this.state.theme}>

<Routes routes={pages} />


<Route path="/block">
  <CityGame/>
</Route>

<Route path="/instance">
      <InstanceTest/>
</Route>

<Route path="/iso">
  <Isometric/>
</Route>

<Route path="/terrain">
      <Terrain/>
</Route>
        <Route path="/game">
          <Game/>
          </Route>
        <Route path="/">
  


          <div  style={{left: "10%", width: "80vw", height: "80vh", margin: "5vmin", position: "relative"}}>
            {/* camera={{ position: [-4, 3, -5], fov: 40 }} */}
            <Canvas  gl={{ powerPreference: "high-performance" }}  shadows dpr={[5, 2]} gl={{ alpha: true }} >
              <OrbitControls enableDamping={true} enableZoom={true} enablePan={true} enableRotate={true} zoomSpeed={0.5} />
      <PerspectiveCamera makeDefault position={[5, 4.5, 20]}  fov={50} dpr={[5, 2]} />


<color attach="background" args={['white']} />
<ambientLight />

<Float
  speed={1.0} // Animation speed, defaults to 1
  rotationIntensity={0.25} // XYZ rotation intensity, defaults to 1
  floatIntensity={0.25} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
  floatingRange={[1, 1.25]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
>
<TextScene position={[6, 5, 3]} fontSize={3} color={this.state.theme.background} text={this.findText()}/>
              <TextScene position={[6, 3, 3]} fontSize={0.5} color={this.state.theme.foreground} text={this.findDescription()}/>

    <Cube id="1" changeTheme={this.toggleTheme} changePageData={this.togglePageData} changePreview={this.togglePreview} theme={this.state.theme} position={[5, -1, 3]}  />
    <Cube id="2"  changeTheme={this.toggleTheme} changePreview={this.togglePreview} theme={this.state.theme} position={[7, -1, 3]}  />
    <Cube id="3" changeTheme={this.toggleTheme} changePreview={this.togglePreview}  theme={this.state.theme} position={[9, -1, 3]}  />
    <Cube id="4" changeTheme={this.toggleTheme} changePreview={this.togglePreview} theme={this.state.theme} position={[11, -1, 3]}  />

         
          </Float>
          <mesh>

<Html 
position={[-10, 3, 3]}
  >



</Html>


</mesh>
      </Canvas>
      </div>

      <FadeInOut show = "show">
      <div style={{color: "hotpink", marginTop: "25vmin", marginLeft: "10vmin", zIndex: 3, top: 0, bottom: 0, position: "absolute"}}
      className='page'> 
<div dangerouslySetInnerHTML={createMarkup(this.findPageData())}/>


       </div>
       </FadeInOut>
      </Route>
        </ThemeContext.Provider>
   
      </>
    );
  }
}