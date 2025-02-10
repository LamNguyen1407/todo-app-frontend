import { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import { addToDo, getAllToDo, updateToDo,deleteToDo } from "./utils/HandleApi";

function App() {

  const [toDo, setToDo] = useState([])

  const [text, setText] = useState("")

  const [isUpdating, setIsUpdating] = useState(false)

  const [toDoId, setToDoId] = useState("")

  const [dateTime, setDateTime] = useState("")

  const [error, setError] = useState("")

  useEffect(() => {
    getAllToDo(setToDo)
  },[])

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  }

  const handleAddOrUpdate = () => {
    if(isUpdating){
      if(!text){
        setError("Vui lòng nhập công việc cần chỉnh sửa!"); // 🚨 Hiển thị lỗi
        return;
      }
      setError("");
      //tim todo hien tai de lay dateTime cu neu khong nhap dateTime moi
      const currentToDo = toDo.find((item) => item._id === toDoId);
      const updatedDateTime = dateTime || (currentToDo ? currentToDo.dateTime : "");

      updateToDo(toDoId, updatedDateTime , setDateTime, text, setToDo, setText, setIsUpdating);
    }
    else {
      if(!text){
        setError("Vui lòng nhập công việc thêm mới!"); // 🚨 Hiển thị lỗi
        return;
      }
      if(!dateTime){
        setError("Vui lòng nhập thời gian thêm mới!"); // 🚨 Hiển thị lỗi
        return;
      }
      setError("");
      addToDo(text,dateTime,setDateTime,setText,setToDo);
    }
  }


  return (
    <div className="App">

      <div className="container">
        <h1>TODO APP FOR KIM LOI  ❤️ ❤️ ❤️ </h1>

        <div className="top">
          <input type="text"
           placeholder="Add ToDo..."
           value={text}
           onChange={(e) => setText(e.target.value)}
           >
            
           </input>

           <input type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
           />

          <div 
          className="add" 
          onClick={ handleAddOrUpdate}>
            {isUpdating ? "Update" : "Add"}
          </div>
        </div>

         {/* 🛑 Hiển thị lỗi nếu có */}
         {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <div className="list">
          {toDo.map((item) => <ToDo 
          key={item._id} 
          text={item.text}
          dateTime={item.dateTime}
          updateMode={() => updateMode(item._id, item.text, item.dateTime)}
          deleteToDo={() => deleteToDo(item._id, setToDo)}
          >

          </ToDo>)}
        </div>
      </div>


    </div>
  );
}

export default App;
