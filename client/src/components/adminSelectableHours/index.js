import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import { useQuery } from '@apollo/client';
import { QUERY_DAY } from '../../utils/queries';

const label = { inputProps: { 'aria-label': 'Switch demo' } } // works
const possibleHours = ['02 Hours/$70', '04 Hours/$130', '08 Hours/$270', '10 Hours/$340', 'Full Day 14+ Hours/$550'] // works

export default function AdminSelectableHours(props) {
  const [checked, setChecked] = React.useState(possibleHours); // works
  const [checkedPulled, setCheckedPulled] = React.useState(['']); // eh
  const [available, setAvailable] = React.useState(true); //works ? need to test unavailable days...
  const [selectedIndex, setSelectedIndex] = React.useState(0); // idk didnt make it
  const { loading, data } = useQuery(QUERY_DAY, { // works ? need to test unavailable
    variables: { date: props.recordingDate.toISOString().split('T')[0] }
  });
  // console.log('QUERY_DAY', data)

  const hourOptionCheck = () => { // works locally but need to pass data up...
    if (data && data.day !== null) {
      const enabledObjects = data?.day?.hours.filter(obj => obj.enabled === true); // fine
      const enabledNames = enabledObjects.map(obj => obj.hour); // fine 
      console.log(enabledNames); // ["John", "Mark", "Sarah"] // fine local
      setCheckedPulled([...enabledNames]) // fine local
      callSetCheckedPulledHours(); // not working as should to parent
    } else {
      props.handleSetCheckedHours(checked) // works one time but not consistent
    }
  }

  const callSetCheckedPulledHours = () => { // eh no, works late
    props.handleSetCheckedHours(checkedPulled)
  }

  const availabilityCheck = () => { // works ? need to test
    if (!loading && data && data.day) {
      console.log('availablilityCheck ran: ', data.day.disabled)
      setAvailable(!data.day.disabled)
      props.updateAvailability(available)
    }
  }

  // console.log('checkPulled state: ', checkedPulled)

  const handleListItemClick = (event, index) => { // didnt make 
    setSelectedIndex(index);
    props.selectHours(event.target.innerText)
    props.handleSetCheckedHours(checked)
  };

  const handleToggle = (value) => () => { // didnt make
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      newChecked.sort();
      props.handleSetCheckedHours(newChecked)

    } else {
      newChecked.splice(currentIndex, 1);
      newChecked.sort();
      props.handleSetCheckedHours(newChecked)

    }
    setChecked(newChecked);
  };

  const handleTogglePulled = (value) => () => { //copied but didnt make
    const currentIndex = checkedPulled.indexOf(value);
    const newChecked = [...checkedPulled];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    // send setCheckedPull back
    setCheckedPulled(newChecked);
  };

  React.useEffect(() => { // works i guess
    hourOptionCheck()
    availabilityCheck();
  }, [data])

  return (
    <Box sx={{ width: '100%', maxWidth: 900, bgcolor: 'transparent' }}>
      <Switch defaultChecked={available} onChange={() => { setAvailable(!available)}} {...label} />
      {available ? <span style={{ color: '#e6e6e6', fontSize: '1.5em' }}>Available</span> : <span style={{ color: '#e6e6e6', fontSize: '1.5em' }}>Unavailable</span>}
      <Grid container spacing={2}>
        <Grid xs={6}>
          {data?.day !== null ?
            <List className='recording-pricing-2-desktop' component="nav" aria-label="Recording Package Selection">
              {data?.day.hours.map((item, index) => (
                <ListItemButton
                  disabled={!available}
                  key={item.hour}
                  selected={selectedIndex === index}
                // onClick={(event) => handleListItemClick(event, index)}
                >
                  <ListItemText style={{ color: '#bcbcbc' }} primary={item.hour} />
                  <Switch
                    edge="end"
                    onChange={handleTogglePulled(item.hour)}
                    checked={checkedPulled.indexOf(item.hour) !== -1}
                    inputProps={{
                      'aria-labelledby': item.hour,
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
            :
            <List className='recording-pricing-2-desktop' component="nav" aria-label="Recording Package Selection">
              <ListItemButton
                disabled={!available}
                // selected={selectedIndex === 0}
                // onClick={(event) => handleListItemClick(event, 0)}
              >
                <ListItemText style={{ color: '#bcbcbc' }} primary="2 Hours/$70" />
                <Switch
                  edge="end"

                  onChange={handleToggle('02 Hours/$70')}
                  checked={checked.indexOf('02 Hours/$70') !== -1}
                  inputProps={{
                    'aria-labelledby': '02 Hours/$70',
                  }}
                />
              </ListItemButton>
              <ListItemButton
                disabled={!available}
                // selected={selectedIndex === 1}
                // onClick={(event) => handleListItemClick(event, 1)}
              >
                <ListItemText style={{ color: '#bcbcbc' }} primary="4 Hours/$130" />
                <Switch
                  edge="end"

                  onChange={handleToggle('04 Hours/$130')}
                  checked={checked.indexOf('04 Hours/$130') !== -1}
                  inputProps={{
                    'aria-labelledby': '04 Hours/$130',
                  }}
                />
              </ListItemButton>
              <ListItemButton
                disabled={!available}
                // selected={selectedIndex === 2}
                // onClick={(event) => handleListItemClick(event, 2)}
              >
                <ListItemText style={{ color: '#bcbcbc' }} primary="8 Hours/$270" />
                <Switch
                  edge="end"

                  onChange={handleToggle('08 Hours/$270')}
                  checked={checked.indexOf('08 Hours/$270') !== -1}
                  inputProps={{
                    'aria-labelledby': '08 Hours/$270',
                  }}
                />
              </ListItemButton>
              <ListItemButton
                disabled={!available}
                // selected={selectedIndex === 3}
                // onClick={(event) => handleListItemClick(event, 3)}
              >
                <ListItemText style={{ color: '#bcbcbc' }} primary="10 Hours/$340" />
                <Switch
                  edge="end"

                  onChange={handleToggle('10 Hours/$340')}
                  checked={checked.indexOf('10 Hours/$340') !== -1}
                  inputProps={{
                    'aria-labelledby': '10 Hours/$340',
                  }}
                />
              </ListItemButton>
              <ListItemButton
                disabled={!available}
                // selected={selectedIndex === 4}
                // onClick={(event) => handleListItemClick(event, 4)}
              >
                <ListItemText style={{ color: '#bcbcbc' }} primary="Full Day 14+ Hours/$550" />
                <Switch
                  edge="end"

                  onChange={handleToggle('Full Day 14+ Hours/$550')}
                  checked={checked.indexOf('Full Day 14+ Hours/$550') !== -1}
                  inputProps={{
                    'aria-labelledby': 'Full Day 14+ Hours/$550',
                  }}
                />
              </ListItemButton>
            </List>
          }
        </Grid>
        <Grid xs={6}>
          {data?.day !== null ? 
            <p style={{color: 'white', fontSize: '1.3em'}}>check pulled: <br></br>{checkedPulled}</p> 
            :
            <p style={{color: 'white', fontSize: '1.3em'}}>checked: <br></br>{checked}</p>
          }
        </Grid>
      </Grid>
    </Box>
  );
}