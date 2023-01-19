import React from 'react';

import { Ipost } from '../../Interfaces/FeatureTypes';
import Navbar from '../../components/navbar/Navbar';

import connectingMongoDB from '../../utils/connectMongo.js';
import BlogsModel from '../../utils/models/blogSchema';

export const getStaticPaths = async () => {
  await connectingMongoDB();

  const data = await BlogsModel.find({});

  const pathsArr = data.map((blog: { _id: string }) => ({
    params: { blogId: blog._id.toString() },
  }));

  return {
    paths: pathsArr,
    fallback: false,
  };
};

type Props = {
  blog: Ipost;
};

export const getStaticProps = async (context: {
  params: { blogId: string };
}) => {
  await connectingMongoDB();

  const data = await BlogsModel.findOne({
    _id: context.params.blogId,
  });

  return {
    props: {
      blog: JSON.parse(JSON.stringify(data)),
    },
  };
};

const Blog: React.FC<Props> = ({ blog }) => {
  return (
    <>
      <Navbar />
      <div key={blog._id}>
        {/* Top */}
        <div className='font-Poppins text-center h-auto  '>
          <div className='text-slate-400 text-xl mt-8'>{blog.date}</div>
          <div className='title text-5xl font-semibold text-black my-4'>
            {blog.title}
          </div>
          <div className='text-2xl text-orange-500 mb-4'>{blog.category}</div>
        </div>
        {/* Image */}
        <div className='w-full md:w-2/3 mx-auto my-12 shrink-0'>
          <img
            src={blog.imgUrl}
            alt={blog.title}
            className='float-none lg:float-left w-full hover:w-full hover:mx-0   lg:w-[30rem] px-3 mt-4 lg:px-2'
          />
          <hr className='block mt-4 border border-1 border-yellow-500 mx-2 lg:hidden '></hr>
          <p className='text-lg break-keep text-black leading-9 float-none lg:float-both pt-2 mx-3 lg:mx-2'>
            {blog.post}
          </p>
          <hr className='block mt-4 border border-1 border-yellow-500 mx-2 lg:hidden '></hr>
        </div>
      </div>
    </>
  );
};

export default Blog;
