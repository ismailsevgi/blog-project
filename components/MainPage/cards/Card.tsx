import { useRouter } from 'next/router';
import React from 'react';
import { Card } from '../../../Interfaces/FeatureTypes';
import parse from 'html-react-parser';

const Card: React.FC<Card> = ({ props }) => {
  const router = useRouter();
  return (
    <div
      className='card  rounded overflow-hidden cursor-pointer'
      onClick={() => {
        router.push(`/Blog/${props._id}`);
      }}
    >
      <div className='h-50'>
        <img src={props.imgUrl} alt='img' height={800} />
      </div>
      <div className='flex justify-between items-center mt-4 '>
        <span className='whitespace-nowrap text-orange-500'>
          {props.category}
        </span>

        <span className='whitespace-nowrap'>{props.date}</span>
      </div>
      <div>
        <h2 className='text-2xl font-Poppins font-semibold text-gray-700 my-2'>
          {props.title}
        </h2>
        <p>{parse(props.post.slice(0, 100) + '...')}</p>
      </div>
    </div>
  );
};

export default Card;
