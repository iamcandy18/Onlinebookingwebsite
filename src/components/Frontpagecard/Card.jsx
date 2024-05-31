import React from "react";
import Cardx from "./Cardx";
import axios from "axios";
import { useState, useEffect } from "react";

const Card = () => {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.pexels.com/v1/search", {
          params: { query:"castle treehouse", per_page: 24 },
          headers: {
            Authorization: `oFmDA19vH4xUvarbFKJQYIV3ruIYoIVWv2D1Ka7WO9MqbXd8Uqlrp0yA`,
          },
        });

        const data = response.data.photos.map((item, index) => ({
          imageUrl: item.src.medium,
          description: `event ${index + 1}`,
          distance: Math.floor(Math.random() * 100), 
          price: Math.floor(Math.random() * 500) + 100, 
        }));

        setCardData(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="cardbox">
      {cardData.map((data, index) => (
        <Cardx
          key={index}
          imageUrl={data.imageUrl}
          description={data.description}
          distance={data.distance}
          price={data.price}
        />
      ))}
    </div>
  );
};

export default Card;
