import React from "react";
import {NavLink} from "react-router-dom";

export default () => (
    <header className="fixed bg-white w-full shadow top-0 z-50">
        <div className="container">
            <div className="flex justify-between items-center">
                <div className="flex items-center justify-between h-20 px-5 xl:px-0">
                    <h1 className="font-bold xl:text-2xl">Moeen Basra</h1>
                </div>

                <ul className="space-x-5 ml-auto flex items-center">
                    <li>
                        <NavLink to="/" className={({isActive}) => isActive ? 'font-bold' : undefined}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="submit-links" className={({isActive}) => isActive ? 'font-bold' : undefined}>
                            Submit
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </header>
)
