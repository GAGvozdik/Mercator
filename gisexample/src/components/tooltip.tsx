import React, { useState, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
// import styles from './tooltip.module.scss';
// import styles from './tooltip.scss';
// import styles from './tooltip.module.css';
// import styles from './tooltip.css';

 const styles = require('./tooltip.module.scss');

const CustomTooltip = ({ children, tooltipText }: { children: React.ReactNode; tooltipText: string }) => {
    const [open, setOpen] = useState(false);
  
    const handleContextMenu = (event: React.MouseEvent) => {
      event.preventDefault();
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);

    };
  

    const [clicked, setClicked] = useState(false);



    return (
      <div className={styles.tooltip} onContextMenu={handleContextMenu}>
        <Tooltip
          open={open}
          title={

            <>
                <FileUploadIcon 
                    onClick={handleClose}
                    
                >
                </FileUploadIcon>

                <DeleteIcon 
                    onClick={handleClose}
                >
                </DeleteIcon>

                <DriveFileRenameOutlineIcon 
                    onClick={handleClose}
                >
                </DriveFileRenameOutlineIcon>
            </>

          }
          placement="right"
          onClose={handleClose}
        >
          <div>
            {children}
          </div>
        </Tooltip>
      </div>
    );
  };
  
  export default CustomTooltip;

