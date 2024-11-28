import React from "react";
import '../style.css';

export default function Footer(){
    const currentYear = new Date().getFullYear();

    return(
        <footer className="footer">
            <a>© {currentYear} NetMovie, All rights reserved.</a>
        </footer>
    );
}