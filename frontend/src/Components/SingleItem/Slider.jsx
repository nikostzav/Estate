import { useEffect, useState } from "react";
import "./slider.css";
const Slider = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(null);

  // function changeSlide(direction) {
  //   if (direction === "left") {
  //     if (imageIndex === 0) {
  //       setImageIndex(images.length - 1);
  //     } else {
  //       setImageIndex(imageIndex - 1);
  //     }
  //   } else {
  //     if (imageIndex === images.length) {
  //       setImageIndex(0);
  //     } else {
  //       setImageIndex(imageIndex + 1);
  //     }
  //   }
  // }

  const rightArrowClicked = () => {
    if (imageIndex < images.length - 1) {
      setImageIndex(imageIndex + 1);
    } else {
      setImageIndex(0);
    }
  };

  const leftArrowClicked = () => {
    if (imageIndex > 0) {
      setImageIndex(imageIndex - 1);
    } else {
      setImageIndex(images.length - 1);
    }
  };
  useEffect(() => {
    if (imageIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [imageIndex]);

  return (
    <div className="slider my-5">
      {imageIndex !== null && (
        <div className="fullSlider">
          <div className="arrow" onClick={leftArrowClicked}>
            <i class="bi bi-caret-left-fill"></i>
          </div>
          <div className="imgContainer">
            <img src={images[imageIndex]}></img>
          </div>
          <div className="arrow" onClick={rightArrowClicked}>
            <i class="bi bi-caret-right-fill"></i>
          </div>
          <div className="close" onClick={() => setImageIndex(null)}>
            X
          </div>
        </div>
      )}
      <div className="bigImage">
        {images && <img src={images[0]} onClick={() => setImageIndex(0)}></img>}
      </div>
      <div className="smallImages">
        {images.slice(1).map((image, index) => {
          return (
            <img
              src={image}
              key={index}
              alt=""
              onClick={() => setImageIndex(index + 1)}
            ></img>
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
