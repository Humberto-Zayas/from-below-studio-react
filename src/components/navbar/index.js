import React from "react";

import AppBar from '@mui/material/AppBar';
import { Link } from "react-router-dom";

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import logo from '../../images/fbs-logo-demo.png'
console.log(logo);


// Nav Function Start ///
function Nav() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">Home </Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/bootlegstepper">Bootleg Stepper </Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/stepper">Stepper </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}



export default Nav;



