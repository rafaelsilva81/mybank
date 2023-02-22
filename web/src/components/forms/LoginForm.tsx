import { Formik } from 'formik';
import { ErrorMessage } from 'formik/dist/ErrorMessage';
import { Field } from 'formik/dist/Field';
import { Form } from 'formik/dist/Form';
import { useAtom } from 'jotai';
import React from 'react';

import { FaEnvelope, FaLock } from 'react-icons/fa';
import { z } from 'zod';
import homeActionAtom from '../../atoms/homeActionAtom';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string(),
});

const LoginForm = () => {
  const [_, setHomeAction] = useAtom(homeActionAtom);

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = (
    values: z.infer<typeof schema>,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    // handle form submission here
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form className='mt-2 flex flex-col gap-3 rounded-md bg-indigo-600 p-4 text-white'>
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
            <Field
              type='email'
              name='email'
              placeholder='Email'
              className='bg-transparent outline-none'
            />
          </div>
          <ErrorMessage name='email' component='div' className='text-red-500' />

          <div className='flex items-center gap-2 rounded-md bg-white p-3 text-black'>
            <FaLock />
            <Field
              type='password'
              name='password'
              placeholder='Password'
              className='bg-transparent outline-none'
            />
          </div>
          <ErrorMessage
            name='password'
            component='div'
            className='text-red-500'
          />

          <button
            type='submit'
            disabled={isSubmitting}
            className='rounded-md bg-white p-3 font-bold text-indigo-600 hover:opacity-70'
          >
            Enter
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
