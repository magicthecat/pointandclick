import {Route } from "wouter"
import './App.css';


export function Room(props)

{

    return (
<Route path={props.path}>
<div className="row">
        {props.children}
</div>
</Route>

    )


}