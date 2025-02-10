import axios from 'axios'

const baseUrl = "https://todo-app-1-ygdc.onrender.com"

const getAllToDo = (setToDo) => {
    axios
        .get(baseUrl)
        .then(({
            data
        }) => {
            console.log('data ---> ', data);
            setToDo(data)
        })
}

const addToDo = (text, dateTime, setDateTime, setText, setToDo) => {

    axios
        .post(`${baseUrl}/save`, {
            text, dateTime
        })
        .then((data) => {
            console.log(data);
            setText("");
            setDateTime("");
            getAllToDo(setToDo)
        })
}

const updateToDo = (toDoId, dateTime, setDateTime, text, setToDo, setText, setIsUpdating) => {
    axios
        .post(`${baseUrl}/update`, {
            _id: toDoId,
            text,
            ...(dateTime && {dateTime})
        })
        .then((data) => {
            console.log(data);
            setText("");
            setDateTime("");
            setIsUpdating(false);
            getAllToDo(setToDo)
        })
        .catch((err) => console.log(err))
}

const deleteToDo = (toDoId, setToDo) => {
    axios
        .post(`${baseUrl}/delete`, {
            _id: toDoId
        })
        .then((data) => {
            console.log(data);
            getAllToDo(setToDo)
        })
        .catch((err) => console.log(err))
}

export {
    getAllToDo,
    addToDo,
    updateToDo,
    deleteToDo
}