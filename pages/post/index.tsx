import { getSession } from 'next-auth/react';
import React, { useRef, useState } from 'react';
import { IncomingMessage } from 'http';

type Props = {};

const BlogCreate = (props: Props) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Gündelik' | 'Örgü' | 'Kültür'>(
    'Gündelik'
  );
  const [content, setContent] = useState('');

  const postTheBlog = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(title, category, content);
    // Here you can add code to send the data to your backend to create a new blog post
  };

  return (
    <div className='h-[100vh] border border-2 border-red-900 flex justify-center items-center'>
      <form
        onSubmit={postTheBlog}
        className='bg-white p-6 rounded-lg shadow-md w-1/3'
      >
        <label className='block font-medium mb-2'>Konu Basligi</label>
        <input
          type='text'
          className='bg-gray-200 rounded-lg p-2 w-full'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className='block font-medium mb-2 mt-4'>Kategori</label>
        <select
          className='bg-gray-200 rounded-lg p-2 w-full'
          value={category}
          onChange={(e) =>
            setCategory(e.target.value as 'Gündelik' | 'Örgü' | 'Kültür')
          }
        >
          <option value='Gündelik'>Gündelik</option>
          <option value='Örgü'>Örgü</option>
          <option value='Kültür'>Kültür</option>
        </select>

        <label className='block font-medium mb-2 mt-4'>Content</label>
        <textarea
          className='bg-gray-200 rounded-lg p-2 w-full'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          type='submit'
          className='bg-indigo-500 text-white rounded-lg p-2 mt-4 w-full hover:bg-indigo-600'
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
