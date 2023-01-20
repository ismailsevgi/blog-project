import axios from 'axios';

export default async function uploadToS3(
  data: any,
  titleImage: File,
  otherImages: FileList | null
) {
  const urlRegex = /^(.*)[\?]Content-Type/;
  const titleImageUrl = await data.urlsArray[0];
  const otherUrls = await data.urlsArray.slice(1);

  const titleUrlPromise: Promise<string> = new Promise(
    async (resolve, reject) => {
      try {
        const response = await axios.put(titleImageUrl, titleImage, {
          headers: {
            'Content-type': titleImage.type,
            'Access-Control-Allow-Origin': '*',
          },
        });

        const match = urlRegex.exec(response.request.responseURL);
        resolve(match![1]);
      } catch (error) {
        reject('Error: ' + error);
      }
    }
  );

  const otherImagesUrl: Promise<any[]> = new Promise(
    async (resolve, reject) => {
      try {
        let counter = 0;
        let totalArr = [];
        if (otherImages && otherImages.length > 0) {
          for (const file of otherImages) {
            const response = await axios.put(otherUrls[counter], file, {
              headers: {
                'Content-type': file.type,
                'Access-Control-Allow-Origin': '*',
              },
            });
            counter++;

            const match = urlRegex.exec(response.request.responseURL);

            totalArr.push({
              imgId: crypto.randomUUID(),
              imgUrl: match![1],
            });
          }
        }

        resolve(totalArr);
      } catch (error) {
        reject('Error: ' + error);
      }
    }
  );

  return await Promise.all([titleUrlPromise, otherImagesUrl]);
}
