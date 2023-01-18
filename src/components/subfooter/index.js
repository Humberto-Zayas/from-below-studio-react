import Grid from '@mui/material/Unstable_Grid2';

export default function Subfooter() {
  return (
    <>
    <Grid container spacing={2}>
        <Grid lg={8} md={8} sm={12} xs={12}>
          Visa Logo
        </Grid>
        <Grid lg={4} md={4} sm={12} xs={12}>
          <p><span>Studio Policy</span> | <span>Contact</span></p>
          
        </Grid>
      </Grid>
    </>
  )
}