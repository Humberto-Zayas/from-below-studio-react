import * as React from 'react';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';

//components
import BasicTable from '../pricingTable';

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
          <Typography>{children}</Typography>
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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='section pricing' id="Pricing">
      <Container style={{textAlign: 'center'}}  maxWidth="lg">
        <h3 className='heading-13'>PRICING</h3>
        <p className='text-block-13'>
          Rates apply for single recording sessions and mixing services. Bundle packages available as well.
        </p>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab style={{color: 'white'}} label="Recording" {...a11yProps(0)} />
              <Tab style={{color: 'white'}} label="Mixing" {...a11yProps(1)} />

            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Grid container spacing={2}>
              <Grid lg={4} md={4} sm={12} xs={12}>
                <ul style={{ listStyleType: 'none', paddingLeft: '0', textAlign: 'center' }} className='recording-pricing-1-desktop'>
                  <li className="first-item-title list-item-2">
                    Standard rate
                  </li>
                  <li className="item-pricing list-item-2">
                    $35*<br /><span className="text-span-7">*per hour/recording only</span>
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
                  <li className="last-item-button list-item-2" >
                    <span className="text-span-8">CONTACT</span>
                  </li>
                </ul>
              </Grid>
              <Grid lg={4} md={4} sm={12} xs={12}>
                <ul style={{ listStyleType: 'none', paddingLeft: '0', textAlign: 'center' }} className='recording-pricing-2-desktop'>
                  <li className="first-item-title list-item-2">
                    Recording Blocks
                  </li>
                  <li className="list-item-2">
                    4 Hours/$130
                  </li>
                  <li className="list-item-2">
                    6 Hours/$200
                  </li>
                  <li className="list-item-2">
                    8 Hours/$270
                  </li>
                  <li className="list-item-2">
                    10 Hours/$340
                  </li>
                  <li className="list-item-2">
                    Full Day 14+ Hours/$550
                  </li>
                  <li className="last-item-button list-item-2">
                    <span className="text-span-8">CONTACT</span>
                  </li>
                </ul>
              </Grid>
              <Grid lg={4} md={4} sm={12} xs={12}>
                <ul style={{ listStyleType: 'none', paddingLeft: '0', textAlign: 'center' }} className="recording-pricing-3-desktop w-list-unstyled">
                  <li className="first-item-title list-item-2">
                    Custom project
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
                  <li className="last-item-button list-item-2">
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
              <li className="last-item-button list-item-2">
                <span  className="text-span-8">CONTACT</span>
              </li>
            </ul>
          </TabPanel>

        </Box>
      </Container>
    </div>

  );
}

export default Pricing;