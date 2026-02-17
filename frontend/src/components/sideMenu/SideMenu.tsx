import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import styles from './SideMenu.module.scss';

interface SideMenuProps {
  open: boolean;
  projection: string;
  onProjectionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
}

export default function SideMenu({ open, projection, onProjectionChange, onClose }: SideMenuProps) {
  return (
    <nav className={`${styles.sideMenu} ${open ? styles.open : ''}`}>
      <div className={styles.toolbar}>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon sx={{ color: 'rgba(var(--text-primary))' }} />
        </IconButton>
      </div>
      <Divider />
      <FormControl component="fieldset" className={styles.radioGroupContainer}>
        <FormLabel component="legend">Projection</FormLabel>
        <RadioGroup
          aria-label="projection"
          name="projection-radio-group"
          value={projection}
          onChange={onProjectionChange}
          defaultValue="Lambert Conic"
        >
          <FormControlLabel value="WGS84" control={<Radio />} label="WGS84" />
          <FormControlLabel value="Lambert Conic" control={<Radio />} label="Lambert Conic" />
        </RadioGroup>
      </FormControl>
    </nav>
  );
}