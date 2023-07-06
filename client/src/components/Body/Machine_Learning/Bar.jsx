import { height } from '@mui/system'
import React,{useContext,useEffect,useState} from 'react'
import {Bar, PolarArea, Line} from 'react-chartjs-2'
import { AppContext } from '../../../App'
import { Theme } from '../../Theme'


const Chart = ({title}) => {

    const {themeToggler} = useContext(AppContext)

    const [axis, setAxis] = useState('x');


    // useEffect(() => {
    //   // eslint-disable-next-line no-restricted-globals
    //   if(screen.width <= 600){
    //       setAxis('y')
    //   }else{
    //       setAxis('x')
    //   }
    // }, []);
    
    

    const options = {
        responsive: true,
        plugins: {
          title: {
            display: false,
          },
        },
        legend: {
            display: '',
            color : 'white'
        },
        maintainAspectRatio: false,
        indexAxis: axis,
        scales: {
            x: {
                grid: {
                    display:false,
                    borderColor : 'transparent'
                },
                ticks: {
                    color : 'rgb(148, 164, 196)'
                },
            },
            y: {
                grid: {
                    display:false,
                    borderColor : 'transparent'
                },
                ticks: {
                    color : 'transparent'
                },
            }
        }
      };


    return (
        <div style={{
            
            padding:'8px',
            height:'200px',
            borderRadius:'4px',
            backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
            color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
            // border: themeToggler ? Theme.Dark.Border : Theme.Light.Border
        }}>
            <Line
                options={options}
                data={{
                    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
                    datasets: [{
                        axis : axis,
                        label: title,
                        data: [10,5,30,10,0,0,0,0,0,0,0,0],
                        backgroundColor: 'rgba(0, 127, 255, 0.4)',
                        fill: true,
                        tension: 0.4,
                        borderRadius : 10,
                        borderWidth: 1,
                        pointRadius: 2,
                        borderColor:'rgb(0, 127, 255)'
                    }],
                }}
            />
        </div>
    )
}

export default Chart
