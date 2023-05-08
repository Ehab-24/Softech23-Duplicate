import React, { useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import Styles from "./placeGalary.module.css"

const PlaceGallery = ({photos}) => {

  const [current, setCurrent] = useState(0);
  const length = photos?.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(photos) || photos.length <= 0) {
    return null;
  }
  
  return (
    <section className={Styles.slider}>
      <AiOutlineLeft className={Styles.leftArrow} onClick={prevSlide} />
      <AiOutlineRight className={Styles.rightArrow} onClick={nextSlide} />
      {photos.map((photo, index) => {
        return (
          <div
            className={Styles.slide}
            key={index}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            {index === current && (
              <img src={photo} alt='travel image' className={Styles.image} />
            )}
          </div>
        );
      })}
    </section>
  );
};

export default PlaceGallery;