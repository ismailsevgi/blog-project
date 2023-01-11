import connectingMongoDB from '../../utils/connectMongo';
import Blogs from '../../utils/blogSchema';

export default function get_Blogs(request, response) {
  console.log('request.query.limit: ', request.query.limit);
  console.log('request.query: ', request.query);

  connectingMongoDB().catch((error) => console.log(error));

  Blogs.find({}, (err, docs) => {
    if (err) return console.error(err);
    response.status(200).json(docs);
  })
    .sort({ createdAt: -1 })
    .skip(request.query.skip)
    .limit(request.query.limit);
}
