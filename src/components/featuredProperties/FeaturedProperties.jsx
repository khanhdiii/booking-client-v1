import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";
import Loading from "../../pages/loading/Loading";

const FeaturedProperties = (props) => {
  const [limit, setLimit] = useState(0);
  const { data, loading, error } = useFetch(
    `/hotels?featured=${true}`
  );
  const item = props.item;
  return (
    <div className="fp">
      {loading ? (
        <Loading />
      ) : (
        <>
          {!data || !Array.isArray(data)
            ? "Data is not an array"
            : data?.map((item) => (
                <div className="fpItem" key={item._id}>
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
                    Starting from $<b>{item.cheapestPrice}</b>
                  </span>
                  {item.rating && (
                    <div className="fpRating">
                      <button>{item.rating}</button>
                      <span>Excellent</span>
                    </div>
                  )}
                </div>
              ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
