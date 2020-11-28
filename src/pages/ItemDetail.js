import React from "react";
import { useParams } from "react-router-dom";

export default function ItemDetail() {
  const { id } = useParams();
  return (
    <div>
      <h1>Say hello to {id}</h1>
    </div>
  );
}
