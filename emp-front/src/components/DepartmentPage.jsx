import { useState } from "react";
import DepBottomSection from "./DepBottomSection.jsx";
import TopBoard from "./TopBoard.jsx";


function DepartmentPage(){

    const [sideToggle,setsideToggle]=useState(false);
    const [darkToggle,setdarkToggle]=useState(false);

    return <div className="w-full h-full bg-gray-100 dark:bg-zinc-500" id="landing-page">
        <TopBoard sideToggle={sideToggle} setsideToggle={setsideToggle} darkToggle={darkToggle} setdarkToggle={setdarkToggle}/>
        <DepBottomSection sideToggle={sideToggle} setsideToggle={setsideToggle}/>
      </div>
  }
  
  export default DepartmentPage;