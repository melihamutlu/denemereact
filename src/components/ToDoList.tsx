// TodoList.tsx
import React, { useEffect, useState } from 'react';
import Card from './Card';
import CreateTaskPopup from '../modals/CreateTask';
import 'font-awesome/css/font-awesome.min.css';
import '../App.css';

interface TaskItem {
  Name: string;
  Description: string;
}

const TodoList: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState<TaskItem[]>([]);

  useEffect(() => {
    const arr = localStorage.getItem("taskList");

    if (arr) {
      const obj = JSON.parse(arr);
      setTaskList(obj);
    }
  }, []);

  const deleteTask = (index: number) => {
    const updatedList = [...taskList];
    updatedList.splice(index, 1);
    localStorage.setItem("taskList", JSON.stringify(updatedList));
    setTaskList(updatedList);
  };

  const updateListArray = (editedTask: TaskItem, index: number) => {
    const updatedList = [...taskList];
    updatedList[index] = editedTask;
    localStorage.setItem("taskList", JSON.stringify(updatedList));
    setTaskList(updatedList);
  };

  const toggle = () => {
    setModal(!modal);
  };

  const saveTask = (taskObj: TaskItem) => {
    const updatedList = [...taskList];
    updatedList.push(taskObj);
    localStorage.setItem("taskList", JSON.stringify(updatedList));
    setTaskList(updatedList);
    setModal(false);
  };

  return (
    <>
      <div className="header text-center" style={{ backgroundColor: "transparent" }}>
      <h3 style={{ fontWeight: "bold" }}>ToDo List</h3>
      <button className="btn btn-primary mt-2" onClick={() => setModal(true)}>Create Task</button>
      </div>
      <div className="task-container">
        {taskList.map((obj, index) => (
          <Card
            key={index}
            taskObj={obj}
            index={index}
            deleteTask={() => deleteTask(index)}
            updateListArray={(editedTask: TaskItem) => updateListArray(editedTask, index)}
            taskList={taskList}
            setTaskList={setTaskList}
          />
        ))}
      </div>
      <CreateTaskPopup toggle={() => setModal(!modal)} modal={modal} save={saveTask} />
    </>
  );
};

export default TodoList;
