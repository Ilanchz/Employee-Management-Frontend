import { useState } from "react";
import BottomSection from "./BottomSection.jsx";
import TopBoard from "./TopBoard.jsx";


function LandingPage(){

    const [sideToggle,setsideToggle]=useState(true);
    const [darkToggle,setdarkToggle]=useState(false);

    return <div className="w-full h-full bg-gray-100 dark:bg-zinc-500" id="landing-page">
        <TopBoard sideToggle={sideToggle} setsideToggle={setsideToggle} darkToggle={darkToggle} setdarkToggle={setdarkToggle}/>
        <BottomSection sideToggle={sideToggle} setsideToggle={setsideToggle}/>
      </div>
  }
  
  export default LandingPage;