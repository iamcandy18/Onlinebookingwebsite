import React from "react";
import Cardx from "./Cardx";

const Card = ({ text }) => {
  let events = [];
  switch (text) {
    case 'TREEHOUSE':
      events = [
        { text: 'TH1', imageUrl: 'https://source.unsplash.com/random/900x700/?treehouse' },
        { text: 'TH2', imageUrl: 'https://source.unsplash.com/random/900x700/?treehouse' },
        { text: 'TH1', imageUrl: 'https://source.unsplash.com/random/900x700/?treehouse' },
        { text: 'TH2', imageUrl: 'https://source.unsplash.com/random/900x700/?treehouse' },
        { text: 'TH1', imageUrl: 'https://source.unsplash.com/random/900x700/?treehouse' },
        { text: 'TH2', imageUrl: 'https://source.unsplash.com/random/900x700/?treehouse' },
        { text: 'TH1', imageUrl: 'https://source.unsplash.com/random/900x700/?treehouse' },
        { text: 'TH2', imageUrl: 'https://source.unsplash.com/random/900x700/?treehouse' },
        { text: 'TH1', imageUrl: 'https://source.unsplash.com/random/900x700/?treehouse' },
        { text: 'TH2', imageUrl: 'https://source.unsplash.com/random/900x700/?treehouse' },
        { text: 'TH1', imageUrl: 'https://source.unsplash.com/random/900x700/?treehouse' },
        { text: 'TH2', imageUrl: 'https://source.unsplash.com/random/900x700/?treehouse' },
        
      ];
      break;
    case 'LAKE':
      events = [
        { text: 'Lake Event 1', imageUrl: 'https://source.unsplash.com/random/900x700/?lake' },
        { text: 'Lake Event 2', imageUrl: 'https://source.unsplash.com/random/900x700/?lake' },
        { text: 'Lake Event 1', imageUrl: 'https://source.unsplash.com/random/900x700/?lake' },
        { text: 'Lake Event 2', imageUrl: 'https://source.unsplash.com/random/900x700/?lake' },
        { text: 'Lake Event 1', imageUrl: 'https://source.unsplash.com/random/900x700/?lake' },
        { text: 'Lake Event 2', imageUrl: 'https://source.unsplash.com/random/900x700/?lake' },
        { text: 'Lake Event 1', imageUrl: 'https://source.unsplash.com/random/900x700/?lake' },
        { text: 'Lake Event 2', imageUrl: 'https://source.unsplash.com/random/900x700/?lake' },
        { text: 'Lake Event 1', imageUrl: 'https://source.unsplash.com/random/900x700/?lake' },
        { text: 'Lake Event 2', imageUrl: 'https://source.unsplash.com/random/900x700/?lake' },
        { text: 'Lake Event 1', imageUrl: 'https://source.unsplash.com/random/900x700/?lake' },
        { text: 'Lake Event 2', imageUrl: 'https://source.unsplash.com/random/900x700/?lake' },
        
      ];
      break;
    case 'AMAZING VIEW':
      events = [
        { text: 'AMAZING VIEW', imageUrl: 'https://source.unsplash.com/random/900x700/?mountain' },
        { text: 'AMAZING VIEW', imageUrl: 'https://source.unsplash.com/random/900x700/?mountain' },
        { text: 'AMAZING VIEW', imageUrl: 'https://source.unsplash.com/random/900x700/?mountain' },
        { text: 'AMAZING VIEW', imageUrl: 'https://source.unsplash.com/random/900x700/?mountain' },
        { text: 'AMAZING VIEW', imageUrl: 'https://source.unsplash.com/random/900x700/?mountain' },
        { text: 'AMAZING VIEW', imageUrl: 'https://source.unsplash.com/random/900x700/?mountain' },
        { text: 'AMAZING VIEW', imageUrl: 'https://source.unsplash.com/random/900x700/?mountain' },
        { text: 'AMAZING VIEW', imageUrl: 'https://source.unsplash.com/random/900x700/?mountain' },
        { text: 'AMAZING VIEW', imageUrl: 'https://source.unsplash.com/random/900x700/?mountain' },
        { text: 'AMAZING VIEW', imageUrl: 'https://source.unsplash.com/random/900x700/?mountain' },
        { text: 'AMAZING VIEW', imageUrl: 'https://source.unsplash.com/random/900x700/?mountain' },
        { text: 'AMAZING VIEW', imageUrl: 'https://source.unsplash.com/random/900x700/?mountain' },
      ];
      break;
    case 'NATIONAL PARKS':
      events = [
        { text: 'NATIONAL PARK', imageUrl: 'https://source.unsplash.com/random/900x700/?national park' },
        { text: 'NATIONAL PARK', imageUrl: 'https://source.unsplash.com/random/900x700/?national park' },
        { text: 'NATIONAL PARK', imageUrl: 'https://source.unsplash.com/random/900x700/?national park' },
        { text: 'NATIONAL PARK', imageUrl: 'https://source.unsplash.com/random/900x700/?national park' },
        { text: 'NATIONAL PARK', imageUrl: 'https://source.unsplash.com/random/900x700/?national park' },
        { text: 'NATIONAL PARK', imageUrl: 'https://source.unsplash.com/random/900x700/?national park' },
        { text: 'NATIONAL PARK', imageUrl: 'https://source.unsplash.com/random/900x700/?national park' },
        { text: 'NATIONAL PARK', imageUrl: 'https://source.unsplash.com/random/900x700/?national park' },
        { text: 'NATIONAL PARK', imageUrl: 'https://source.unsplash.com/random/900x700/?national park' },
        { text: 'NATIONAL PARK', imageUrl: 'https://source.unsplash.com/random/900x700/?national park' },
        { text: 'NATIONAL PARK', imageUrl: 'https://source.unsplash.com/random/900x700/?national park' },
        { text: 'NATIONAL PARK', imageUrl: 'https://source.unsplash.com/random/900x700/?national park' },
        
      ];
      break;
    default:
      events = [
        { text: 'Music Festival', imageUrl: 'https://source.unsplash.com/random/900x700/?music festival' },
        { text: 'Art Exhibition', imageUrl: 'https://source.unsplash.com/random/900x700/?art' },
        { text: 'Food Carnival', imageUrl: 'https://source.unsplash.com/random/900x700/?food carnival' },
        { text: 'Tech Conference', imageUrl: 'https://source.unsplash.com/random/900x700/?tech' },
        { text: 'Marathon', imageUrl: 'https://source.unsplash.com/random/900x700/?marathon' },
        { text: 'Film Screening', imageUrl: 'https://source.unsplash.com/random/900x700/?film' },
        { text: 'Book Fair', imageUrl: 'https://source.unsplash.com/random/900x700/?book fair' },
        { text: 'Theater Play', imageUrl: 'https://source.unsplash.com/random/900x700/?theater' },
        { text: 'Comedy Show', imageUrl: 'https://source.unsplash.com/random/900x700/?comedy show' },
        { text: 'Dance Performance', imageUrl: 'https://source.unsplash.com/random/900x700/?dance performance' },
        { text: 'Science Fair', imageUrl: 'https://source.unsplash.com/random/900x700/?exhibition' },
        { text: 'Craft Workshop', imageUrl: 'https://source.unsplash.com/random/900x700/?craft' }
      ];
      
      
      break;
  }

  const price = () => (Math.random() * 5000).toFixed(2);

  const distance = () => (Math.random() * 500).toFixed(2);

  return (
    <div className="cardbox">
      {events.map((event, index) => (
        <Cardx
          key={index}
          imageUrl={event.imageUrl}
          description={event.text}
          distance={`${distance()} km`}
          price={`$${price()}`}
        />
      ))}
    </div>
  );
};

export default Card;
