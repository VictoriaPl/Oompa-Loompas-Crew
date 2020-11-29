import React from "react";
import { HEADER_LOGO } from "../constants";

export default function InfoMessage({ title, extraInfo }) {
  return (
    <div className='flex-column'>
      <img
        src={HEADER_LOGO}
        alt='logo'
        width={"15%"}
        className='m-auto'
      />
      <h2 className='content-center'>{title}</h2>
      <p className='content-center gray'>{extraInfo}</p>
    </div>
  );
}
