import React, { useContext, useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { AppContext } from '../../App';
import { Theme } from '../Theme';
import { getSixMonths, getSixMonthsData } from '../Shared/Functions';

const Line = ({ data, color }) => {

  const { themeToggler } = useContext(AppContext)


  const getSixMonthsData = (months) => {
    if(months === undefined) return [0,0,0,0,0,0]
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentMonthIndex = currentMonth; // example current month index (February)
  
    const next_array = months.slice(currentMonthIndex + 1, months.length)
    const pre_array = months.slice(0, currentMonthIndex + 1)
  
    const newMonths = [...next_array, ...pre_array]
  
    console.log(newMonths);
  
    return newMonths.slice(newMonths.length - 6, newMonths.length)
  
  }
  // console.log(getSixMonthsData(data));
  console.log(data);


  const series = [{
    name: 'series1',
    data: getSixMonthsData(data)
  }]
  const options = {

    grid: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: [color],
    stroke: {
      curve: 'smooth',
      width: '2'
    },
    xaxis: {
      show: false,
      type: 'month',
      categories: getSixMonths(),
      labels: {
        style: {
          colors: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
        }
      }
    },
    ApexTheme: {
      mode: themeToggler ? 'dark' : 'light'
      // mode : 'dark' 
    },
    yaxis: {
      show: false
    },


    // tooltip: {
    //   enabled : false,
    //   x: {
    //     format: 'month'
    //   },
    // },
  }



  return (
    <>
      <ReactApexChart options={options} series={series} type="area" width={'100%'} />
    </>
  )
}

export default Line