import "./hotel.css";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
// import { SearchContext } from "../../context/SearchContex";
// import { AuthContext } from "../../context/AuthContext";
import Reverse from "../../components/reverse/Reverse";
import Loading from "../loading/Loading";
import { useSelector } from "react-redux";
import NavbarMenu from "../../components/navbar/NavbarMenu";

const Hotel = () => {
  const search = useSelector((state) => state.search);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error } = useFetch(`/hotels/find/${id}`);

  const dates = search.dates;
  const options = search.options;

  const user = useSelector((state) => state.auth.login.currentUser);
  const navigate = useNavigate();

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  const days =
    dates.length > 0 ? dayDifference(dates[0].endDate, dates[0].startDate) : 0;

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClickReverse = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/signin");
    }
  };
  return (
    <div>
      <NavbarMenu />
      <Header type="list" />
      {loading ? (
        <Loading />
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data?.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="bookNow">Reserve or Book Now!</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location – {data.distance}m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>

            <Box sx={{ width: 1025, height: 500, overflowY: "scroll" }}>
              <ImageList variant="masonry" cols={3} gap={8}>
                {/* <div className="hotelImages"> */}
                {data.photos?.map((photo, i) => (
                  <ImageListItem key={i}>
                    <img
                      onClick={() => handleOpen(i)}
                      src={`${photo}?w=248&fit=crop&auto=format`}
                      srcSet={`${photo}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      alt=""
                      // className="hotelImg"
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>This property has an excellent location</span>
                <span>Time checkin 14:00 and checkout 12:00</span>
                <h2>
                  <b>
                    $(
                    {Intl.NumberFormat().format(
                      days * data.cheapestPrice * search.options.room
                    )}
                    )
                  </b>{" "}
                  ({days} nights)
                </h2>
                <button onClick={handleClickReverse}>
                  Reserve or Book Now!
                </button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reverse setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
