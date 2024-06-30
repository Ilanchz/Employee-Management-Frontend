import OrgSideBar from "./OrgSideBar";
import OrganisationCardPage from "./OrganisationCardPage";

function OrgBottomSection(props){
    return <div className="flex">
            <OrganisationCardPage PieChartData={props.PieChartData} setPieChartData={props.setPieChartData}/>
            <OrgSideBar sideToggle={props.sideToggle} setsideToggle={props.setsideToggle} PieChartData={props.PieChartData} setPieChartData={props.setPieChartData}/>
    </div>

}

export default OrgBottomSection;