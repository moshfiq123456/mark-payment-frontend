import React, { forwardRef } from 'react'

import './styles.scss'
import DatePicker, { Calendar } from 'react-multi-date-picker';

const YearPicker = ({value,onChange}) => {

  const ExampleCustomInput = ({openCalendar})=> (
    <button className="btn bg-opacity-20 backdrop-filter backdrop-blur-md border border-opacity-30 border-white rounded-lg shadow-md w-full" onClick={openCalendar}>
      {value}
    </button>
  );

  return (
    <DatePicker value={value} onChange={(date)=> onChange(date)} render={<ExampleCustomInput/>} onlyYearPicker/>
  )
}

export default YearPicker