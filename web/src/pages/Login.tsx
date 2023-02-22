import { useAtom } from 'jotai';
import React from 'react';
import { FaMoneyBill } from 'react-icons/fa';
import homeActionAtom from '../atoms/homeActionAtom';
import LoginForm from '../components/forms/LoginForm';
import RegisterForm from '../components/forms/RegisterForm';

const Login = () => {
  const [homeAction] = useAtom(homeActionAtom);
  return (
    <main className='bg-main_gradient flex h-screen w-screen flex-col-reverse items-center justify-center gap-2  md:justify-between lg:flex-row'>
      <div className='flex flex-1 flex-col gap-4 p-14'>
        <div className='flex items-center gap-4 font-bold text-indigo-600'>
          <h1 className='text-5xl font-bold tracking-tighter'>MyBank</h1>
          <FaMoneyBill size={48} />
        </div>

        <p className='text-xl'>
          Simple app bank project. This is a project mainly focused on learning
          fullstack web development. You can create your account and log-in,
          make deposits or withdraw money, and make a loan.
        </p>

        {homeAction === 'login' ? <LoginForm /> : <RegisterForm />}
      </div>

      <div
        className="
        flex bg-[url('/home.jpg')] bg-cover
        bg-center 
        lg:min-h-screen
        lg:min-w-[50%] lg:flex-1
        "
      />
    </main>
  );
};

export default Login;
