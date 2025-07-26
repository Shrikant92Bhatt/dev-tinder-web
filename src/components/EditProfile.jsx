import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
// import { FaLink } from 'react-icons/fa';

const EditProfile = () => {
  const user = useSelector((root) => root.user);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age || 25,
        gender: user.gender | 'male',
        photoUrl: user.photoUrl,
        about: user.about,
      });
      setSkills([...user.skills]);
    }
  }, [user, reset, setValue]);

  const onSubmit = (data) => {
    data.skills = skills;
    console.log(data);
  };

  const addSkill = () => {
    if (skillInput && !skills.includes(skillInput)) {
      setSkills((prev) => [...prev, skillInput]);
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills((prev) => prev.filter((s) => s !== skillToRemove));
  };

  if (!user) {
    return (
      <div className="p-6 w-full max-w-md mx-auto">
        <div className="skeleton h-6 w-32 mb-4"></div>
        <div className="skeleton h-10 w-full mb-3"></div>
        <div className="skeleton h-6 w-32 mb-4"></div>
        <div className="skeleton h-10 w-full mb-3"></div>
        <div className="skeleton h-6 w-32 mb-4"></div>
        <div className="skeleton h-10 w-full mb-3"></div>
        <div className="skeleton h-12 w-32 mt-5"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center my-10">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
        <fieldset className="bg-base-300 border-base-300 rounded-box border p-6 space-y-4">
          <legend className="text-2xl mb-2">Edit Profile</legend>

          {/* First Name */}
          <div className="form-control">
            <label className="label">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              className={`input input-bordered w-full ${
                errors.firstName ? 'input-error' : 'input-primary'
              }`}
              {...register('firstName', { required: true })}
            />
            {errors.firstName && (
              <div className="validator-hint text-error">First name is required</div>
            )}
          </div>

          {/* Last Name */}
          <div className="form-control">
            <label className="label">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              className={`input input-bordered w-full ${
                errors.lastName ? 'input-error' : 'input-primary'
              }`}
              {...register('lastName', { required: true })}
            />
            {errors.lastName && (
              <div className="validator-hint text-red-500">Last name is required</div>
            )}
          </div>

          {/* Age */}
          <div className="form-control">
            <label className="label">Age</label>
            <input
              type="number"
              placeholder="Age"
              className={`input input-bordered w-full ${
                errors.age ? 'input-error' : 'input-primary'
              }`}
              {...register('age', {
                required: true,
                min: 1,
                max: 100,
              })}
            />
            {errors.age && (
              <div className="validator-hint text-red-500">Enter a valid age (1–100)</div>
            )}
          </div>

          {/* Gender */}
          <div className="form-control">
            <label className="label">Gender</label>
            <select
              className={`select select-bordered w-full ${errors.gender ? 'select-error' : ''}`}
              {...register('gender', { required: true })}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <div className="validator-hint text-red-500">Please select your gender</div>
            )}
          </div>

          {/* Profile Photo URL with DaisyUI validator styling */}
          <div className="form-control">
            <label className="label">Profile Photo URL</label>

            <label
              className={`input validator ${
                errors.photoUrl ? 'input-error' : ''
              } flex items-center gap-2 w-full`}
            >
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </g>
              </svg>
              <input
                type="url"
                placeholder="https://"
                className="grow"
                {...register('photoUrl', {
                  required: true,
                  pattern: {
                    value:
                      /^(https?:\/\/)?([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}.*$/,
                    message: 'Must be a valid URL',
                  },
                })}
              />
            </label>

            {errors.photoUrl && (
              <div className="validator-hint text-red-500">{errors.photoUrl.message}</div>
            )}
          </div>

          {/* About */}
          <div className="form-control">
            <label className="label">About</label>
            <textarea
              className="textarea textarea-bordered flex items-center gap-2 w-full"
              placeholder="Tell us about yourself"
              {...register('about')}
            />
          </div>

          {/* Skills with chips */}
          <div className="form-control">
            <label className="label">Skills</label>
            <div className="flex gap-2 mb-2 flex-wrap">
              {skills.map((skill, index) => (
                <div key={index} className="badge badge-outline flex items-center gap-1">
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-xs text-red-500"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                className="input input-bordered w-full"
                placeholder="Type a skill and press Enter"
              />
              <button type="button" className="btn btn-primary" onClick={addSkill}>
                Add
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-neutral mt-4 w-full" disabled={!isValid}>
            Update Profile
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default EditProfile;
