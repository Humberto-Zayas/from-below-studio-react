import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';

import { useQuery } from '@apollo/client';
import { QUERY_DAY } from '../../utils/queries';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const possibleHours = ['2 Hours/$70', '4 Hours/$130', '8 Hours/$270', '10 Hours/$340', 'Full Day 14+ Hours/$550']

export default function AdminSelectableHours(props) {
  const [checked, setChecked] = React.useState(possibleHours);
  const [checkedPulled, setCheckedPulled] = React.useState(['']);
  const [available, setAvailable] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const { loading, data } = useQuery(QUERY_DAY, {
    variables: { date: props.recordingDate.toISOString().split('T')[0] }
  });

  console.log('QUERY_DAY', data)

  const hourOptionCheck = () => {
    // console.log('well? ', data.day)
    if (data && data.day !== null) { 
      const enabledObjects = data?.day?.hours.filter(obj => obj.enabled === true);
      const enabledNames = enabledObjects.map(obj => obj.hour);
      console.log(enabledNames); // ["John", "Mark", "Sarah"]
      setCheckedPulled([...enabledNames]) 
      console.log('this should only run if a day exists...')
    }
    
  }

  console.log('checkPulled state: ', checkedPulled)

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    props.selectHours(event.target.innerText)
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleTogglePulled = (value) => () => {
    const currentIndex = checkedPulled.indexOf(value);
    const newChecked = [...checkedPulled];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheckedPulled(newChecked);
  };

  React.useEffect(() => { 
    hourOptionCheck()
  }, [data])

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'transparent' }}>
      <Switch onChange={() => setAvailable(!available)} {...label} />
      {available ? <span style={{ color: '#e6e6e6', fontSize: '1.5em' }}>Unavailable</span> : <span style={{ color: '#e6e6e6', fontSize: '1.5em' }}>Available</span>}
      {data?.day !== null ?
        <List className='recording-pricing-2-desktop' component="nav" aria-label="Recording Package Selection">
          {data?.day.hours.map((item, index) => (
            <ListItemButton
              disabled={available}
              key={item.hour}
              selected={selectedIndex === index}
              // onClick={(event) => handleListItemClick(event, index)}
            >
              <ListItemText style={{ color: '#bcbcbc' }} primary={item.hour} />
              <Switch
                disabled={available}
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
            disabled={available}
            selected={selectedIndex === 0}
            // onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemText style={{ color: '#bcbcbc' }} primary="2 Hours/$70" />
            <Switch
              edge="end"
              disabled={available}
              onChange={handleToggle('2 Hours/$70')}
              checked={checked.indexOf('2 Hours/$70') !== -1}
              inputProps={{
                'aria-labelledby': '2 Hours/$70',
              }}
            />
          </ListItemButton>
          <ListItemButton
            disabled={available}
            selected={selectedIndex === 1}
            // onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemText style={{ color: '#bcbcbc' }} primary="4 Hours/$130" />
            <Switch
              edge="end"
              disabled={available}
              onChange={handleToggle('4 Hours/$130')}
              checked={checked.indexOf('4 Hours/$130') !== -1}
              inputProps={{
                'aria-labelledby': '4 Hours/$130',
              }}
            />
          </ListItemButton>
          <ListItemButton
            disabled={available}
            selected={selectedIndex === 2}
            // onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemText style={{ color: '#bcbcbc' }} primary="8 Hours/$270" />
            <Switch
              edge="end"
              disabled={available}
              onChange={handleToggle('8 Hours/$270')}
              checked={checked.indexOf('8 Hours/$270') !== -1}
              inputProps={{
                'aria-labelledby': '8 Hours/$270',
              }}
            />
          </ListItemButton>
          <ListItemButton
            disabled={available}
            selected={selectedIndex === 3}
            // onClick={(event) => handleListItemClick(event, 3)}
          >
            <ListItemText style={{ color: '#bcbcbc' }} primary="10 Hours/$340" />
            <Switch
              edge="end"
              disabled={available}
              onChange={handleToggle('10 Hours/$340')}
              checked={checked.indexOf('10 Hours/$340') !== -1}
              inputProps={{
                'aria-labelledby': '10 Hours/$340',
              }}
            />
          </ListItemButton>
          <ListItemButton
            disabled={available}
            selected={selectedIndex === 4}
            onClick={(event) => handleListItemClick(event, 4)}
          >
            <ListItemText style={{ color: '#bcbcbc' }} primary="Full Day 14+ Hours/$550" />
            <Switch
              edge="end"
              disabled={available}
              onChange={handleToggle('Full Day 14+ Hours/$550')}
              checked={checked.indexOf('Full Day 14+ Hours/$550') !== -1}
              inputProps={{
                'aria-labelledby': 'Full Day 14+ Hours/$550',
              }}
            />
          </ListItemButton>
        </List>
      }

    </Box>
  );
}