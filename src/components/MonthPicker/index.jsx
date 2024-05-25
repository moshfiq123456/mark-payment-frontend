import React, { forwardRef } from 'react'
import './styles.scss'
import DatePicker, { Calendar } from 'react-multi-date-picker';
import moment from 'moment';

const MonthPicker = ({value,onChange}) => {
  console.log(value,"tony")
  const ExampleCustomInput = ({openCalendar})=> (
    <button className="btn bg-opacity-20 backdrop-filter backdrop-blur-md border border-opacity-30 border-white rounded-lg shadow-md w-full" onClick={openCalendar}>
      { moment(value).format("YYYY-MM")}
    </button>
  );
  return (
    <DatePicker value={value} onChange={(date)=> onChange(date)} render={<ExampleCustomInput/>} onlyMonthPicker/>
  )
}

export default MonthPicker