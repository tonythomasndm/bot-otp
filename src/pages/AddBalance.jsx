import Sidebar from "../components/Sidebar";
import paymentQrCode from '../assets/images/payment-qr-code.png';
import Button from '../components/Button';
import scanQRHero from '../assets/images/scan-qr-hero.svg';
const AddBalance = () => {

  const openLink = () => {
    // Replace "https://example.com" with the actual link you want to open
    const linkToOpen = "https://www.google.com/";
    window.open(linkToOpen, "_blank");
  };

  return (
    <section className="flex flex-row pt-24 ">
      <Sidebar/>
      <section className="flex flex-row items-center justify-center w-full pt-24 padding-r max-container padding-l wide:padding-r padding-b">
        <div className="w-full max-w-[580px] gap-8 card">
          <h3 className="text-2xl font-semibold tracking-wide text-center">Payment UPI QR Code</h3>
          <img src={paymentQrCode} alt=" Payment QR Code"  width={250} className=""/>
          <Button label='Connect on Telegram' handler={openLink}></Button>
        </div>
        <div className='flex flex-col pl-32 pr-16 max-md:hidden'>
        <img src={scanQRHero} alt="Scan QR Hero Image" className='self-center w-full max-w-md'
            />
        </div>
      </section>
    </section>
  )
}

export default AddBalance;