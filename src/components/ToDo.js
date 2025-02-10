import React from 'react'

import {BiEdit} from "react-icons/bi"
import {AiFillDelete} from "react-icons/ai"

const ToDo = ({text, dateTime, updateMode, deleteToDo}) => {
  return (
    <div className="todo">
        <div className="text">{text}</div>
        <div className="date">{dateTime ? new Date(dateTime).toLocaleString() : "No date set"}</div>
        <div className="icons">
            <BiEdit className='icon' onClick={updateMode}></BiEdit>
            <AiFillDelete className='icon' onClick={deleteToDo}></AiFillDelete>
        </div>
    </div>
  )
}

export default ToDo