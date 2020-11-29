import React from "react";
import { GENDER } from "../constants";

export default function ItemBasicInfo({ name, gender, profession }) {
  return (
    <React.Fragment>
      <h3 className={"m-0"}>{name}</h3>
      <p className={"gray m-0 font-sm"}>{GENDER(gender)}</p>
      <p className={"italic gray m-0 font-sm"}>{profession}</p>
    </React.Fragment>
  );
}
