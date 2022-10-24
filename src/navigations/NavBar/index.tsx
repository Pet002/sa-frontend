import { Toolbar, IconButton, Typography, Box, Badge, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import React, { useEffect } from 'react'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { EmployeeInterface } from '../../models/IEmployee';
import { Link as RouterLink } from "react-router-dom";


const drawerWidth = 240;

export default function Navbar({ open, onClick }: any) {

  const [employee, setEmployee] = React.useState<Partial<EmployeeInterface>>({})

  interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const navigator = useNavigate();
  const handleSignOutClick = (e: any) => {
    localStorage.clear()
    navigator('/')
    window.location.reload()
  }

  const apiUrl = "http://localhost:8080"

  const reqOptGet = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    }
  }

  useEffect(() => {
    const getEmployee = () => {
      fetch(`${apiUrl}/employee/${localStorage.getItem("uid")}`, reqOptGet)
        .then((res) => res.json())
        .then((res) => {
          if (res.data) {
            setEmployee(res.data)
          } else {
            console.log("else")
          }
        })
    }

    getEmployee()

  }, [])


  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onClick}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            color="primary"
          >
            Welcome to Medicine System
          </Button>
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex' }}>
          <Button size="large" color="inherit" onClick={handleSignOutClick} variant='outlined'>
            <Badge color="error">
              <Typography>
                {employee.Name + "  " + employee.Surname}
              </Typography>
              <ExitToAppIcon />
            </Badge>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
