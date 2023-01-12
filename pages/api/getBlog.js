import connectingMongoDB from '../../utils/connectMongo';
import Blogs from '../../utils/blogSchema';

export default async function getBlog(request, response) {
  console.log('request.query: ', request.query);

  connectingMongoDB().catch((error) => console.log(error));

  try {
    await connectingMongoDB();

    const docs = await Blogs.find({ _id: request.query.blogId });

    response.status(200).json(docs);
  } catch (error) {
    response.status(200).json({ Error: error });
    console.log(error);
  }
}
