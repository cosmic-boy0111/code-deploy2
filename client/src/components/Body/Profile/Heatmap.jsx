import React, { useContext } from 'react'
import CalendarHeatmap from 'react-calendar-heatmap';

import 'react-calendar-heatmap/dist/styles.css';
import { AppContext } from '../../../App'
import { Theme } from '../../Theme'


const Heatmap = () => {

  const { themeToggler } = useContext(AppContext)


  const today = new Date();

  const randomValues = getRange(365).map(index => {
    return {
      date: shiftDate(today, -index),
      count: getRandomInt(0, 3),
    };
  });


  function shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }

  function getRange(count) {
    return Array.from({ length: count }, (_, i) => i);
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }



  return (
    <>
      <div style={{
        padding: '.5rem',
        borderRadius: '4px',
        backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
        color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
        border: themeToggler ? Theme.Dark.Border : Theme.Light.Border
      }}>
        <p>Solved Problems</p>
        <CalendarHeatmap
          startDate={shiftDate(today, window.screen.width < '900' ? -150 : -365)}
          endDate={today}
          weekdayLabels={[
            'Son', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
          ]}
          values={randomValues}
          classForValue={value => {
            if (!value) {
              return 'color-empty,borderRadius-4px';
            }
            return `color-github-${value.count}`;
          }}
          tooltipDataAttrs={value => {

            return {
              'data-tip': `${value.date.toISOString().slice(0, 10)} has count: ${value.count
                }`,
            };
          }}
          onMouseOver={(e) => {
            console.log(e);
          }}
          gutterSize={5}
          showWeekdayLabels={false}
          onClick={value => alert(`Clicked on value with count: ${value.count}`)}
        />
      </div>
    </>
  )
}

export default Heatmap