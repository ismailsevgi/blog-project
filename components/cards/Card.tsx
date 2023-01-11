import React from 'react';
import { Card } from '../../Interfaces/FeatureTypes';

const Card: React.FC<Card> = ({ props }) => {
  return (
    <div className='card  rounded overflow-hidden'>
      <div className='h-50'>
        <img src={props.imgUrl} alt='img' height={800} />
      </div>
      <div className='flex justify-between items-center h-14 '>
        <span className='whitespace-nowrap ml-4'>{props.category}</span>
        <div className='h-[2px] bg-gray-500 w-20'></div>
        <span className='whitespace-nowrap mr-4'>{props.date}</span>
      </div>
      <div>
        <h1 className='text-2xl font-serif text-gray-700 leading-[1.5]'>
          {props.title}
        </h1>
        <p>{}</p>
      </div>
    </div>
  );
};

export default Card;
