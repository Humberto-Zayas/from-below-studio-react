import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

import { useQuery } from '@apollo/client';
import { QUERY_DAY } from '../../utils/queries';

export default function SelectableHours(props) {

  console.log('selectableHours props: ', props.recordingDate.toISOString().split('T')[0])
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const { loading, data } = useQuery(QUERY_DAY, {
    variables: { date: props.recordingDate.toISOString().split('T')[0] }
  });
  const enabledData = data?.day?.hours.filter(item => item.enabled);

  console.log('did it work?.... ', enabledData)

  console.log('returned day query: ', data)
  const handleListItemClick = (event, index) => {

    setSelectedIndex(index);
    props.selectHours(event.target.innerText)
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {/* {data?.day.hours.map((item) =>
        <>
          <div key={item.hour}>
            {item.hour} | {item.enabled ? 'true' : 'false '}
          </div>
        </>
      )} */}
      {data?.day !== null ?
        <List className='recording-pricing-2-desktop' component="nav" aria-label="Recording Package Selection">
           {enabledData?.map((item, index) => (
              <ListItemButton 
                key={item.hour}
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index)}
              >
                <ListItemText style={{color: '#bcbcbc'}} primary={item.hour} />  
              </ListItemButton>
            ))}
          </List>
        :
        <List className='recording-pricing-2-desktop' component="nav" aria-label="Recording Package Selection">
          <ListItemButton
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemText style={{color: '#bcbcbc'}} primary="2 Hours/$70" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemText style={{color: '#bcbcbc'}} primary="4 Hours/$130" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemText style={{color: '#bcbcbc'}} primary="8 Hours/$270" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 3}
            onClick={(event) => handleListItemClick(event, 3)}
          >
            <ListItemText style={{color: '#bcbcbc'}} primary="10 Hours/$340" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 4}
            onClick={(event) => handleListItemClick(event, 4)}
          >
            <ListItemText style={{color: '#bcbcbc'}} primary="Full Day 14+ Hours/$550" />
          </ListItemButton>
        </List>
      }

    </Box>
  );
}