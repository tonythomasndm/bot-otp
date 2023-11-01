import React from 'react';

const Header = () => {
    return (
        <>
        <nav class="bg-blue-800 text-white flex ">
        
        <ul class="px-14 sm:px-6 md:px-8 py-4 flex space-x-11">
        {/* <div><img src="\src\assets\images\logo.png" class="h-7" alt=" " /></div> */}
        <li class="cursor-pointer hover:text-black text-3xl  font-semibold font-'Montserrat' tracking-widest" >BotOtp</li>
        
        <div className="flex items-center justify-end w-10/12 h-5/6 bg-sky-100 rounded-lg shadow border border-sky-400" >
            
        <div className="cursor-pointer hover:text-sky-600 text-black text-xl font-normal font-Montserrat text-center px-2 py-2 tracking-tight">Connect on Telegram</div>
        </div>
        </ul>
        <div class="py-5  flex justify-end">
        <div class="cursor-pointer hover:text-black hover:border-white text-2xl sm:text-xl font-semibold font-Montserrat tracking-widest ">Login</div>
        </div>
    </nav>
        </>
    );
};

export default Header;
