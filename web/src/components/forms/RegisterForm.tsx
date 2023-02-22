import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useAtom } from 'jotai';
import React from 'react';

import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import homeActionAtom from '../../atoms/homeActionAtom';
import api from '../../util/api';

const schema = z
  .object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    passwordConfirmation: z
      .string()
      .min(6, 'Password must be at least 6 characters long'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  });

const initialValues = {
  email: '',
  password: '',
  passwordConfirmation: '',
  name: '',
};

const RegisterForm = () => {
  const [_, setHomeAction] = useAtom(homeActionAtom);

  const handleSubmit = async (
    values: z.infer<typeof schema>,
    formikHelpers: FormikHelpers<z.infer<typeof schema>>
  ) => {
    formikHelpers.setSubmitting(false);
    api
      .post('/auth/register', values)
      .then(() => {
        toast("You've successfully registered, please log-in!", {
          type: 'success',
        });
        setHomeAction('login');
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
            <h1 className='text-4xl font-bold'> Register </h1>
            <button
              onClick={() => setHomeAction('login')}
              className='text-sm hover:text-indigo-200'
            >
              Already have an account? Log-in here!
            </button>
          </div>

          <div className='flex items-center gap-2 rounded-md bg-white p-3 text-indigo-600'>
            <FaUser />
            <Field
              type='text'
              name='name'
              placeholder='Enter your name'
              className='w-full bg-transparent outline-none'
            />
          </div>
          <ErrorMessage
            name='name'
            component='div'
            className='font-semibold text-red-500'
          />

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

          <div className='flex items-center gap-2 rounded-md bg-white p-3 text-indigo-600'>
            <FaLock />
            <Field
              type='password'
              name='passwordConfirmation'
              placeholder='Password'
              className='w-full bg-transparent outline-none'
            />
          </div>
          <ErrorMessage
            name='passwordConfirmation'
            component='div'
            className='font-semibold text-red-500'
          />

          <button
            type='submit'
            disabled={isSubmitting}
            className='rounded-md bg-white p-3 font-bold text-indigo-600 hover:opacity-70 disabled:opacity-50'
          >
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
