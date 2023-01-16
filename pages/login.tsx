import React, { useState } from 'react';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import axios from 'axios';

type Props = {
  loginStatus: Boolean;
};

function Login({ loginStatus }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { data: session } = useSession();
  console.log('session: ', session);

  const sendLoginCredentials = async (values: {
    username: string;
    password: string;
  }) => {
    console.log('sendLoginCredentials : ', values.username, values.password);

    await signIn('credentials', {
      username: values.username,
      password: values.password,
      redirect: true,
      callbackUrl: '/post',
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    sendLoginCredentials({ username, password });
  };

  return (
    <div className='h-[100vh] flex flex-col justify-center items-center'>
      <h1 className='text-2xl text-center text-yellow-700'>
        {loginStatus ? (
          <p>
            `Zaten Giriş Yaptınız. <strong>{session?.user?.username}</strong>
          </p>
        ) : (
          <p>Giriş Yap</p>
        )}
      </h1>
      {loginStatus && (
        <button
          onClick={() => signOut()}
          className='bg-indigo-500 text-white rounded-lg p-2 mt-4 hover:bg-indigo-600'
        >
          Çıkış yap
        </button>
      )}

      <form
        onSubmit={(e) => handleSubmit(e)}
        className='bg-white p-6 rounded-lg shadow-md w-full sm:w-2/3 md:w-1/3 mx-10 mt-12'
      >
        <label className='block font-medium mb-2'>Username</label>
        <input
          type='text'
          className='bg-gray-200 rounded-lg p-2 w-full'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className='block font-medium mb-2 mt-4'>Password</label>
        <input
          type='password'
          className='bg-gray-200 rounded-lg p-2 w-full'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type='submit'
          className='bg-indigo-500 text-white rounded-lg p-2 mt-4 w-full hover:bg-indigo-600'
        >
          Giris
        </button>
      </form>
    </div>
  );
}

export default Login;

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);

  return {
    props: {
      loginStatus: session ? true : false,
    },
  };
};
