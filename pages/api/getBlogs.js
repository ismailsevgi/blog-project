import connectingMongoDB from '../../utils/connectMongo';
import Blogs from '../../utils/blogSchema';

export default async function get_Blogs(request, response) {
  console.log('request.query.limit: ', request.query.limit);
  console.log('request.query: ', request.query);

  connectingMongoDB().catch((error) => console.log(error));
  await connectingMongoDB();
  if (request.query.limit) {
    try {
      const docs = await Blogs.find({})
        .sort({ createdAt: -1 })
        .skip(request.query.skip)
        .limit(request.query.limit)
        .exec();
      response.status(200).json(docs);
    } catch (error) {
      response.status(200).json({ Error: error });
      console.log(error);
    }
  } else {
    const docs = await Blogs.find({});
    response.status(200).json(docs);
  }
}
