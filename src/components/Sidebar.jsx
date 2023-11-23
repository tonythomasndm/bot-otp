import { sidebarComponents } from "../constants";
import { useEffect, useState } from "react";
import piggyBank from '../assets/images/piggy-bank-image.svg';
import { useContext } from 'react';
import { UserContext } from "../components/UserContext"
import Cookies from "js-cookie";
import axios from 'axios';

const Sidebar = () => {
    const [open, setOpen] = useState(false);
    const [balance,setBalance]=useState(0)
    const {user, setUser} = useContext(UserContext);
    console.log(user);
    useEffect(() => {
    // action on update
    const fetchData = async () => {
      try {
        const values = {email: Cookies.get("auth")}
        const res = await axios.post(`http://localhost:8081/balance?access_token=${Cookies.get("serv_auth")}`, values);

        if (res.status === 200){
            setBalance(res.data.balance)
            user.balance = res.data.balance;
            setUser(user);
        }
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };
  
    fetchData();
  }, []);
  return (
    <section className="flex flex-col w-min max-sm:absolute"> 
        
         <button className="flex p-3 m-3 text-white border-2 cursor-pointer rounded-xl bg-primary w-min" onClick={()=>{setOpen(!open)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
         </button>
            {open && <div 
            className={`top-0 bottom-0 lg:left-0 max-lg: ${open ? 'left-0' : '-left-[300px]'}
            left-[-300px] p-2 w-[300px] overflow-y-auto text-center bg-background pl-8 pr-8 max-sm:min-h-screen`}>
           
            <ul className='flex flex-col items-start justify-center gap-4 text-xl text-black'>
                
                {sidebarComponents.map((component, index) => (<li key={index} className="p-2.5  w-full hover:text-white hover:bg-primary rounded-lg">
                    <a href={component.href} className="flex items-center ">{component.icon}
                
                <h1 
                    className="ml-3 text-lg font-semibold tracking-wider ">{component.label}</h1>
                    </a>
                
                </li>))}
                
                
                
            </ul>
            <div className="py-4 mt-10 mb-10 card">
                
                <h3 className="font-semibold text-center">Wallet 
                <img src={piggyBank} alt="" />
                
                <br/>{balance}</h3>
                
            </div>
        </div>}
    </section>
  )
}

export default Sidebar;