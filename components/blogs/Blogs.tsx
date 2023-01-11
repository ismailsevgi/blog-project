import { useRouter } from 'next/router';
import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';

import { BlogsData, Ipost } from '../../Interfaces/FeatureTypes';
import styles from './Blogs.module.scss';

const Blogs: React.FC<BlogsData> = ({ blogs }) => {
  const router = useRouter();
  return (
    <div className='max-w-screen-xl  m-auto mb-[10rem]'>
      <div className='grid grid-cols-2 gap-4 h-auto'>
        {blogs?.map((blog, index) => {
          return (
            <div
              className='flex first-line:border border-2 border-slate-100 bg-red-300 text-sky-100 mx-auto h-[25rem] p-2'
              key={blog._id}
            >
              <div className=' w-1/3'>
                <img src={blog.imgUrl} className='object-cover' />
              </div>
              <div>
                <h1>
                  {blog.title} {index}
                </h1>
                <p>{blog.post}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blogs;
