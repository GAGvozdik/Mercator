import React, { useState, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import IconButton from '@mui/material/IconButton';

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
              <IconButton>
                <FileUploadIcon onClick={handleClose} />
              </IconButton>
                
                <IconButton>
                  <DeleteIcon onClick={handleClose} />
                </IconButton>

                <IconButton>
                  <DriveFileRenameOutlineIcon onClick={handleClose} />
                </IconButton>
            </>

          }
          placement="right"
          slotProps={{
            tooltip: {
              sx: {
                color: "#514E6A",
                backgroundColor: "#E8E8E8",
              },
            },
          }}

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

