import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'; // Import Grid from @mui/material
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import GeneralContact from '../GeneralContact';
import PropTypes from 'prop-types';

// ... rest of the imports ...

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Pricing() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='section pricing' id="Pricing">
      <Container style={{ textAlign: 'center' }} maxWidth="lg">
        <h3 className='heading-13'>PRICING</h3>
        <p className='text-block-13'>
          Rates apply for single recording sessions and mixing services. Bundle packages available as well.
        </p>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
            <Tabs TabIndicatorProps={{ style: { background: 'red' } }} value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab style={{
                color: 'white', fontFamily: `Dosis, sans-serif`,
                fontWeight: 600
              }} label="Recording" {...a11yProps(0)} />
              <Tab style={{
                color: 'white', fontFamily: `Dosis, sans-serif`,
                fontWeight: 600
              }} label="Mixing" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Grid container spacing={2}>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <ul style={{ listStyleType: 'none', paddingLeft: '0', textAlign: 'center' }} className='recording-pricing-1-desktop'>
                  <li className="first-item-title list-item-2">
                    Standard rate
                  </li>
                  <li className="item-pricing list-item-2">
                    $50/HOUR*<br /><span className="text-span-7">*$75/Hour for 3 or more artists</span>
                  </li>
                  <li className="list-item-2" >
                    Minimum 2 Hours
                  </li>
                  <li className="list-item-2" >
                    Industry Quality Recording
                  </li>
                  <li className="list-item-2">
                    Raw Mix Available
                  </li>
                  <li onClick={handleOpen} className="last-item-button list-item-2" >
                    <span onClick={handleOpen} className="text-span-8">CONTACT</span>
                  </li>
                </ul>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <ul style={{ listStyleType: 'none', paddingLeft: '0', textAlign: 'center' }} className='recording-pricing-2-desktop'>
                  <li className="first-item-title list-item-2">
                    Recording Blocks
                  </li>
                  <li className="list-item-2">
                    3 Hours/$150
                  </li>
                  <li className="list-item-2">
                    4 Hours/$190
                  </li>
                  <li className="list-item-2">
                    6 Hours/$290
                  </li>
                  <li className="list-item-2">
                    8 Hours/$390
                  </li>
                  <li className="list-item-2">
                    10+ Hours/$490
                  </li>
                  <li onClick={handleOpen} className="last-item-button list-item-2">
                    <span className="text-span-8">CONTACT</span>
                  </li>
                </ul>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <ul style={{ listStyleType: 'none', paddingLeft: '0', textAlign: 'center' }} className="recording-pricing-3-desktop w-list-unstyled">
                  <li className="first-item-title list-item-2">
                    Hour Bundles
                  </li>
                  <li className="item-pricing list-item-2">
                    Customize*<br /><span className="text-span-7">*Pricing varies</span>
                  </li>
                  <li className="list-item-2">
                    Please contact for more info.
                  </li>
                  <li className="list-item-2">
                    Bundle packages based on customization
                  </li>
                  <li className="list-item-2">
                    *Pricing based on size of work
                  </li>
                  <li onClick={handleOpen} className="last-item-button list-item-2">
                    <span className="text-span-8">CONTACT</span>
                  </li>
                </ul>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ul style={{ listStyleType: 'none', paddingLeft: '0', textAlign: 'center', width: '33%', margin: '0 auto' }} className="mixing-pricing-2-desktop w-list-unstyled">
              <li className="first-item-title list-item-2">
                Full Mix Down
              </li>
              <li className="item-pricing list-item-2">$100/Song</li>
              <li className="list-item-2">
                Online Mixing Service Available
              </li>
              <li className="list-item-2">Industry Quality Mix Down</li>
              <li className="list-item-2">Session/Project Bounce</li>
              <li className="list-item-2">3 Revisions Included</li>
              <li onClick={handleOpen} className="last-item-button list-item-2">
                <span className="text-span-8">CONTACT</span>
              </li>
            </ul>
          </TabPanel>
        </Box>
      </Container>
      <Modal
        sx={{ overflow: 'scroll' }}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <GeneralContact onClose={handleClose} />
      </Modal>
    </div>
  );
}

export default Pricing;
