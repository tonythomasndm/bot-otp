import Sidebar from "../components/Sidebar";
import { getApiEndpoint, servers,services } from "../constants";
import serverIcon from "../assets/icons/server-icon.svg";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";



//Need to work on responsiveness
const BuyNumber = () => {
  const [selectedServer, setSelectedServer] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [message, setMessage] = useState("There is no message yet");
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [serverEndpoint,setServerEndpoint]  = useState("");
  const [numberId, setNumberId] = useState(null);

  const nextSMS = () => {
  }

  const cancelOptions = () => {
    setSelectedServer(0);
    setSelectedService(0);
  }

  const handleServerClick = async (server) => {
    // setSelectedServer(value);
    console.log(server);
  
    try {
      // Find the selected server by value
      setServerEndpoint(server.apiEndpoint);
      console.log(serverEndpoint);
      console.log('HYY') 
      try {
        const response = await fetch(`http://localhost:8081/services${server.value}`);
        const data = await response.json();
        setServices(data);
      } 
      catch (error) {
        console.error('Error fetching services:', error);
      }
    } catch (error) {
      console.error('Error fetching data from server:', error);
    }
  };

  const handleServiceClick = (serviceCode) => {
    setSelectedService(serviceCode);
    // Store the service code in the state or perform any additional actions as needed
    // For now, let's just log the service code
    console.log('Selected Service Code:', serviceCode);
  };

  const getNumber = async(serverEndpoint,selectedService) => {
    console.log(serverEndpoint);
    const apiEndpoint = `${serverEndpoint}&action=getNumber&service=${selectedService}&country=22`;
    console.log({apiEndpoint});
    try {
      // Make an API call to get the number
      const response = await fetch(apiEndpoint);
      const data = await response.text(); // Assume the response is text
  
      // Extract parts from the response
      const [extractedNumberId, extractedPhoneNumber] = data.split(':').slice(1)
  
      // Update the state with the obtained phone number
      setNumberId(extractedNumberId);
      setPhoneNumber(extractedPhoneNumber);
  
      // Start fetching status recursively
      getStatus(serverEndpoint, numberId);
    } catch (error) {
      console.error('Error fetching number:', error);
  
      // Placeholder for the error message
      setMessage('Error obtaining number. Please try again.');
    }
    
  };
  
  const getStatus = async (serverEndpoint, numberId) => {
    const statusEndpoint = `${serverEndpoint}&action=getStatus&id=${numberId}`;

    try {
      // Make an API call to get the status
      const response = await fetch(statusEndpoint);
      const data = await response.text(); // Assume the response is text

      // Update the state with the obtained status
      setMessage(data);

      // Fetch status again after 2 seconds
      setTimeout(() => {
        getStatus(serverEndpoint, numberId);
      }, 2000);
    } catch (error) {
      console.error('Error fetching status:', error);

      // Placeholder for the error message
      setMessage('Error obtaining status. Please try again.');
    }
  };

  return (
    <section className="flex flex-row pt-24">
      <Sidebar/>
      <section className="flex flex-col justify-center w-full pt-24 padding-r max-container padding-l wide:padding-r padding-b">
        <div className="w-full max-w-[1000px] gap-8 card items-start">
          <div className="w-full gap-6">
            <h3 className="text-2xl font-semibold tracking-wide text-left">1. Select Server</h3>
            <ul className="grid w-full grid-cols-2 mt-5 max-sm:grid-cols-1 max-sm:grid-flow-row">
              {servers.map((server) => (
              <li
                key={server.value}
                className={`flex flex-row items-center justify-start w-full gap-5 py-4 mx-2 max-w-[400px] my-4 text-lg font-semibold leading-none tracking-wider ${
                  selectedServer === server.value ? 'bg-blue-500 text-white' : 'bg-blue-100 hover:bg-blue-500 hover:text-white'
                } px-7 rounded-xl `}
                onClick={() => handleServerClick(server)}
              >
                <span>{server.value}.</span>
                <img src={serverIcon} className="text-white bg-white" alt="Server Icon" />
                <span>{server.label}</span>
              </li>
            ))}
            </ul>
        </div>
        <div className="w-full gap-6">
            <h3 className="text-2xl font-semibold tracking-wide text-left">2. Select Service</h3>
            <ul className="grid w-full grid-cols-2 mt-5 max-sm:grid-cols-1 max-sm:grid-flow-row">
            {services.map((service) => (
              <li
                key={service.id}
                className={`flex flex-row items-center justify-start w-full gap-5 py-4 mx-2 max-w-[400px] my-4 text-lg font-semibold leading-none tracking-wider ${
                  selectedService === service.id ? 'bg-blue-500 text-white' : 'bg-blue-100 hover:bg-blue-500 hover:text-white'
                } px-7 rounded-xl `}
                onClick={() => handleServiceClick(service.servicecode)}
              >
                <span>{service.id}.</span>
                {/* Display service-specific data */}
                <span>{service.servicename}</span>
                <span>{`$${service.price}`}</span>
                {/* Add more details as needed */}
              </li>
            ))}
            </ul>
        </div>
        <div className="flex flex-row gap-6 max-sm:flex-col">
        <Button label="Buy a Number" onClick={() => {getNumber(serverEndpoint,selectedService)}}></Button>
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