import React from "react";
import { FormatDate } from "../../utils/dateFormater";
import DayPicker from "../DatePicker";
import MonthPicker from "../MonthPicker";
import YearPicker from "../YearPicker";
import moment from "moment";

const DateFilterTab = ({ currentTab, setCurrentTab,date,handleDate,handleFilterType }) => {
  const tabs = [
    { id: 1, label: 'Day' },
    { id: 2, label: 'Month' },
    { id: 3, label: 'Year' }
  ];
  console.log(date,'abc',currentTab)
  return (
    <div className=" flex flex-col gap-5">
        <div role="tablist" className="tabs tabs-bordered">
            {tabs.map(tab => (
              <a
                key={tab.id}
                role="tab"
                className={`tab ${tab.id === currentTab ? 'tab-active' : ''}`}
                onClick={() => setCurrentTab(tab.id)} // Update currentTab when clicked
              >
                {tab.label}
              </a>
            ))}
        </div>
        {currentTab === 1 ? <DayPicker value={date.date} onChange={(e)=>handleDate({date:e.format("YYYY-MM-DD"), filterType:"day" })}/>:<></> }
        {currentTab === 2 ? <MonthPicker value={date.date} onChange={(e)=>handleDate({date:e.format("YYYY-MM"),filterType:"month"})}/>:<></> }  
        {currentTab === 3 ? <YearPicker value={date.date} onChange={(e)=>handleDate({date:e.format("YYYY"),filterType:"year"})}/>:<></> }      
    </div>
    
  );
};

export default DateFilterTab;
