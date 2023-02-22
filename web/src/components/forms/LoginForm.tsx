import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useAtom } from 'jotai';
import React from 'react';

import { FaEnvelope, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import homeActionAtom from '../../atoms/homeActionAtom';
import api from '../../util/api';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string(),
});

const initialValues = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const [_, setHomeAction] = useAtom(homeActionAtom);

  const handleSubmit = async (
    values: z.infer<typeof schema>,
    formikHelpers: FormikHelpers<z.infer<typeof schema>>
  ) => {
    formikHelpers.setSubmitting(false);
    api
      .post('/auth/login', values)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        window.location.href = '/';
      })
      .catch((err) => {
        toast(err.response.data.message, {
          type: 'error',
        });
      })
      .finally(() => {
        formikHelpers.setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={toFormikValidationSchema(schema)}
    >
      {({ isSubmitting }) => (
        <Form className='mt-2 flex flex-col gap-3 rounded-md bg-indigo-700 p-4 text-white'>
          <div className='flex items-center justify-between gap-2'>
            <h1 className='text-4xl font-bold'> Log-in </h1>
            <button
              onClick={() => setHomeAction('register')}
              className='text-sm hover:text-indigo-200'
            >
              Don't have an account? Register here!
            </button>
          </div>

          <div className='flex items-center gap-2 rounded-md bg-white p-3 text-indigo-600'>
            <FaEnvelope />
            <Field
              type='email'
              name='email'
              placeholder='Email'
              className='w-full bg-transparent outline-none'
            />
          </div>
          <ErrorMessage
            name='email'
            component='div'
            className='font-semibold text-red-500'
          />

          <div className='flex items-center gap-2 rounded-md bg-white p-3 text-indigo-600'>
            <FaLock />
            <Field
              type='password'
              name='password'
              placeholder='Password'
              className='w-full bg-transparent outline-none'
            />
          </div>
          <ErrorMessage
            name='password'
            component='div'
            className='font-semibold text-red-500'
          />

          <button
            type='submit'
            disabled={isSubmitting}
            className='rounded-md bg-white p-3 font-bold text-indigo-600 hover:opacity-70 disabled:opacity-50'
          >
            Enter
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
