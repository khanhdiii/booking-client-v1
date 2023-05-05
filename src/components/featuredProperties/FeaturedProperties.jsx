import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";
import Loading from "../../pages/loading/Loading";

const FeaturedProperties = () => {
  const [limit, setLimit] = useState(0);
  const { data, loading, error } = useFetch(`/hotels?featured=${true}`);

  return (
    <div className="fp">
      {loading ? (
        <Loading />
      ) : (
        <>
          {!data || !Array.isArray(data)
            ? "Data is not an array"
            : data.map((item) => (
                <div className="fpItem" key={item._id}>
                  {item.photo && item.photo[0] && (
                    <img src={item.photo[0]} alt="" className="fpImg" />
                  )}
                  <span className="fpName">{item.name}</span>
                  <span className="fpCity">{item.city}</span>
                  <span className="fpPrice">
                    Starting from ${item.cheapestPrice}
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
