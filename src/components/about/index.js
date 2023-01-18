import Grid from '@mui/material/Unstable_Grid2';


export default function About() {
  return (
    <>
      <h3>
        ABOUT FROM BELOW STUDIO
      </h3>
      <p>
        From Below is a recording studio in Central New Jersey. Our goal is to provide our clients with a safe, creative and professional environment to create the ultimate sound experience. The studio features two professionally sound treated rooms including; a control room for mixing and a vocal booth for recording. We offer recording and mixing services for a wide range of genres, styles and commercial uses. The Engineer brings 10+ years of experience to the table with over 1,000 songs recorded and mixed. Available now for live recording sessions, full albums/projects, mixing, online mixing and listening sessions. View the studio and gear below.
      </p>
      <Grid container spacing={2}>
        <Grid lg={6} md={12} sm={12} xs={12}>
          light box one
        </Grid>
        <Grid lg={6} md={12} sm={12} xs={12}>
          light box two
        </Grid>
      </Grid>
    </>
  )
}