import { AxiosError } from 'axios';
import React from 'react';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import { toast } from 'react-toastify';
import LoadingElement from '../components/LoadingElement';
import api from '../util/api';

const Profile = () => {
  const queryClient = useQueryClient();
  const mailRef = React.useRef<HTMLInputElement>(null);
  const nameRef = React.useRef<HTMLInputElement>(null);

  const avatarRef = React.useRef<HTMLInputElement>(null);

  const passwordRef = React.useRef<HTMLInputElement>(null);
  const newPasswordRef = React.useRef<HTMLInputElement>(null);

  const { data: user, isLoading } = useQuery<UserResponse, AxiosError>(
    'profile',
    async () => {
      return api
        .get('/user')
        .then((res) => res.data)
        .catch((err) => {
          throw err;
        });
    }
  );

  const editProfileMutation = useMutation(
    async (profileData: { name: string; email: string }) => {
      return api
        .patch('/user/profile', profileData)
        .then((res) => res.data)
        .catch((err) => {
          throw err;
        });
    }
  );

  const editPasswordMutation = useMutation(
    async (passwordData: { password: string; newPassword: string }) => {
      return api
        .patch('/user/password', passwordData)
        .then((res) => res.data)
        .catch((err) => {
          throw err;
        });
    }
  );

  const editAvatarMutation = useMutation(async (avatar: FormData) => {
    return api
      .patch('/user/avatar', avatar, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  });

  if (
    isLoading ||
    editAvatarMutation.isLoading ||
    editPasswordMutation.isLoading ||
    editProfileMutation.isLoading
  ) {
    return <LoadingElement />;
  }

  const editProfile = async () => {
    const email = mailRef.current?.value;
    const name = nameRef.current?.value;

    const regexMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (!email || !name) {
      toast('Please fill out all fields', { type: 'error' });
      return;
    }

    if (!regexMail.test(email)) {
      toast('Invalid E-Mail', { type: 'error' });
      return;
    }

    try {
      await editProfileMutation.mutateAsync({
        name,
        email,
      });
      toast('Profile successfully edited', { type: 'success' });
      queryClient.invalidateQueries('profile');
      queryClient.invalidateQueries('user');
    } catch (err) {
      if (err instanceof AxiosError)
        toast(err.response?.data.message, { type: 'error' });
    }
  };

  const editPassword = async () => {
    const password = passwordRef.current?.value;
    const newPassword = newPasswordRef.current?.value;

    if (!password || !newPassword) {
      toast('Please fill out all fields', { type: 'error' });
      return;
    }

    try {
      await editPasswordMutation.mutateAsync({
        password,
        newPassword,
      });
      toast('Password successfully edited', { type: 'success' });
      queryClient.invalidateQueries('profile');
      queryClient.invalidateQueries('user');
    } catch (err) {
      if (err instanceof AxiosError)
        toast(err.response?.data.message, { type: 'error' });
    }
  };

  const editAvatar = async () => {
    const avatar = avatarRef.current?.files?.[0];

    if (!avatar) {
      toast('Please select an image', { type: 'error' });
      return;
    }

    const formData = new FormData();
    formData.append('avatar', avatar);

    try {
      await editAvatarMutation.mutateAsync(formData);
      toast('Avatar successfully edited', { type: 'success' });
      queryClient.invalidateQueries('profile');
      queryClient.invalidateQueries('user');
    } catch (err) {
      if (err instanceof AxiosError)
        toast(err.response?.data.message, { type: 'error' });
    }
  };

  return (
    <main className='flex flex-col w-full p-8 gap-8'>
      <h1 className='text-4xl font-bold text-black'>Your Profile</h1>
      {/* part1: edit avatar */}
      <div className='flex flex-col gap-1'>
        <h2 className='text-2xl font-bold text-black'>Edit Avatar</h2>
        <div className='flex flex-col gap-2'>
          <label htmlFor='avatar'>Avatar</label>
          <input
            className='bg-white p-2 border-2 border-indigo-600 text-indigo-700 rounded-md'
            type='file'
            name='avatar'
            id='avatar'
            multiple={false}
            accept='image/*'
            ref={avatarRef}
          />
          <button
            className='bg-indigo-600 text-white p-2 rounded-md'
            onClick={editAvatar}
          >
            Confirm
          </button>
        </div>
      </div>

      {/* part2: edit mail and name */}
      <div className='flex flex-col gap-1'>
        <h2 className='text-2xl font-bold text-black'>Edit E-Mail and Name</h2>
        <div className='flex flex-col gap-2'>
          <input
            className='bg-white p-2 border-2 border-indigo-600 text-indigo-700 rounded-md'
            type='text'
            name='name'
            id='name'
            placeholder='Name'
            defaultValue={user?.name}
            ref={nameRef}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <input
            className='bg-white p-2 border-2 border-indigo-600 text-indigo-700 rounded-md'
            type='email'
            name='email'
            id='email'
            defaultValue={user?.email}
            placeholder='E-Mail'
            ref={mailRef}
          />
        </div>
        <button
          className='bg-indigo-600 text-white p-2 rounded-md'
          onClick={editProfile}
        >
          Confirm
        </button>
      </div>

      {/* part3: edit passowrd (confirm current password + new password) */}
      <div className='flex flex-col gap-1'>
        <h2 className='text-2xl font-bold text-black'>Edit Password</h2>
        <div className='flex flex-col gap-2'>
          <input
            className='bg-white p-2 border-2 border-indigo-600 text-indigo-700 rounded-md'
            type='password'
            name='currentPassword'
            id='currentPassword'
            placeholder='Current Password'
            ref={passwordRef}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <input
            className='bg-white p-2 border-2 border-indigo-600 text-indigo-700 rounded-md'
            type='password'
            name='newPassword'
            id='newPassword'
            placeholder='New Password'
            ref={newPasswordRef}
          />
        </div>
        <button
          className='bg-indigo-600 text-white p-2 rounded-md'
          onClick={editPassword}
        >
          Confirm
        </button>
      </div>
    </main>
  );
};

export default Profile;
