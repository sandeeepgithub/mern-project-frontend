import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  MenuItem,
  Menu,
  IconButton,
} from '@mui/material/';
import { AccountCircle } from '@mui/icons-material';
import { useHistory, useLocation } from 'react-router-dom';

export default function NavbarComponent({ logoutHandler }) {
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [navbarOption, setNavbarOption] = useState('home');
  const history = useHistory();
  const location = useLocation();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutHandlerFunction = () => {
    setAnchorEl(null);
    logoutHandler();
  };

  const changeRouterHandler = () => {
    setAnchorEl(null);
    if (location.pathname === '/profile') {
      setNavbarOption('home');
      history.push('/');
    } else if (location.pathname === '/') {
      setNavbarOption('profile');
      history.push('/profile');
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" sx={{ background: 'transparent', zIndex: 1 }}>
        <Toolbar sx={{ justifyContent: 'right' }}>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {navbarOption === 'home' ? (
                  <MenuItem onClick={changeRouterHandler}>Profile</MenuItem>
                ) : (
                  <MenuItem onClick={changeRouterHandler}>Home</MenuItem>
                )}
                <MenuItem onClick={logoutHandlerFunction}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
