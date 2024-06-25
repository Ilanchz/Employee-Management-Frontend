import { useState } from "react";
import BottomSection from "./BottomSection.jsx";
import TopBoard from "./TopBoard.jsx";


function LandingPage(){

    const [sideToggle,setsideToggle]=useState(true);

    return <div className="w-full h-full bg-gray-100">
        <TopBoard sideToggle={sideToggle} setsideToggle={setsideToggle}/>
        <BottomSection sideToggle={sideToggle} setsideToggle={setsideToggle}/>
      </div>
  }
  
  export default LandingPage;