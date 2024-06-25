import React from "react";

function SideBar(props) {
  return props.sideToggle ? (
    <div className="sm:w-1/5 h-screen bg-gray-800 text-white rounded-3xl p-5 float-right">
      Under Construction. Please Suggest Features...
    </div>
  ) : (
    <div className="hidden"></div>
  );
}

export default SideBar;
