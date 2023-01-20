import React from 'react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './ImageSlider.module.scss';
type Props = {
  otherImages:
    | [
        {
          imgId: string;
          imgUrl: string;
        }
      ]
    | [];
};

function ImageSlider({ otherImages }: Props) {
  console.log('Other Images: ', otherImages);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={styles.ImageSlider}>
      <Slider {...settings}>
        {otherImages?.map((image) => (
          <img
            key={image.imgId}
            className={styles.img}
            src={image.imgUrl}
            alt={image.imgUrl}
          />
        ))}
      </Slider>
    </div>
  );
}

export default ImageSlider;
