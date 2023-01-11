import Image from 'next/image';
import React from 'react';
import styles from './RecentBlogs.module.scss';
import { Ipost, RecentPosts } from '../../Interfaces/FeatureTypes';
import Card from '../cards/Card';

const RecentBlogs: React.FC<RecentPosts> = ({ otherBlogs }) => {
  const firstFourBlog = otherBlogs.slice(0, 4);
  const lastBlog = otherBlogs.slice(4, 5);

  return (
    <div className='grid sm:grid-cols-2 max-w-screen-xl gap-6 m-auto mt-16 p-2 md:p-4 overflow-hidden'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
        {firstFourBlog.map((doc) => {
          return <Card key={doc['_id']} props={doc} />;
        })}
      </div>
      <div className={styles.rightContent}>
        <div className={styles.heroContent}>
          <div>
            <span className='text-yellow-500 text-xl font-light'>
              {lastBlog[0].category}
            </span>
          </div>

          <h3 className='text-white text-3xl '>{lastBlog[0].title}</h3>
        </div>
        <div className=''>
          <img className='object-cover ' src={lastBlog[0].imgUrl} alt='img' />
        </div>
      </div>
    </div>
  );
};

export default RecentBlogs;
