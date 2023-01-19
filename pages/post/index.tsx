import { getSession } from 'next-auth/react';
import React, { useEffect, useReducer, useState } from 'react';
import { categoryOptionSelectType } from '../../Interfaces/FeatureTypes';
import postReducer from '../../utils/Reducer/postReducer';
import axios from 'axios';
import { Constants } from '../../utils/Constants/constants';
import GetAllImagesArray from '../../components/Post/GetAllImagesArray';
import uploadToS3 from '../../components/Post/uploadToS3';
import initialState from '../../utils/Reducer/blogState';
import { useRouter } from 'next/router';

const BlogCreate = () => {
  const [titleImage, setTitleImage] = useState<null | File>(null);
  const [otherImages, setOtherImages] = useState<null | FileList>(null);
  const [upload, setUpload] = useState(false);
  const [state, dispatch] = useReducer(postReducer, initialState);
  const router = useRouter();
  useEffect(() => {
    console.log('Current State: ', state);
    if (upload) {
      axios.post('/api/postBlog', state).then((res) => {
        router.push('/');
      });
    }
  }, [upload]);

  const postTheBlog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!titleImage) {
      throw new Error('There is no image to upload');
    }

    try {
      const { data } = await axios.post('/api/S3_BUCKET_OPENER', {
        body: GetAllImagesArray(titleImage, otherImages),
      });

      const values = await uploadToS3(data, titleImage, otherImages);

      //values[0] titleImgUrl
      //values[1] otherImagesUrls

      dispatch({ type: Constants.SET_IMGURL, payload: values[0] });
      dispatch({ type: Constants.SET_OTHER_IMAGES, payload: values[1] });
      setUpload(true);
    } catch (error) {
      console.log('Axios error: ', error);
    }
  };

  return (
    <div className='h-[100vh] border-4 bg-slate-600 flex justify-center items-center'>
      <form
        onSubmit={postTheBlog}
        className='bg-white p-6 rounded-lg shadow-md w-1/3'
      >
        <label className='block font-medium mb-2'>Konu Basligi</label>
        <input
          type='text'
          className='bg-gray-200 rounded-lg p-2 w-full'
          value={state.title}
          onChange={(e) =>
            dispatch({ type: Constants.SET_TITLE, payload: e.target.value })
          }
        />

        <label className='block font-medium mb-2 mt-4'>Kategori</label>
        <select
          className='bg-gray-200 rounded-lg p-2 w-full'
          value={state.category}
          onChange={(ev: categoryOptionSelectType) =>
            dispatch({ type: Constants.SET_CATEGORY, payload: ev.target.value })
          }
        >
          <option value='Gündelik'>Gündelik</option>
          <option value='Örgü'>Örgü</option>
          <option value='Kültür'>Kültür</option>
        </select>

        <label className='block font-medium mb-2 mt-4'>Post</label>
        <textarea
          className='bg-gray-200 rounded-lg p-2 w-full'
          value={state.post}
          onChange={(e) => {
            console.log('Key stroke');

            dispatch({ type: Constants.SET_POST, payload: e.target.value });
          }}
        />
        <label className='block font-medium mb-2'>Title Image</label>
        <input
          type='file'
          className='bg-gray-200 rounded-lg p-2 w-full'
          onChange={(e) => {
            const files = e.target.files as FileList;
            console.log('Resim Seçildi');

            if (files[0]) {
              setTitleImage(files[0]);
            }
          }}
        />
        <label className='block font-medium mb-2'>Other Images</label>
        <input
          type='file'
          multiple={true}
          className='bg-gray-200 rounded-lg p-2 w-full'
          onChange={(e) => {
            const files = e.target.files as FileList;

            if (files) {
              setOtherImages(files);
            }
          }}
        />

        <button
          type='submit'
          className='bg-indigo-500 text-white rounded-lg p-2 mt-4 w-full hover:bg-indigo-600 disabled:bg-gray-200'
          disabled={upload ? true : false}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BlogCreate;

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);
  console.log('ServerSide Session: ', session);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
