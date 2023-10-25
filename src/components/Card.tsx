// Card.tsx
import React, { useState, ChangeEvent } from 'react';
import {TaskItem} from '../modals/Task';

interface CardProps { // arayüzün işlev ve özellikelri
  taskObj: TaskItem;
  index: number;
  deleteTask: () => void;
  updateListArray: (editedTask: TaskItem) => void; // düzenleme işlevi tamamandığında güncelle
  taskList: TaskItem[];
  setTaskList: (taskList: TaskItem[]) => void; // görev listesini güncelle
}

const Card: React.FC<CardProps> = ({ taskObj, index, deleteTask, updateListArray, taskList, setTaskList }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<TaskItem>(taskObj);

  const colors = [
    {
      primaryColor: "#5D93E1",
      secondaryColor: "#ECF3FC",
    },
    {
      primaryColor: "#F9D288",
      secondaryColor: "#FEFAF1",
    },
    {
      primaryColor: "#5DC250",
      secondaryColor: "#F2FAF1",
    },
    {
      primaryColor: "#F48687",
      secondaryColor: "#FDF1F1",
    },
    {
      primaryColor: "#B964F7",
      secondaryColor: "#F3F0FD",
    },
  ];

  const startEditing = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    const updatedList = taskList.filter((_, i) => i !== index);
    localStorage.setItem("taskList", JSON.stringify(updatedList));
    setTaskList(updatedList);
    // 
  };

  const handleSave = () => {
    updateListArray(editedTask);
    setIsEditing(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedTask({
      ...editedTask,
      [name]: value,
    });
  };

  return (
    <div className="card-wrapper mr-5">
      <div className="card-top" style={{ backgroundColor: colors[index % 5].primaryColor }}></div>
      <div className="task-holder">
        <button className="delete-button" onClick={handleDelete}>
          <i className="fa fa-trash close-icon"></i>
        </button>
        <span className="card-header" style={{ backgroundColor: colors[index % 5].secondaryColor, borderRadius: "10px" }}>
          {isEditing ? (
            <input
              type="text"
              name="Name"
              value={editedTask.Name}
              onChange={handleInputChange}
            />
          ) : (
            editedTask.Name
          )}
        </span>
        <p className="mt-3">
          {isEditing ? (
            <textarea
              rows={5}
              name="Description"
              value={editedTask.Description}
              onChange={handleInputChange}
            />
          ) : (
            editedTask.Description
          )}
        </p>
        <div style={{ position: "absolute", right: "20px", bottom: "20px" }}>
          {isEditing ? (
            <>
              <button onClick={handleSave}>Save</button>
              <button onClick={cancelEditing}>Cancel</button>
            </>
          ) : (
            <>
              <i className="fa fa-pencil edit-icon" onClick={startEditing}></i>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
