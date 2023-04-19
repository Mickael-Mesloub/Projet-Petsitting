import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ images, src }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div ref={sliderRef} className="carousel">
      {images.map((image, index) => (
        <img key={index} src={image.url} alt={image.alt} />
      ))}
    </div>
  );
};

export default Carousel;
