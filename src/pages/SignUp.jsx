import signUpImg from '../assets/images/hero-login-signup-page.svg';
import googleIcon from '../assets/icons/google-icon.svg';
import { useState } from "react";
import Button from '../components/Button';
const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const handleSignUp = () => {
        // Add your login logic here
        console.log("Logging in with:", username, password);
      };
    



  return (
    <section className="flex flex-row items-center justify-center w-full pt-40 padding-r max-container padding-l wide:padding-r padding-b">
        <div className="flex flex-col items-center justify-center flex-1 w-full px-16 py-12 bg-white shadow-lg rounded-3xl">
            <h2 className='text-4xl font-[550] tracking-wider text-center'>Sign Up</h2>
            <br />
            <form className='flex flex-col justify-center gap-6'>
                <input
                    type="text"
                    placeholder='Enter username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input-text"
                />
                  <input
                type="email"
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='input-text'
            />

                    <input
                        type="password"
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='input-text'
                    />
                    <input
                        type="password"
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className='input-text'
                    />
        <Button label='Sign Up' handler={handleSignUp}/>
      </form>
      
      <p className='p-3 font-semibold text-slate-gray'>Already have account ? <a href="/login" ><span className='text-primary'>Log In</span></a></p>

      <button className='py-1.5 font-semibold bg-transparent border-2 button border-primary text-slate-gray mt-2'><img src={googleIcon} alt="Google Logo" />Sign Up with Google</button>

        </div>
        <div className='flex flex-col pl-32 pr-16 max-md:hidden'>
            <img src={signUpImg} alt="Sign Up Hero Image" className='self-center w-full max-w-md'
            />
            <div className='flex flex-col justify-center flex-1'>
            <h3 className='text-2xl font-semibold text-left'>Receive SMS online</h3>
            <p className='font-md'>Register on social networks, marketplaces, exchanges and online services without spam and disclosure of personal data</p>
            </div>
        </div>
    </section>
  )
}

export default SignUp;