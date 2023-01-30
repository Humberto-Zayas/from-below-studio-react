import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Services() {
  return (
    <>
      <h3>SERVICES</h3>
      <p>
        From Below offers recording and audio mixing services. The studio is also available for production uses.
      </p>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid lg={6} md={12} sm={12} xs={12}>
            <Item>
              <h4>RECORDING SERVICES</h4>
              <p>
                 From Below records songs, mixtapes, EP's and audiobooks for artists of multiple genres.
                 Industry quality recording booth, microphone and outboard gear. Fits guitar, bass, keyboards and many other instruments.
                 Plug and play your laptop and setup to our interface.
                 Acoustic treated booth, control room, and waiting room with session live streamed on waiting room monitor.
                 Comfortable and creative environment to work on your project.
                 Access to your raw mix, tracks and project files upon request.
                 Free backup. Studio keeps files backed up for use and edit.
                 Multiple sessions, packages and recording blocks available.
                 Private closed session (Each session is one on one with the Engineer).
              </p>
            </Item>
          </Grid>
          <Grid lg={6} md={12} sm={12} xs={12}>
            <Item>
              <h4>MIXING SERVICES</h4>
              <p>
                We offer full mix down available for your project including albums, EP’s, mixtapes, podcasts, instruments and more.
                 We mix all genres/styles of music as well as various job requests including podcast, audiobooks, commercials and more.
                 Choose between 2 track mix for a quick reference or a full track out mix down for a professional and dynamic mix.
                 Includes up to 3 free revisions per song requested.
                 Creative effect processing with industry standard plugins - Equalization, Compression and Dynamics, Reverb, Delay.
                 Online mixing services available.
                 Custom edits upon request - create performance ready mixes, clip edits/fades/chops, looping and more
              </p>
            </Item>
          </Grid>

        </Grid>
      </Box>
    </>
  )
}

export default Services;