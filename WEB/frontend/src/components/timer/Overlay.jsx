import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { IconButton, Popper } from '@mui/material';
import { useState } from 'react';
import Clock from './Clock';

const Overlay = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event =>
    setAnchorEl(anchorEl ? null : event.currentTarget);

  const open = Boolean(anchorEl);
  const id = open ? 'timer-popper' : undefined;

  return (
    <>
      <TimerOutlinedIcon />
      <TimerOutlinedIcon />
      <IconButton
        component="button"
        aria-describedby={id}
        onClick={handleClick}
      >
        <TimerOutlinedIcon />
      </IconButton>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Clock />
      </Popper>
    </>
  );
};

export default Overlay;