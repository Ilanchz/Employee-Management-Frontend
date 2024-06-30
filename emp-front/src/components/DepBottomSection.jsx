import DepSideBar from "./DepSideBar";
import DepartmentCardPage from "./DepartmentCardPage";

function DepBottomSection(props){
    return <div className="flex">
            <DepartmentCardPage/>
            <DepSideBar sideToggle={props.sideToggle} setsideToggle={props.setsideToggle}/>
    </div>

}

export default DepBottomSection;