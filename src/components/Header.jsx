import React from 'react';

const Header = () => {
    return (
        <>
        <nav class="bg-blue-800 text-white flex ">
        
        <ul class="px-14 py-4 flex space-x-11">
        <div><img src="\src\assets\images\logo.png" class="h-7" alt=" " /></div>
        <li class="cursor-pointer hover:text-black text-3xl font-semibold font-['Montserrat'] tracking-widest" >BotOtp</li>
        
        <div className="flex items-center justify-end w-80 h-15 bg-sky-100 rounded-lg shadow border border-sky-400" >
            {/* <img class="w-13 h-10 " src="src\assets\images\telegram.png" alt=" " /> */}
        <div className="cursor-pointer hover:text-sky-600 w-56 text-black text-xl font-normal font-['Montserrat'] text-center px-2 py-2 tracking-tight">Connect on Telegram</div>
        </div>
        </ul>
        <ul class="py-5 px-96 flex justify-end">
        <li class="justify-end cursor-pointer hover:text-black hover:border-white text-2xl font-semibold font-['Montserrat'] tracking-tight ">Login</li>
        </ul>
    </nav>
        </>
    );
};

export default Header;
