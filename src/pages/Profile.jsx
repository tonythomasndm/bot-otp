import Sidebar from "../components/Sidebar";
import Button from '../components/Button';
import { details } from "../constants";
import { useState } from "react";
import { list } from "postcss";
const Profile = () => {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleChangePassword = () => {
    //handle here
  };
  return (
    <section className="flex flex-row pt-24 ">
      <Sidebar/>
      <section className="flex flex-col justify-center w-full pt-24 padding-r max-container padding-l wide:padding-r padding-b">
        <div className="w-full max-w-[1000px] gap-8 card items-start">
          <div>
          <h3 className="text-[45px] font-semibold tracking-wide text-left">Profile</h3>
          <div className="flex flex-row gap-2">
          <ul className="flex flex-col items-start justify-center gap-4 mt-6 text-xl text-black">
            {details.map((detail, index) => (<li key={index} className="w-full p-3 font-semibold tracking-wider">{detail.label}</li>))}
          </ul>
          <ul className="flex flex-col items-start justify-center min-w-full gap-4 mt-6 text-xl text-gray-600">
            {details.map((detail, index) => (<li key={index} className="w-full p-3 font-semibold tracking-wider">{detail.value}</li>))}
          </ul>
          </div>
          </div>
          <div>
          <h3 className="text-3xl font-semibold tracking-wide text-left">Change Password</h3>
          <form className='flex flex-col justify-center gap-6 mt-8'>
                <input
                    type="password"
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="min-w-[700px] max-md:min-w-fit input-text"
                />
                    <input
                        type="password"
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className='min-w-[700px] max-md:min-w-fit input-text'
                    />
        <Button label='Change Password' handler={handleChangePassword}/>
      </form>
          
          </div>
        </div>
      </section>
    </section>
  )
}

export default Profile;