import { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const sliderData = [
	{
		image: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fHNob2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
		heading: "Shoes Villa",
		desc: "Up to 30% off on all onsale proucts.",
	},
	{
		image: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTZ8fHdvbWVuJTIwZmFzaGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
		heading: "Women Fashion",
		desc: "Up to 30% off on all onsale proucts.",
	},
	{
		image: "https://images.unsplash.com/photo-1550995694-3f5f4a7e1bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bWFuJTIwZmFzaGlvbnxlbnwwfDB8MHx8&auto=format&fit=crop&w=500&q=60",
		heading: "Men Fashion",
		desc: "Up to 30% off on all onsale proucts.",
	},
	{
		image: "https://plus.unsplash.com/premium_photo-1670274606895-f2dc713f8a90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fGNvbXB1dGVyfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
		heading: "Awesome Gadgets",
		desc: "Up to 30% off on all onsale proucts.",
	},
];

const Slider = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const slideLength = sliderData.length;

	const autoScroll = true;
	let slideInterval;
	let intervalTime = 10000;

	const nextSlide = () => {
		setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
	};

	const prevSlide = () => {
		setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
	};

	useEffect(() => {
		setCurrentSlide(0);
	}, []);

	useEffect(() => {
		if (autoScroll) {
			const auto = () => {
				// eslint-disable-next-line
				slideInterval = setInterval(nextSlide, intervalTime);
			};
			auto();
		}
		return () => clearInterval(slideInterval);
	}, [currentSlide, slideInterval, autoScroll]);

	return (
		<div className="slider">
			<AiOutlineArrowLeft
				className="arrow prev"
				onClick={prevSlide}
			/>
			<AiOutlineArrowRight
				className="arrow next"
				onClick={nextSlide}
			/>

			{sliderData.map((slide, index) => {
				const { image, heading, desc } = slide;
				return (
					<div
						key={index}
						className={index === currentSlide ? "slide current" : "slide"}>
						{index === currentSlide && (
							<>
								<img
									src={image}
									alt="slide"
								/>
								<div className="content">
									<h2>{heading}</h2>
									<p>{desc}</p>
									<hr />
									<a
										href="#product"
										className="--btn --btn-primary">
										Shop Now
									</a>
								</div>
							</>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default Slider;
