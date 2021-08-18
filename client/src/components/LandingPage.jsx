import React from "react";
import {Link} from 'react-router-dom'

export const LandingPage = () => {
    return(
        <div>
            <h1>Hola que tal perrito.</h1>
            <Link to='/home'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
}