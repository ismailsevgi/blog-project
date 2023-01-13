import Image from 'next/image';
import React from 'react';
import styles from './RecentBlogs.module.scss';
import { Ipost, RecentPosts } from '../../../Interfaces/FeatureTypes';
import Card from '../cards/Card';
import { useRouter } from 'next/router';

const RecentBlogs: React.FC<RecentPosts> = ({ otherBlogs }) => {
  const firstFourBlog = otherBlogs.slice(0, 4);
  const lastBlog = otherBlogs.slice(4, 5);
  const router = useRouter();

  return (
    <div className='grid md:grid-cols-2 max-w-screen-xl gap-6 m-auto mt-16 p-2 md:p-4 overflow-hidden'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {firstFourBlog?.map((doc) => {
          return <Card key={doc['_id']} props={doc} />;
        })}
      </div>
      {lastBlog.length > 0 && (
        <div
          className={styles.rightContent}
          onClick={() => {
            router.push(`/Blog/${lastBlog[0]._id}`);
          }}
        >
          <div className={styles.heroContent}>
            <div>
              <span className='text-yellow-500 text-xl font-light'>
                {lastBlog[0].category}
              </span>
            </div>

            <h3 className='text-white text-3xl '>{lastBlog[0].title}</h3>
          </div>
          <div className='h-full'>
            <img
              className='object-cover h-full'
              src={lastBlog[0].imgUrl}
              alt='img'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentBlogs;
