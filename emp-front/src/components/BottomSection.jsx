import SideBar from "./SideBar";
import HomePage from "./HomePage";

function BottomSection(props){
    return <div className="flex">
            <HomePage/>
            <SideBar sideToggle={props.sideToggle} setsideToggle={props.setsideToggle}/>

    </div>

}

export default BottomSection;