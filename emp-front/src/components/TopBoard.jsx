import Tools from "./Tools";

function TopBoard(props){

    const sideToggle=props.sideToggle;
    const setsideToggle=props.setsideToggle;
    //darkToggle={darkToggle} setdarkToggle={setdarkToggle}
    const darkToggle=props.darkToggle;
    const setdarkToggle=props.setdarkToggle;

    

    return <div className="dark:bg-blue-950 w-full h-24 flex items-center justify-between bg-blue-300 text-black text-3xl p-5 rounded-b-3xl">
        <a href="/" className="dark:text-gray-100 text-3xl font-bold italic">Employee Management System</a>
        
        <Tools sideToggle={sideToggle} setsideToggle={setsideToggle} darkToggle={darkToggle} setdarkToggle={setdarkToggle}/>


    </div>
}

export default TopBoard;