import React, { useRef, useEffect } from "react";

import "./Map.css";

const Map = (props) => {
  const mapRef = useRef();


  // object destructoring that can be done because of Java script
  // basically get the keys from props and stores them into new constants
  const { center, zoom } = props;

  // when [] is changes then the () => {} will reexecute
  useEffect(() => {
    // we could use doc.getId, but useRef is cleaner in React
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
    });

    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
