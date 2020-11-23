import React, {useEffect, useState, useContext} from 'react' 
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook';
import * as consts from '../data/Consts'

export const SchedulePage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const leftPanelData = consts.LESSONS.filter(i=>i.day === consts.getDayOfWeek(1) || i.day === consts.getDayOfWeek(2) || i.day === consts.getDayOfWeek(3));
    const rightPanelData = consts.LESSONS.filter(i=>i.day === consts.getDayOfWeek(4) || i.day === consts.getDayOfWeek(5));

    useEffect(()=>{
        window.M.updateTextFields();
    }, []);

    useEffect(()=>{
        message(error);
        clearError();
    }, [error, message, clearError]);
    
    return (

        <div className='root'>
        <Clock/>
        <h2 className='caption'>Расписание</h2>
        <div className='wrapper my-flex'>
            <LessonsTable lessons={leftPanelData}/>
            <LessonsTable lessons={rightPanelData}/>
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
  
  
  class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
      
    }
  
    tick() {
      this.setState({
        date: new Date()
      });
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
    
    render() {
      let dateTimeCaption = `${consts.getDayOfWeek(this.state.date.getDay())}, ${this.state.date.getDate()} ${consts.getMonth(this.state.date.getMonth())} - ${this.state.date.toLocaleTimeString()}`;
      return (
        <div className='wrapper'>
          <h2>{`${dateTimeCaption}`}</h2>
        </div>
      );
    }
  }
  
  