import { useAtom } from 'jotai';
import React from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import homeActionAtom from '../../atoms/homeActionAtom';

const LoginForm = () => {
  const [_, setHomeAction] = useAtom(homeActionAtom);
  return (
    <form className='mt-2 flex flex-col gap-3 rounded-md bg-indigo-600 p-4 text-white'>
      <div className='flex items-center justify-between gap-2'>
        <h1 className='text-4xl font-bold'> Log-in </h1>
        <button
          onClick={() => setHomeAction('register')}
          className='text-sm hover:text-indigo-200'
        >
          Don't have an account? Register here!
        </button>
      </div>

      <div className='flex items-center gap-2 rounded-md bg-white p-3 text-black'>
        <FaEnvelope />
        <input
          type='email'
          placeholder='Email'
          className='bg-transparent outline-none'
        />
      </div>

      <div className='flex items-center gap-2 rounded-md bg-white p-3 text-black'>
        <FaLock />
        <input
          type='password'
          placeholder='Password'
          className='bg-transparent outline-none'
        />
      </div>

      <button className='rounded-md bg-white p-3 font-bold text-indigo-600 hover:opacity-70'>
        Enter
      </button>
    </form>
  );
};

export default LoginForm;
