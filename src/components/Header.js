import React from "react";
import { HEADER_LOGO } from "../constants";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className='header'>
      <Link to='/'>
        <img
          src={HEADER_LOGO}
          className='header-logo'
          alt='header-logo'
        />
      </Link>
      <h5 className='m-0'>Oompa Loompa's Crew</h5>
    </header>
  );
}
