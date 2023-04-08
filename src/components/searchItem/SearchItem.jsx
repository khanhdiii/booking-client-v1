import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = (props) => {
  const item = props.item;
  return (
    <div className="searchItem">
      <img src={item?.photos?.[0] || undefined} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}M from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="siRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>

          <button className="siCheckButton">
            <Link to={`/hotels/${item._id}`}>See availability</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
