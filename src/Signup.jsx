import React from 'react';

const Signup = () => {
  return (
    <div className="flex justify-center items-center my-15">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-2xl">Sign Up</legend>

        <label className="label">First Name</label>
        <input type="text" className="input" placeholder="Please Enter First Name" />

        <label className="label">Last Name</label>
        <input type="text" className="input" placeholder="Please Enter Last Name" />

        <label className="label">Email</label>
        <input type="email" className="input" placeholder="Please Enter Email" />

        <label className="label">Password</label>
        <input type="password" className="input" placeholder="Please Enter Password" />
        {/* Age */}
        <label className="label">Age</label>
        <input type="number" className="input" placeholder="Age" min={5} max={60} />

        {/* Gender */}
        <label className="label">Gender</label>
        <select defaultValue="Pick a Gender" className="select">
          <option disabled={true}>Pick a Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Others</option>
        </select>

        {/* About */}
        <label className="label">About</label>
        <textarea className="textarea" placeholder="Bio"></textarea>

        {/* Skills */}
        <button className="btn btn-neutral mt-4">Login</button>
      </fieldset>
    </div>
  );
};

export default Signup;
