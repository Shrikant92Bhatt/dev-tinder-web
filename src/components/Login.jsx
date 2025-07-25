import React from 'react';
import { useForm } from 'react-hook-form';
import login from '../api';
import { addUser } from '../store/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    try {
      const { data: user } = await login(data.email, data.password);
      dispatch(addUser(user));
      navigate('/feed');
    } catch (error) {
      //:TODO
      console.error(error);
    }
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center my-15">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend text-2xl">Login</legend>

          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}

          <button
            type="submit"
            className="btn btn-neutral mt-4"
            disabled={!isValid} // ✅ Enable only if form is valid
          >
            Login
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
