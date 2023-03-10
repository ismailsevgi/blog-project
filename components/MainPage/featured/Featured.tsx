import Link from 'next/link';
import React from 'react';

import { Ipost, FeaturedPost } from '../../../Interfaces/FeatureTypes';
import styles from './Featured.module.scss';
import parse from 'html-react-parser';

const Featured: React.FC<FeaturedPost> = ({ lastBlog }) => {
  console.log('lastBlog: ', lastBlog);

  return (
    <div className='max-w-screen-xl mx-auto h-[80vh] relative'>
      <div className='h-full w-full flex '>
        <div className='w-full md:w-3/4'>
          <img src={lastBlog.imgUrl} className='object-cover w-full h-full' />
        </div>

        <div className={styles.rightContent}>
          <p className='mb-3 text-2xl font-light mt-4 '>En son paylaşılan</p>
          <h1 className={styles.title}>{lastBlog.title}</h1>

          <p className='text-lg font-extraligh break-all'>
            {parse(lastBlog.post.slice(0, 180) + '...')}
          </p>
          <div className='w-full h-16 flex justify-center sm:justify-end'>
            <Link
              href={`/Blog/${lastBlog._id}`}
              className='flex justify-between items-center w-[10rem] bg-black  h-full px-6 hover:bg-orange-500 ease-in duration-150'
            >
              <span className='text-white'>DEVAMI</span>
              <i className='fa-solid fa-arrow-right text-sm  text-white pl-2'></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
