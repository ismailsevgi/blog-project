import S3 from 'aws-sdk/clients/s3';

export default async function S3_BUCKET_OPENER(req, res) {
  if (req.method !== 'POST') {
    res.status(403).json({ error: "You can't use other than POST method" });
  }
  const s3 = new S3({
    region: process.env.REGION,
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    signatureVersion: 'v4',
  });

  const { body: urls } = req.body;
  const urlsArray = [];

  for (const arr of urls) {
    let fileParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: arr[0],
      Expires: 600,
      ContentType: arr[1],
    };

    let url = await s3.getSignedUrlPromise('putObject', fileParams);
    urlsArray.push(url);
  }

  res.status(200).json({ urlsArray: urlsArray });
}
