import { useRouter } from 'next/router';
import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';

import { BlogsData, Ipost } from '../../../Interfaces/FeatureTypes';
import styles from './Blogs.module.scss';

const Blogs: React.FC<BlogsData> = ({ blogs }) => {
  const router = useRouter();
  return (
    <div className='max-w-screen-xl  m-auto my-[10rem] '>
      <div className='h-auto'>
        {blogs?.map((blog, index) => {
          return (
            <div key={blog._id}>
              {/* Top */}
              <div className='font-Poppins text-center h-auto '>
                <div className='text-slate-400 text-xl mt-8'>{blog.date}</div>
                <div className='title text-5xl font-semibold text-black my-4'>
                  {blog.title}
                </div>
                <div className='text-2xl text-orange-500 mb-4'>
                  {blog.category}
                </div>
              </div>
              {/* Image */}
              <div className='w-full md:w-2/3 mx-auto my-12 shrink-0 p-2 md:p-0'>
                <img src={blog.imgUrl} className='object-contain mx-auto' />
              </div>
              {/* Kısa özet */}
              <div className='mx-auto w-full md:w-2/3 p-4 md:p-0'>
                <p className='leading-9'>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Consectetur repellendus eius, nostrum esse exercitationem ut
                  ipsum sunt impedit temporibus est sit, officia dignissimos
                  optio ab, inventore quisquam commodi dolore qui!
                </p>
              </div>
              {/* Bottom */}
              <div className='mx-auto mt-8 mb-[12rem] h-12 w-3/5 sm:w-2/5 md:w-1/5'>
                <button
                  className='w-full h-full bg-black text-white hover:bg-orange-500 ease-linear duration-150'
                  onClick={() => {
                    router.push(`/Blog/${blog._id}`);
                  }}
                >
                  DEVAMI
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blogs;
