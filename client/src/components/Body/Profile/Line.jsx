import React, { useContext } from 'react'
import ReactApexChart from 'react-apexcharts'
import { AppContext } from '../../../App';
import { Theme } from '../../Theme';

const Line = ({data,color}) => {

  const {themeToggler} = useContext(AppContext)


        const  series = [{
            name: 'series1',
            data: data
          }]
        const  options = {
            
            grid : {
                show : false
            },
            dataLabels : {
                enabled : false
            },
            legend : {
              show : false
            },
            chart: {
              height: 100,
              type: 'line',
              toolbar : {
                show : false
              }
            },
            dataLabels: {
              enabled: false
            },
            colors : [color],
            stroke: {
              curve: 'smooth',
              width : '2'
            },
            xaxis: {
              show : false,
              type: 'month',
              categories: ['Jan','Frb','Mar', 'Apr', 'May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
              labels : {
                style : {
                  colors : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
                }
              }
            },
            ApexTheme : {
              mode : themeToggler ? 'dark' : 'light'
              // mode : 'dark' 
            },
            yaxis : {
            //   show : false
            tickAmount : 3,
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
    <ReactApexChart options={options} series={series} type="area" width={'100%'}/>
    </>
  )
}

export default Line