import connectingMongoDB from '../../utils/connectMongo';
import Blogs from '../../utils/models/blogSchema';
import Cors from 'cors';

const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function get_Blogs(request, response) {
  console.log('request.query.limit: ', request.query.limit);
  console.log('request.query: ', request.query);

  await runMiddleware(request, response, cors);

  await connectingMongoDB();

  try {
    if (request.query.limit) {
      let selectedCategory = {};
      switch (request.query.category) {
        case 'orgu':
          selectedCategory = { category: 'Örgü' };
          break;
        case 'kultur':
          selectedCategory = { category: 'Kültür' };
          break;
        case 'gundelik':
          selectedCategory = { category: 'Gündelik' };
          break;
        case '':
          selectedCategory = {};
          break;
      }

      try {
        const docs = await Blogs.find(selectedCategory)
          .sort({ createdAt: -1 })
          .skip(request.query.skip)
          .limit(request.query.limit)
          .exec();
        console.log('docs.length: ', docs.length);
        response.status(200).json(docs);
      } catch (error) {
        response.status(200).json({ Error: error });
        console.log(error);
      }
    } else {
      const docs = await Blogs.find({});
      response.status(200).json(docs);
    }
  } catch (error) {
    console.log('Ctch error: ', error);
    response.status(404).json({ error: error });
  }
}
