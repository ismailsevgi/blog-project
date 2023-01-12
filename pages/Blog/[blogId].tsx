import { GetStaticProps, GetStaticPaths } from 'next';
import React from 'react';
import axios from 'axios';
import { Ipost } from '../../Interfaces/FeatureTypes';
import Navbar from '../../components/navbar/Navbar';

export const getStaticPaths = async () => {
  const { data } = await axios.get('http://localhost:3000/api/getBlogs');
  const pathsArr = data.map((blog: { _id: string }) => ({
    params: { blogId: blog._id.toString() },
  }));

  return {
    paths: pathsArr,
    fallback: false,
  };
};

export const getStaticProps = async (context: {
  params: { blogId: string };
}) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/getBlog?blogId=${context.params.blogId}`
  );

  return {
    props: {
      data,
    },
  };
};

type Props = {
  data: Ipost[];
};

const Blog: React.FC<Props> = ({ data }) => {
  return (
    <>
      <Navbar />
      <div key={data[0]._id}>
        {/* Top */}
        <div className='font-Poppins text-center h-auto  '>
          <div className='text-slate-400 text-xl mt-8'>{data[0].date}</div>
          <div className='title text-5xl font-semibold text-black my-4'>
            {data[0].title}
          </div>
          <div className='text-2xl text-orange-500 mb-4'>
            {data[0].category}
          </div>
        </div>
        {/* Image */}
        <div className='w-full md:w-2/3 mx-auto my-12 shrink-0 p-2 md:p-0'>
          <img src={data[0].imgUrl} />
        </div>
        {/* Kısa özet */}
        <div className='mx-auto w-full md:w-2/3 p-4 md:p-0'>
          <p className='leading-9'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Consectetur repellendus eius, nostrum esse exercitationem ut ipsum
            sunt impedit temporibus est sit, officia dignissimos optio ab,
            inventore quisquam commodi dolore qui!
          </p>
        </div>
      </div>
    </>
  );
};

export default Blog;
