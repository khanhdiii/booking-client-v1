import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";
import Loading from "../../pages/loading/Loading";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const FeaturedProperties = (props) => {
  const [limit, setLimit] = useState(0);
  const { data, loading, error } = useFetch(`/hotels?featured=${true}`);
  const item = props.item;
  const navigate = useNavigate();

  const handleDetail = (itemId) => {
    navigate(`/hotels/${itemId}`);
  };
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      partialVisibilityGutter: 40, // this is needed to tell the amount of px that should be visible.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 30, // this is needed to tell the amount of px that should be visible.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 30, // this is needed to tell the amount of px that should be visible.
    },
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="containerFeaturedProperties">
          <Carousel
            responsive={responsive}
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container-with-dots"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            {data?.map((item) => (
              <div
                className="fpItem"
                key={item._id}
                onClick={() => handleDetail(item._id)}
              >
                {item.photos && item.photos[0] && (
                  <img
                    src={item?.photos?.[0] || undefined}
                    alt=""
                    className="fpImg"
                  />
                )}

                <span className="fpName">{item.name}</span>
                <span className="fpCity">{item.city}</span>
                <span className="fpPrice">
                  Starting from: $<b>{item.cheapestPrice}</b>
                </span>
                {item.rating && (
                  <div className="fpRating">
                    <button>{item.rating}</button>
                    <span>Excellent</span>
                  </div>
                )}
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </>
  );
};

export default FeaturedProperties;
