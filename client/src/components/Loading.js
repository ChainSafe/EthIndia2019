import React from 'react';
import Loading from "../assets/loading.gif";

export default function LoadingComp(props) {

  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <img src={Loading} alt="Loading..." style={{height: props.height, width: "auto"}}/>
    </div>
  );
}