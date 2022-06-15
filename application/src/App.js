import './App.css';
import React, { Component, useContext, useState, useEffect } from 'react'
import { Link, Route } from "wouter"
import { Canvas } from '@react-three/fiber';
import { usePlane, Physics, useBox } from '@react-three/cannon';


const pages = [
  {
    id: 1,
    route: "/welcome",
    text: "Welcome",
    description: "This is the welcome page."
  },
  {
    id: 2,
    route: "/about",
    text: "About",
    description: "Find out about us"
  },
  {
    id: 3,
    route: "/blog",
    text: "Blog",
    description: "This is the blog"
  },
  {
    id: 4,
    route: "/contact",
    text: "Contact",
    description: "Find ways to contact here"

  },
  {
    id: 5,
    route: "/careers",
    text: "Careers",
    description: "About careers"
  },
  {
    id: 6,
    route: "/news",
    text: "News",
    description: "See us in the news"
  },
  {
    id: 7,
    route: "/gallery",
    text: "Gallery",
    description: "This is the gallery"
  },
  {
    id: 8,
    route: "/events",
    text: "Events",
    description: "Here's some events that might interest you"
  },
  {
    id: 9,
    route: "/team",
    text: "The Team",
    description: "Meet the team!"
  },
  {
    id: 9,
    route: "/visitus",
    text: "Visit us",
    description: "Book an appointment to visit us"
  },
  {
    id: 10,
    route: "/offers",
    text: "Offers",
    description: "View our offers here"
  },
  {
    id: 11,
    route: "/shop",
    text: "Shop",
    description: "Browse our online shop"
  },
  {
    id: 11,
    route: "/checkout",
    text: "Check Out",
    description: "Check out your basket"
  },
  {
    id: 12,
    route: "/articles",
    text: "Articles",
    description: "Things that might be interesting"
  },
  {
    id: 13,
    route: "/food",
    text: "Food",
    description: "Food that we like"
  },
  {
    id: 14,
    route: "/drink",
    text: "Drinks",
    description: "these are drinks we like"
  },
  {
    id: 14,
    route: "/gifts",
    text: "Gifts",
    description: "Browse our great range of gift ideas"
  },
  {
    id: 14,
    route: "/legal",
    text: "Legal",
    description: "All the legal stuff"
  },
  {
    id: 14,
    route: "/privacy ",
    text: "Privacy Policy",
    description: "Your privacy is important"
  },
  {
    id: 15,
    route: "/cookies",
    text: "Cookie Policy",
    description: "Beware the cookie monster"
  },
  {
    id: 16,
    route: "/terms",
    text: "Terms of Use",
    description: "how you can use our website"
  }
]



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




class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
    render() {

      return(

        this.props.routes.map(route => 

          <Route path={"/" + route.id}>
            <p>{route.text}</p>
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
        <h3 style={{color: theme.foreground}}>{this.getText(this.props.value)} {this.props.value} </h3>
    </>)
  }

}

ContextTest.contextType = ThemeContext;


class ThemedCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: ""};

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

 goToLink()

  {
    const url = window.location.protocol + "//" + window.location.host;
    window.open(url  + "/" + this.props.id, "_blank");
  }

  setOutColor()
  {

    let theme = this.props.theme;
    this.setState({
    color: theme.background})
  
  }

  render() {


    return (

  <mesh
        onClick={(e) => this.changeTheme()} receiveShadow castShadow 
        onDoubleClick={(e) => this.goToLink()} 

        onPointerOver={(e) => this.setOverColor()}
        onPointerOut={(e) => this.setOutColor()}
        position={this.props.position}

        >


    
    <boxGeometry />
    <meshLambertMaterial color={this.state.color} />
  </mesh>

    );

  }

}

ThemedCanvas.contextType = ThemeContext;


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
      preview: 1
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

  }


  findText() {
    return pages[this.state.preview -1].text 
  }

  findDescription() {
    return pages[this.state.preview -1].description
  }


  render() {

console.log(this.findText())

    return (
      <>

  
        <ThemeContext.Provider value={this.state.theme}>

<Routes routes={pages} />
        
        <Route path="/">
          <div className="main">
            <h1>Fiber Three Menu </h1>
            <PreviewText text={this.findText()}/>
            <ContextTest value={this.findDescription()}/>
          </div>


          <div  style={{ width: "80vw", height: "60vh", margin: "5vmin" }}>

            <Canvas shadows dpr={[3, 2]} gl={{ alpha: true }} camera={{ position: [-4, 3, -5], fov: 45 }}>
<color attach="background" args={['white']} />
    <ambientLight />
    <Physics>
          <ThemedCanvas id="1" changeTheme={this.toggleTheme} changePreview={this.togglePreview} theme={this.state.theme} position={[11, -5, 0]}  />
       
          <ThemedCanvas id="2" changeTheme={this.toggleTheme} changePreview={this.togglePreview}  theme={this.state.theme} position={[9, -5, 0]}  />
          <ThemedCanvas id="3"  changeTheme={this.toggleTheme} changePreview={this.togglePreview} theme={this.state.theme} position={[7, -5, 0]}  />
          <ThemedCanvas id="4" changeTheme={this.toggleTheme} changePreview={this.togglePreview} theme={this.state.theme} position={[5, -5, 0]}  />

          <ThemedCanvas id="5" changeTheme={this.toggleTheme} changePreview={this.togglePreview} theme={this.state.theme} position={[11, -5, 1.5]}  />
          <ThemedCanvas id="6" changeTheme={this.toggleTheme} changePreview={this.togglePreview} theme={this.state.theme} position={[9, -5, 1.5]}  />
          <ThemedCanvas id="7" changeTheme={this.toggleTheme} changePreview={this.togglePreview} theme={this.state.theme} position={[7, -5, 1.5]}  />
          <ThemedCanvas id="8" changeTheme={this.toggleTheme} changePreview={this.togglePreview} theme={this.state.theme} position={[5, -5, 1.5]}  />

          <ThemedCanvas id="9" changeTheme={this.toggleTheme} changePreview={this.togglePreview} theme={this.state.theme} position={[11, -5, 3]}  />
          <ThemedCanvas id="10" changeTheme={this.toggleTheme} changePreview={this.togglePreview} theme={this.state.theme} position={[9, -5, 3]}  />
          <ThemedCanvas id="11" changeTheme={this.toggleTheme} changePreview={this.togglePreview} theme={this.state.theme} position={[7, -5, 3]}  />
          <ThemedCanvas id="12" changeTheme={this.toggleTheme} changePreview={this.togglePreview} theme={this.state.theme} position={[5, -5, 3]}  />

          <ThemedCanvas id="13" changeTheme={this.toggleTheme} changePreview={this.togglePreview} theme={this.state.theme} position={[11, -5, 4.5]}  />
          <ThemedCanvas id="14" changeTheme={this.toggleTheme} changePreview={this.togglePreview} theme={this.state.theme} position={[9, -5, 4.5]}  />
          <ThemedCanvas id="15" changeTheme={this.toggleTheme} changePreview={this.togglePreview} theme={this.state.theme} position={[7, -5, 4.5]}  />
          <ThemedCanvas id="16" changeTheme={this.toggleTheme} changePreview={this.togglePreview} theme={this.state.theme} position={[5, -5, 4.5]}  />
        
   

          </Physics>
      </Canvas>
      </div>
      </Route>
        </ThemeContext.Provider>
   
      </>
    );
  }
}