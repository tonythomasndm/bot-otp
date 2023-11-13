import headerLogo from '../assets/images/header-logo.png';
import telegramLogo from '../assets/images/telegram-logo.svg';
const Navbar = () => {
  return (
    <header className="absolute z-10 w-full py-4 bg-blue-600 padding-x">
        <nav className='flex items-center justify-start max-container '>
            <a href="/" className='flex flex-row items-center justify-between gap-6 text-3xl font-[500] tracking-widest'>
                <img src={headerLogo} alt="Bot Otp" width={50}/>
                <h1 className='text-white font-montserrat'>BotOtp</h1>
            </a>
            <div className='flex flex-row justify-end w-full'>
              <a href="/"><div className='flex flex-row px-3 py-2 mx-4 rounded-lg bg-background'>
                <img src={telegramLogo} alt=""  width={36} height={36}
                className='pr-2 max-sm:pr-0'
                />
                <span className='max-sm:hidden'>Connect on Telegram</span>
              </div></a>
              <div>
                <button className='px-3 py-2 text-black rounded-full bg-background'>Log In</button>
              </div>
            </div>
        </nav>
    </header>
  )
}

export default Navbar;