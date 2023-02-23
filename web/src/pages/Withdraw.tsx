import React, { useRef, useState } from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import LoadingElement from '../components/LoadingElement';
import api from '../util/api';

const Withdraw = () => {
  const amountRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const sendDeposit = async () => {
    const amount = amountRef.current?.value;
    const description = descriptionRef.current?.value;

    if (!amount) {
      toast('Please enter an valid amount', { type: 'error' });
      return;
    }

    setLoading(true);

    await api
      .post('/transactions/withdraw', {
        amount: parseFloat(amount),
        description,
      })
      .catch((err) => {
        toast(err.response.data.message, { type: 'error' });
        return;
      })
      .then((res) => {
        toast('Withdraw sucessful', { type: 'success' });

        queryClient.invalidateQueries('user');
      })
      .finally(() => {
        setLoading(false);
        amountRef.current!.value = '';
      });
  };

  if (loading) {
    return <LoadingElement />;
  }

  return (
    <div className='flex flex-col w-full h-screen items-center justify-center'>
      {/* Simple box asking how much to Withdrawl */}
      <div className='flex flex-col w-96 gap-2 rounded-md p-6 shadow-md bg-indigo-700'>
        <h3 className='text-lg font-bold text-white'> Withdrawal </h3>
        <input
          type='number'
          className='border-2 border-gray-300 p-2 rounded-md'
          required
          placeholder='Amount'
          ref={amountRef}
          step='0.01'
          min={0}
          max={1000000}
        />
        <textarea
          className='border-2 border-gray-300 p-2 rounded-md'
          required
          placeholder='Description (optional)'
          ref={descriptionRef}
          maxLength={200}
        />

        <button
          className='bg-white text-indigo-700 p-2 rounded-md hover:bg-indigo-200'
          onClick={sendDeposit}
        >
          Withdrawl
        </button>
      </div>
    </div>
  );
};

export default Withdraw;
