import React, { useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '../redux/hooks';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


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


  const port = 3000; // Пример порта, который вы хотите использовать

  const instance = axios.create({
    baseURL: 'http://localhost:5000'
  });
  
  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
  
      try {
        const response = await instance.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
  
        console.log('Файл успешно загружен!');
        // Добавьте обработку успешной загрузки (например, очистка состояния, показ сообщения)
      } catch (error) {
        console.error('Ошибка загрузки файла:', error);
        // Добавьте обработку ошибки загрузки (например, показ сообщения об ошибке)
      }
    } else {
      console.error('Выберите файл для загрузки!');
    }
  };

  return (
    <div>
        <p></p>

      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        onClick={handleUpload} 
        // disabled={!selectedFile}
      
      >

        Upload file
        <VisuallyHiddenInput 
          type="file"
           onChange={handleFileChange}
        />

      </Button>








    </div>
  );
};

export default FileUploadComponent;





