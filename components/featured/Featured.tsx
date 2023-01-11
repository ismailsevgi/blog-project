import React from 'react';

import { Ipost, FeaturedPost } from '../../Interfaces/FeatureTypes';
import styles from './Featured.module.scss';

const Featured: React.FC<FeaturedPost> = ({ lastBlog }) => {
  return (
    <div className='max-w-screen-xl mx-auto h-[80vh] relative'>
      <div className='h-full w-full flex '>
        <div className='w-full md:w-3/4'>
          <img src={lastBlog.imgUrl} className='object-cover w-full h-full' />
        </div>

        <div className={styles.rightContent}>
          <p className='mb-3 text-2xl font-light mt-4 '>En son paylaşılan</p>
          <h1 className={styles.title}>{lastBlog.title}</h1>

          <p className='text-lg font-extralight  break-all'>
            {lastBlog.summary}
          </p>
          <div className='w-full h-16 flex justify-center sm:justify-end'>
            <button className='flex justify-between items-center w-[10rem] bg-black  h-full px-6 hover:bg-orange-500 ease-in duration-150'>
              <span className=' text-white'>Read More</span>
              <i className='fa-solid fa-arrow-right text-sm  text-white pl-2'></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
