import { Link } from "wouter"
import { door_image } from "./data/images";

import './App.css';

export function Door(props)

{

    return (
<Link href={props.href}>
<div className="column">
<img src={door_image} />
</div>
</Link>

    )


}