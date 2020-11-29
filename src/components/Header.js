import React from "react";
import { HEADER_LOGO } from "../constants";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className='header'>
      <div className='header-container'>
        <Link to='/'>
          <img
            src={HEADER_LOGO}
            className='header-logo'
            alt='header-logo'
          />
        </Link>
        <h3 className='m-0'>Oompa Loompa's Crew</h3>
      </div>
    </header>
  );
}
