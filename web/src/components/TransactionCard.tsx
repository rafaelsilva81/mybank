import dayjs from 'dayjs';
import React from 'react';

const TransactionCard = ({
  transaction,
}: {
  transaction: TransactionResponse;
}) => {
  const date = dayjs(transaction.createdAt).format('MM/DD/YYYY');

  return (
    <div
      className={`flex flex-col gap-2 rounded-md p-6 shadow-md ${
        transaction.type === 'DEPOSIT' ? 'bg-green-200' : 'bg-red-200'
      }`}
    >
      <div className='flex gap-4 justify-between items-center'>
        <h3 className='text-xl font-bold'> {transaction.type} </h3>
        <span className='font-bold text-lg'>
          {' '}
          ${transaction.amount.toFixed(2)}{' '}
        </span>
      </div>
      <span className='text-sm'> {date} </span>
    </div>
  );
};

export default TransactionCard;
