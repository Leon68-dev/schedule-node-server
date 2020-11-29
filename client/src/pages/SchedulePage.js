import React, {useEffect, useState, useContext,useCallback} from 'react' 
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook';
import {Loader} from '../components/Loader'
import * as consts from '../data/Consts'

export const SchedulePage = () => {
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const {token} = useContext(AuthContext);
    const [schedule1, setSchedule1] = useState([]);
    const [schedule2, setSchedule2] = useState([]);

    const fetchSchedule1 = useCallback(async () => {
      try {
        const fetched = await request('/api/scheduler/load/1/3', 'GET', null, {
          Authorization: `Bearer ${token}`
        });
        setSchedule1(fetched);
      } catch (e) {}
    }, [token, request]);
  
    const fetchSchedule2 = useCallback(async () => {
      try {
        const fetched = await request('/api/scheduler/load/4/5', 'GET', null, {
          Authorization: `Bearer ${token}`
        });
        setSchedule2(fetched);
      } catch (e) {}
    }, [token, request]);

    useEffect(()=>{
      fetchSchedule1();
      fetchSchedule2();
    }, []);

    useEffect(()=>{
      window.M.updateTextFields();
    }, []);

    useEffect(()=>{
      message(error);
      clearError();
    }, [error, message, clearError]);

    if (loading) {
      return <Loader/>
    }

    return (
        <div className='root'>
        <Clock />
        <h2 className='caption'>Расписание</h2>
          <div className='wrapper my-flex'>
              <LessonsTable lessons={schedule1}/>
              <LessonsTable lessons={schedule2}/>
          </div>
        </div>
    );
   
}

function LessonsTable(props){
  const rows = [];
  let lastDay = null;

  props.lessons.forEach((les)=>{
    if(les.day !== lastDay){
      rows.push(
        <LessonDayRow 
          day={les.day} 
          key={les.day + les.num}/>
      );
    } 

    rows.push(
      <LessonRow 
        lesson={les}
        key={les.day + les.num + les.lesson}/>
    );

    lastDay = les.day;
  });

  return (
    <table >
      <thead>
        <tr>
          <th>№</th>
          <th>Урок</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
  
  
function LessonDayRow(props) {
  const day = props.day;
  return(
      <tr>
        <th colSpan="2">
          <br/>
          <span className='dayofweek'>{day}</span>
        </th>
      </tr>
  );
}


function LessonRow(props) {
  const lesson = props.lesson;
  const num = lesson.num + '. ';
  const name = lesson.name;

  return (
      <tr>
        <td>{num}</td>
        <td>{name}</td>
      </tr>
  );
}

function Clock() {
  const [stateDate, setStateDate] = useState({date: new Date()}) ;

  const tick = () => {
    setStateDate({date: new Date()});
  }
  
  useEffect(()=>{
    const timerID = setInterval(
      () => tick(),
      1000
    );
    return () => clearInterval(timerID);
  });

  const dateTimeCaption = `${consts.getDayOfWeek(stateDate.date.getDay())}, ${stateDate.date.getDate()} ${consts.getMonth(stateDate.date.getMonth())} - ${stateDate.date.toLocaleTimeString()}`;
  return (
    <div className='wrapper'>
      <h2>{`${dateTimeCaption}`}</h2>
    </div>
  );
  

}