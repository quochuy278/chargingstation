import React, { Component } from 'react'
import styles from './Header.module.css';
import Home from '../pages/Home';
import {Link} from 'react-router-dom';
export class Header extends Component {
    render() {
        return (
           
            <div class={styles.container}>
                <ul class={styles.items}>
                    <li>Home</li>
                    <li>Location</li>
                    <li>About us</li>
                    <li>Account</li>
                </ul>
            </div>
        
        ) 
    }
}

export default Header
