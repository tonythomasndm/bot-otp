import Sidebar from "../components/Sidebar";
import { servers,services } from "../constants";
import serverIcon from "../assets/icons/server-icon.svg";
import React, { useState } from "react";
import Button from "../components/Button";

//Need to work on responsiveness
const BuyNumber = () => {
  const [selectedServer, setSelectedServer] = useState(0);
  const [selectedService, setSelectedService] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [message, setMessage] = useState("There is no message yet");
  const boughtNumber = () => {

  }
  const nextSMS = () => {
  }

  const cancelOptions = () => {
    setSelectedServer(0);
    setSelectedService(0);
  }
  return (
    <section className="flex flex-row pt-24">
      <Sidebar/>
      <section className="flex flex-col justify-center w-full pt-24 padding-r max-container padding-l wide:padding-r padding-b">
        <div className="w-full max-w-[1000px] gap-8 card items-start">
          <div className="w-full gap-6">
            <h3 className="text-2xl font-semibold tracking-wide text-left">1. Select Server</h3>
            <ul className="grid w-full grid-cols-2 mt-5 max-sm:grid-cols-1 max-sm:grid-flow-row">
              {servers.map((server, index) => (
                <li key={index} className={`flex flex-row items-center justify-start w-full gap-5 py-4 mx-2 max-w-[400px] my-4 text-lg font-semibold leading-none tracking-wider ${selectedServer==index+1 ?`bg-blue-500 text-white`:` bg-blue-100 hover:bg-blue-500 hover:text-white`} px-7 rounded-xl `} onClick={() => setSelectedServer(index+1)}>
                
                  <span>{index+1}.</span>
                  <img src={serverIcon} className="text-white bg-white" alt="Server Icon" />
                  <span>{server.label}</span>

                
                </li>
              ))}
            </ul>
        </div>
        <div className="w-full gap-6">
            <h3 className="text-2xl font-semibold tracking-wide text-left">2. Select Service</h3>
            <ul className="grid w-full grid-cols-2 mt-5 max-sm:grid-cols-1 max-sm:grid-flow-row">
              {services.map((service, index) => (
                <li key={index} className={`flex flex-row items-center justify-start w-full gap-5 py-4 mx-2 max-w-[400px] my-4 text-lg font-semibold leading-none tracking-wider ${selectedService==index+1 ?`bg-blue-500 text-white`:` bg-blue-100 hover:bg-blue-500 hover:text-white`} px-7 rounded-xl `} onClick={() => setSelectedService(index+1)}>
                  <span>{index+1}.</span>
                  {service.icon}
                  <span>{service.label}</span>
                </li>
              ))}
            </ul>
        </div>
        <div className="flex flex-row gap-6 max-sm:flex-col">
        <Button label="Buy a Number" handler={boughtNumber}></Button>
        <button className="text-black bg-transparent border-2 button border-primary" onClick={cancelOptions}>Cancel</button>
        </div>
        <div className="w-full gap-6">
            <h3 className="text-2xl font-semibold tracking-wide text-left">3. Phone Number</h3>
            <div className="py-4 text-left text-black bg-blue-100 mt-9 button">{phoneNumber}</div>
        </div>
        <div className="w-full gap-6">
            <h3 className="text-2xl font-semibold tracking-wide text-left">4. Waiting for SMS</h3>
            <div className="py-4 text-left text-black bg-blue-100 mt-9 flex items-start justify-start text-lg leading-none rounded-xl min-w-[700px] max-sm:min-w-[300px] w-full min-h-[300px] px-7 font-[500]">{message}</div>
        </div>
        <div className="flex flex-row gap-6">
        <Button label="Next SMS" handler={nextSMS}></Button>
        
        </div>

        </div>
      </section>
    </section>
  )
}

export default BuyNumber;