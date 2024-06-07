import React from "react";

const Cardx = ({ imageUrl, description, distance, price }) => {
  return (
    <div className="card">
      <div className="img">
        <img src={imageUrl} alt="" />
      </div>
      <div className="cardtext">
        <p>{description}</p>
        <p>
          {distance} km <br /> {price} Rs per day
        </p>
      </div>
    </div>
  );
};

export default Cardx;

