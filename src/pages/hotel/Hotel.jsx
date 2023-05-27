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
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useSelector, useDispatch } from "react-redux";
import { newSearch, resetSearch } from "../../redux/searchSlice";
import { useNavigate, useParams } from "react-router-dom";
import Reverse from "../../components/reverse/Reverse";
import Loading from "../loading/Loading";
import NavbarMenu from "../../components/navbar/NavbarMenu";

const Hotel = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error } = useFetch(`/hotels/find/${id}`);
  const search = useSelector((state) => state.search);

  const user = useSelector((state) => state.auth.login.currentUser);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  const days =
    search.dates.length > 0
      ? dayDifference(search.dates[0].endDate, search.dates[0].startDate)
      : 0;

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

  const handleSearch = () => {
    dispatch(newSearch(search));
    navigate("/search");
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
            <button className="bookNow" onClick={handleSearch}>
              Reserve or Book Now!
            </button>
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
            </span>{" "}
            <Box sx={{ width: 1025, height: 500, overflowY: "scroll" }}>
              <ImageList variant="masonry" cols={3} gap={8}>
                {data.photos?.map((photo, i) => (
                  <ImageListItem key={i}>
                    <img
                      onClick={() => handleOpen(i)}
                      src={`${photo}?w=248&fit=crop&auto=format`}
                      srcSet={`${photo}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      alt=""
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
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>$({days * data.cheapestPrice * search.options.room})</b> (
                  {days} nights)
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
