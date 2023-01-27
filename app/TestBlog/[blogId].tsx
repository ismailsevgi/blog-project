import React from 'react';
import Navbar from '../../components/navbar/Navbar';

import connectingMongoDB from '../../utils/connectMongo.js';
import BlogsModel from '../../utils/models/blogSchema';
import ImageSlider from '../../components/Blog/ImageSlider';

type Props = {
  params: {
    blogId: string;
  };
};

async function BlogPage({ params }: Props) {
  async function connect() {
    await connectingMongoDB();
    return await BlogsModel.findOne({
      _id: params.blogId,
    });
  }
  const data = await connect();

  if (data) {
    return <h1>Data geldi</h1>;
  } else {
    return <h1>Dataya ulasilamadi</h1>;
  }
}

export default BlogPage;
