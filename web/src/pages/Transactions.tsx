import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import LoadingElement from '../components/LoadingElement';
import TransactionCard from '../components/TransactionCard';
import api from '../util/api';

const Transactions = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { data: transactions, isLoading } = useQuery<
    TransactionResponse[],
    AxiosError
  >('transactions', async () => {
    return api
      .get('/transactions')
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  });

  if (isLoading) {
    return <LoadingElement />;
  }

  console.log(transactions);

  return (
    <main className='flex flex-col w-full p-8 gap-2'>
      <h1 className='text-4xl font-bold text-black'>Transactions</h1>

      {/* top bar */}
      <div className='flex justify-between items-center w-full bg-indigo-700 rounded-md shadow-md p-2'>
        <div className='flex items-center gap-2'>
          {/* Create deposit */}
          <button
            className='flex items-center gap-2 bg-white rounded-md p-2 text-indigo-600'
            onClick={() => {
              navigate('/deposit');
            }}
          >
            <span className=''>Make Deposit</span>
          </button>

          {/* Create withdraw */}
          <button
            className='flex items-center gap-2 bg-white rounded-md p-2 text-indigo-600'
            onClick={() => {
              navigate('/withdraw');
            }}
          >
            <span className=''>Make Withdraw</span>
          </button>
        </div>

        {/* Pagination */}
        <div className='flex items-center gap-2'>
          <button
            className='flex items-center gap-2 bg-white rounded-md p-2 text-indigo-600 disabled:opacity-50'
            disabled={page === 1}
            onClick={() => {
              setPage((prev) => {
                return prev - 1 <= 0 ? 1 : prev - 1;
              });
            }}
          >
            <FaChevronLeft />
          </button>
          <span className='text-white font-bold'>Page {page}</span>
          <button
            className='flex items-center gap-2 bg-white rounded-md p-2 text-indigo-600'
            onClick={() => {
              setPage((prev) => {
                return prev + 1;
              });
            }}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Transactions */}
      <div className='flex flex-col gap-2'>
        {!transactions ? (
          <span> No transactions found </span>
        ) : (
          transactions.map((transaction) => {
            return (
              <TransactionCard key={transaction.id} transaction={transaction} />
            );
          })
        )}
      </div>
    </main>
  );
};

export default Transactions;
