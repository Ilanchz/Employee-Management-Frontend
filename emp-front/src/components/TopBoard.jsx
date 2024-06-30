import Tools from "./Tools";

function TopBoard(props){

    const sideToggle=props.sideToggle;
    const setsideToggle=props.setsideToggle;
    //darkToggle={darkToggle} setdarkToggle={setdarkToggle}
    const darkToggle=props.darkToggle;
    const setdarkToggle=props.setdarkToggle;

    

    return <div className="dark:bg-blue-950 w-full h-24 flex items-center justify-between bg-blue-300 text-black text-3xl p-5 rounded-b-3xl">
        <a href="/" className="flex items-center gap-4 dark:text-gray-100 text-3xl font-bold italic"><svg class="w-10 h-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 9h3m-3 3h3m-3 3h3m-6 1c-.306-.613-.933-1-1.618-1H7.618c-.685 0-1.312.387-1.618 1M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm7 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/>
</svg>Employee Management System</a>
        
        <Tools sideToggle={sideToggle} setsideToggle={setsideToggle} darkToggle={darkToggle} setdarkToggle={setdarkToggle}/>


    </div>
}

export default TopBoard;