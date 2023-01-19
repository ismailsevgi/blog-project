//mongo
import connectingMongoDB from '../../utils/connectMongo';
import Blogs from '../../utils/models/blogSchema';
import Cors from 'cors';

const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
});

function runCors(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

//where the files will be uploaded
// connectingMongoDB().catch((error) => console.log(error))

const handler = async (req, res) => {
  console.log('Post Request .method!', req.method);
  console.log('Post  Request .body!', req.body);

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Use Post Method!' });
  }
  await runCors(req, res, cors);
  await connectingMongoDB();

  try {
    Blogs.create(req.body, (err, blog) => {
      if (err) {
        console.log('Error in postBlog.js: ', err);
        throw new Error('Something went wrong while uploading the post', err);
      }
      res.status(200).json({ data: blog });
    });
  } catch (error) {
    console.log('Error while using schema!', error);
    res.status(404).json({ error });
  }
};

export default handler;
