import Sidebar from "../components/Sidebar";
import Button from '../components/Button';
import { useState } from "react";
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
          <ul>
            {/* //display user details here */}
          </ul>
          </div>
          <div>
          <h3 className="text-3xl font-semibold tracking-wide text-left">Change Password</h3>
          <form className='flex flex-col justify-center gap-6 mt-8'>
                <input
                    type="password"
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="max-w-[700px] input-text"
                />
                    <input
                        type="password"
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className='max-w-[700px] input-text'
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