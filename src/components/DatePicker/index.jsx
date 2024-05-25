import moment from 'moment';
import React, { forwardRef, useState } from 'react'
import DatePicker  from 'react-multi-date-picker';

const DayPicker = ({value,onChange}) => {

    const ExampleCustomInput = ({openCalendar})=> (
        <button className="btn bg-opacity-20 backdrop-filter backdrop-blur-md border border-opacity-30 border-white rounded-lg shadow-md w-full" onClick={openCalendar}>
          {moment(value).format("YYYY-MM-DD") }
        </button>
      );
  return (
    <DatePicker value={`${value}`} onChange={onChange} render={<ExampleCustomInput/>} />
  )
}

export default DayPicker