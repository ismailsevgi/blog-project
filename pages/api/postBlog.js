import connectingMongoDB from '../../utils/connectMongo';
import Blogs from '../../utils/models/blogSchema';

export default function post_Blogs(request, response) {
  //Body buradan alınacak
  console.log('request.body', request.body);
  console.log('request.method', request.method);

  connectingMongoDB().catch((error) => console.log(error));

  const create = new Blogs(request.body);

  create.save().then(() => {
    response.status(200).json(create);
  });
}
