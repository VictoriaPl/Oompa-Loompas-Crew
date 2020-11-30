import React from "react";
import { GENDER } from "../constants";
import Skeleton from "react-loading-skeleton";

export default function ItemBasicInfo({
  name,
  lastName,
  gender,
  profession,
}) {
  return (
    <React.Fragment>
      <h3 className={"m-0"}>
        {name && lastName ? `${name} ${lastName}` : <Skeleton />}
      </h3>
      <p className={"gray m-0 font-sm"}>
        {(gender && GENDER(gender)) || <Skeleton />}
      </p>
      <p className={"italic gray m-0 font-sm"}>
        {profession || <Skeleton count={5} />}
      </p>
    </React.Fragment>
  );
}
