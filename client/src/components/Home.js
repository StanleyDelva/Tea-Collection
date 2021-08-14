import React, { useEffect, useState } from 'react';
//import './Home.css';

export const Home = ({ children }) => {

    return (
        <div class="box has-background-info" >
            <header className="header">
                <section class="hero is-small is-info">
                    <div class="hero-body">
                        <p class="title">
                        Tea Collection
                        </p>
                        <p class="subtitle">
                        keep track of your sips
                        </p>
                    </div>
                </section>
            </header>
            <main>{children}</main>
        </div>
    )
}