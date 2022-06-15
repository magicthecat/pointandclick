import '../App.css';
import React from 'react'
import { Link, Route } from "wouter"

import { info_image } from '../data/images';
import { Door } from '../door';
import { Room } from '../room';
class Maze extends React.Component {


  render() {

const coordinates = {x: 10, y: 10}

    return (
      <div className="App">

      <header className="body">

 
 
<Room path="/room1">
      <p>Room 1</p>
    <Door href="/room2"/>
    <Door href="/room3"/>
    <Door href="/room4"/>
    <div className='row'>
    <div className='column'>
   <p></p>
      </div>
      <div className='column'>
      <p>middle doors aren't a good idea</p>
      </div>
      </div>
</Room>

<Room path="/room2">
<p>Room 2</p>

    <Door href="/room5"/>
    <Door href="/room7"/>
   
</Room>

<Room path="/room3">
<p>Room 3</p>

    <p>You're dead</p>
</Room>


<Room path="/room4">
<p>Room 4</p>

  <Door href="/room6"/>
</Room>


<Room path="/room5">
<p>Room 5</p>

    <p>You've reached room 5</p>
</Room>

<Room path="/room6">
<p>Room 6</p>

    <p>You've reached room 6</p>
</Room>

<Room path="/room7">
<p>Room 7</p>

  <Door href="/room8"/>


</Room>

<Room path="/room8">

<p>You've reached room 8</p>
<Door href="/room9"/>

</Room>

<Room path="/room9">
<p>You've reached room 9</p>
<Door href="/room10"/>

</Room>

<Room path="/room10">
<p>You've reached room 10</p>
<Door href="/room1"/>

</Room>


<Route path="/info">
<img src={info_image}  />


</Route>


      </header>
    </div>
    )
  }
}



export default Maze;
