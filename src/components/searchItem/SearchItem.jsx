import { Link } from "react-router-dom";
import "./searchItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUmbrellaBeach } from "@fortawesome/free-solid-svg-icons";
const SearchItem = (props) => {
  const item = props.item;

  const handleLinkToDetail = () => {
    <Link to={`/hotels/${item._id}`}>See details</Link>;
  };
  return (
    <div className="searchItem" onClick={handleLinkToDetail}>
      <img
        src={item?.photos?.[0] || undefined}
        alt="img hotel"
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">
          <FontAwesomeIcon icon={faUmbrellaBeach} /> Beach way {item.distance}
        </span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">{item.title}</span>
        {/* <span className="siFeatures">{item.desc}</span> */}
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
            <Link to={`/hotels/${item._id}`}>See details</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
