import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signup } from '../api';
import { addUser } from '../store/userSlice';
import { useToast } from '../hooks/useTost';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const userData = {
        ...data,
        about: '', // Default empty about
        skills: [], // Default empty skills array
      };
      
      const response = await signup(userData);
      
      if (response && response.data) {
        // Store user data in Redux slice
        dispatch(addUser(response.data));
        
        showToast({ message: 'Account created successfully! Welcome!', type: 'success' });
        
        // Navigate to profile page (auto-login)
        navigate('/Profile');
      } else {
        showToast({ message: 'Signup successful but no user data received', type: 'warning' });
        navigate('/Profile');
      }
    } catch (error) {
      console.error('Signup error:', error);
      showToast({ message: error.message || 'Failed to create account', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-8 px-4">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-6 shadow-lg">
            <legend className="fieldset-legend text-3xl font-bold text-center mb-6">Create Account</legend>

            {/* First Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">First Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your first name"
                className={`input input-bordered w-full ${
                  errors.firstName ? 'input-error' : 'input-primary'
                }`}
                {...register('firstName', {
                  required: 'First name is required',
                  minLength: {
                    value: 2,
                    message: 'First name must be at least 2 characters',
                  },
                })}
              />
              {errors.firstName && (
                <div className="validator-hint text-red-500 mt-1">{errors.firstName.message}</div>
              )}
            </div>

            {/* Last Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Last Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your last name"
                className={`input input-bordered w-full ${
                  errors.lastName ? 'input-error' : 'input-primary'
                }`}
                {...register('lastName', {
                  required: 'Last name is required',
                  minLength: {
                    value: 2,
                    message: 'Last name must be at least 2 characters',
                  },
                })}
              />
              {errors.lastName && (
                <div className="validator-hint text-red-500 mt-1">{errors.lastName.message}</div>
              )}
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`input input-bordered w-full ${
                  errors.emailId ? 'input-error' : 'input-primary'
                }`}
                {...register('emailId', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address',
                  },
                })}
              />
              {errors.emailId && (
                <div className="validator-hint text-red-500 mt-1">{errors.emailId.message}</div>
              )}
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className={`input input-bordered w-full ${
                  errors.password ? 'input-error' : 'input-primary'
                }`}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />
              {errors.password && (
                <div className="validator-hint text-red-500 mt-1">{errors.password.message}</div>
              )}
            </div>

            {/* Age and Gender - Side by Side */}
            <div className="flex gap-4">
              {/* Age */}
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text font-medium">Age</span>
                </label>
                <input
                  type="number"
                  placeholder="Enter your age"
                  className={`input input-bordered w-full ${
                    errors.age ? 'input-error' : 'input-primary'
                  }`}
                  {...register('age', {
                    required: 'Age is required',
                    min: {
                      value: 18,
                      message: 'You must be at least 18 years old',
                    },
                    max: {
                      value: 100,
                      message: 'Please enter a valid age',
                    },
                  })}
                />
                {errors.age && (
                  <div className="validator-hint text-red-500 mt-1">{errors.age.message}</div>
                )}
              </div>

              {/* Gender */}
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text font-medium">Gender</span>
                </label>
                <select
                  className={`select select-bordered w-full ${
                    errors.gender ? 'select-error' : 'select-primary'
                  }`}
                  {...register('gender', { required: 'Please select your gender' })}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <div className="validator-hint text-red-500 mt-1">{errors.gender.message}</div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full mt-6"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>

            {/* Login Link */}
            <div className="text-center mt-4">
              <span className="text-base-content/70">Already have an account? </span>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="link link-primary font-medium"
              >
                Login here
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Signup;
