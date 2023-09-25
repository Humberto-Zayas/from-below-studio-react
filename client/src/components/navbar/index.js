import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import GeneralContact from '../GeneralContact';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import fbslogo from '../../images/fbs-red-logo.jpeg'
const pages = ['Home', 'Services', 'Pricing', 'About'];

function ResponsiveAppBar() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [backgroundColor, setBackgroundColor] = React.useState('transparent');
  const [opacity, setOpacity] = React.useState(0);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowSize = window.innerHeight;

      let opacity = window.scrollY;
      // console.log(opacity/windowSize)
      setOpacity(opacity / windowSize * 2)
      // console.log(opacity)
      if (scrollPosition > 300) {
        setBackgroundColor('black');
      } else {
        setBackgroundColor('transparent');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AppBar style={{ background: 'transparent', boxShadow: 'none', backgroundColor: `rgba(0,0,0,${opacity})`, boxShadow: 'inset 0 -1px 0 0 rgb(53 53 53 / 80%)' }} position="fixed">
      <Container maxWidth="lg">
        <Toolbar className="shontainer" disableGutters>
          <img style={{ width: '100px' }} src={fbslogo} alt="From Below Studio" />
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            <div>
              {pages.map((page) => (
                <ScrollLink
                  className="nav-link w-nav-link"
                  to={page}
                  smooth={true}
                  offset={-100}
                  duration={1000}
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.toUpperCase()}
                </ScrollLink>

              ))}
              <a
                className="nav-link w-nav-link"
                onClick={handleOpen}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                CONTACT
              </a>
              <a
                className="nav-link w-nav-link"
                href="tel:609-469-4340"
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                CALL: 609-469-4340
              </a>
            </div>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              sx={{ position: 'absolute', right: 0, top: 10 }}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiPaper-root': {
                  backgroundColor: 'rgba(0,0,0,0.9)', // Set the background color
                  width: '100%',
                  top: '64px !important'
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem className="nav-link" sx={{ padding: 0, fontFamily: 'Lato, sans-serif', textTransform: 'uppercase' }} key={page} onClick={handleCloseNavMenu}>
                  <ScrollLink
                    style={{ width: '100%' }}
                    className="nav-link w-nav-link"
                    to={page}
                    smooth={true}
                    offset={-100}
                    duration={1000}
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page.toUpperCase()}
                  </ScrollLink>
                </MenuItem>
              ))}
              <a
               style={{ width: '100%' }}
                className="nav-link w-nav-link"
                onClick={handleOpen}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                CONTACT
              </a>
              <a
               style={{ width: '100%' }}
                className="nav-link w-nav-link"
                href="tel:609-469-4340"
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                CALL: 609-469-4340
              </a>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <Modal
        sx={{overflow: 'scroll'}}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{mt: 5}}>
          <GeneralContact onClose={handleClose} />
        </Box>
      </Modal>
    </AppBar>
  );
}

export default ResponsiveAppBar;
