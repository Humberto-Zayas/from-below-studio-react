import Grid from '@mui/material/Unstable_Grid2';
import SwipeableTextMobileStepper from '../../components/SwipeableTextMobileStepper';
import SliderTwo from '../../components/SliderTwo';
import ImageCarousel from '../ImageCarousel';
import Container from '@mui/material/Container';
import Subfooter from '../../components/subfooter';


export default function About() {
  return (
    <div className='about' id="About">
      <Container maxWidth="lg">
        <h3 className='heading-10-copy'>
          ABOUT FROM BELOW <span className="text-span-24">STUDIO</span>
        </h3>
        <p className='text-block-9'>
          From Below is a recording studio in Central New Jersey. Our goal is to provide our clients with a safe, creative and professional environment to create the ultimate sound experience. The studio features two professionally sound treated rooms including; a control room for mixing and a vocal booth for recording. We offer recording and mixing services for a wide range of genres, styles and commercial uses. The Engineer brings 10+ years of experience to the table with over 1,000 songs recorded and mixed. Available now for live recording sessions, full albums/projects, mixing, online mixing and listening sessions. View the studio and gear below.
        </p>
        <Grid container spacing={2}>
          <Grid style={{overflow: 'hidden', height: '400px'}} lg={6} md={12} sm={12} xs={12}>
            <ImageCarousel/>
            {/* <SwipeableTextMobileStepper /> */}
          </Grid>
          <Grid style={{overflow: 'hidden', height: '400px'}} lg={6} md={12} sm={12} xs={12}>
            {/* <SliderTwo /> */}
          </Grid>
        </Grid>
        <div className="about-divider"></div>
        <Subfooter></Subfooter>
      </Container>
    </div>
  )
}