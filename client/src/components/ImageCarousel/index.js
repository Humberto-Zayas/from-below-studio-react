import React, { useState } from 'react';
import { MobileStepper, Box, Button } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

const images = [
	'https://placehold.co/600x200',
	'https://placehold.co/600x200/000000/FFFFFF/png',
	'https://placehold.co/600x200/000000/FF0000/png'
];

const ImageCarousel = () => {
	const [activeStep, setActiveStep] = useState(0);

	const handleNext = () => {
		setActiveStep((prevStep) => (prevStep + 1) % images.length);
	};

	const handleBack = () => {
		setActiveStep((prevStep) => (prevStep - 1 + images.length) % images.length);
	};

	const carouselStyle = {
		display: 'flex',
		transition: 'transform 0.3s ease-in-out',
		width: `${images.length * 100}%`,
		transform: `translateX(-${activeStep * (100 / images.length)}%)`
	};

	return (
		<div className="carousel-container">
			<Box>
				<div style={carouselStyle}>
					{images.map((image, index) => (
						<div
							key={index}
							className={`carousel-image ${index === activeStep ? 'active' : ''}`}
							style={{ width: `${100 / images.length}%` }}
						>
							<img style={{ width: '100%', height: '100%' }} src={image} alt={`Image ${index}`} />
						</div>
					))}
				</div>
			</Box>
			<MobileStepper
				variant="dots"
				steps={images.length}
				position="static"
				activeStep={activeStep}
				nextButton={
					<Button size="small" onClick={handleNext} disabled={images.length <= 1}>
						Next
						<KeyboardArrowRight />
					</Button>
				}
				backButton={
					<Button size="small" onClick={handleBack} disabled={images.length <= 1}>
						<KeyboardArrowLeft />
						Back
					</Button>
				}
			/>
		</div>
	);
};

export default ImageCarousel;
