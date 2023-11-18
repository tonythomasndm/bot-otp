import Sidebar from "../components/Sidebar";
import { servers } from "../constants";
import serverIcon from "../assets/icons/server-icon.svg";
import { useState } from "react";
const BuyNumber = () => {

  const [selectedServer, setSelectedServer] = useState(0);

  return (
    <section className="flex flex-col pt-24">
      <Sidebar/>
      <section className="flex flex-col justify-center w-full pt-24 padding-r max-container padding-l wide:padding-r padding-b">
        <div className="w-full max-w-[1000px] gap-8 card items-start">
          <div className="w-full gap-6">
            <h3 className="text-2xl font-semibold tracking-wide text-left">Select Server</h3>
            <ul className="grid w-full grid-cols-2 mt-5 max-sm:grid-flow-row">
              {servers.map((server, index) => (
                <li key={index} className="flex flex-row items-center justify-start w-full gap-5 py-4 mx-2 max-w-[400px] my-4 text-lg font-semibold leading-none tracking-wider bg-blue-100 px-7 rounded-xl hover:bg-blue-500 hover:text-white" onClick={() => setSelectedServer(index+1)}>
                  
                  <span>{index+1}.</span>
                  <img src={serverIcon} className="text-black" alt="Server Icon" />
                  <span>{server.label}</span>
                </li>
              ))}
            </ul>
        </div>
        </div>
      </section>
    </section>
  )
}

export default BuyNumber;