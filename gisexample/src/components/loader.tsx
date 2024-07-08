import React, { useState } from 'react';
import axios from 'axios';


import { useAppSelector } from '../redux/hooks';



function FileUploadComponent(){
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null); // Установите null, если файл не выбран
    }
  };


  const way = useAppSelector(state => state.way);


  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('Файл успешно загружен!');
          // Добавьте обработку успешной загрузки (например, очистка состояния, показ сообщения)
        } else {
          console.error('Ошибка загрузки файла!');
          // Добавьте обработку ошибки (например, показ сообщения об ошибке)
        }
      } catch (error) {
        console.error('Ошибка запроса:', error);
        // Добавьте обработку ошибки запроса (например, показ сообщения об ошибке)
      }
    } else {
      console.error('Выберите файл для загрузки!');
    }
  };

  return (
    <div>
        <p>Random Number from Store: {way}</p>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!selectedFile}>
        Загрузить файл
      </button>
    </div>
  );
};

export default FileUploadComponent;
