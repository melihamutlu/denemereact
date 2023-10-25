// Task.tsx
import React, { useState, useEffect, ChangeEvent} from 'react';
// changeevent değişkeni close buttonunu çalıştırmak için ekledim.
export interface TaskItem {
  Name: string;
  Description: string;
}

interface TaskProps {
  taskObj: TaskItem;
  onSave: (task: TaskItem) => void;
  onCancel: () => void;
  onDelete: (index: number) => void;
  taskList: TaskItem[]; // tasklist propu tanımlandı
  setTaskList: (taskList: TaskItem[]) => void;
}

const Task: React.FC<TaskProps> = ({ taskObj, onSave, onCancel, onDelete, taskList, setTaskList }) => {
  const [editedTask, setEditedTask] = useState(taskObj);
  const [initialTask, setInitialTask] = useState(taskObj);
  const [isEditing, setIsEditing] = useState(false); // Düzenleme ekranının açık/kapalı olduğunu takip etmek için bir durum değişkeni


  useEffect(() => {
    setEditedTask(taskObj);
    setInitialTask(taskObj);
  }, [taskObj]);

  const handleSave = () => {
    onSave(editedTask);
    
  };
 

  /*const handleClose = () => {
    // Eğer değişiklik yapıldıysa kullanıcıyı uyar
    if (initialTask) {
      const confirmClose = window.confirm("Değişiklikleri kaydetmeden kapatmak istediğinize emin misiniz?");
      if (!confirmClose) {
        return;
      }
    }

    onCancel();
  };*/

  const handleDelete = () => {
    // İlgili görevi taskList'ten kaldırmak için bir işlev yazmalısınız
    const updatedTaskList = taskList.filter((task) => task !== taskObj);
    setTaskList(updatedTaskList);
    localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
  };
  

  const handleCancel = () => {
    if (isEditing) {
      // Eğer düzenleme ekranı açıksa, düzenlemeyi iptal etmek ve ekranı kapatmak için gerekli işlemleri yapın
      setEditedTask(initialTask); // Değişiklikleri iptal et
      setIsEditing(false); // Düzenleme ekranını kapat
    } else {
      // Düzenleme ekranı kapalıysa, sadece düzenleme ekranını kapat
      onCancel();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedTask({
      ...editedTask,
      [name]: value,
    });
  };
  
  return (
    <div className="task">
      <div className="task-header">
        <button className="delete-button" onClick={handleDelete}>
          <i className="fa fa-trash close-icon"></i>
        </button>
      </div>
      <div className="input-container">
        <input
          type="text"
          name="Name"
          value={editedTask.Name}
          onChange={handleInputChange}
        />
      </div>
      <div className="textarea-container">
        <textarea
          rows={5}
          name="Description"
          value={editedTask.Description}
          onChange={handleInputChange}
        />
      </div>
      <div className="action-buttons">
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default Task;

function setIsEditing(arg0: boolean) {
  throw new Error('Function not implemented.');
}
