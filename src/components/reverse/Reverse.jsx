import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./reverse.css";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { newSearch, resetSearch } from "../../redux/searchSlice";

const Reverse = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(false);
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const allDates = getDatesInRange(
    search.dates[0].startDate,
    search.dates[0].endDate
  );

  const isAvaiable = (roomNumber) => {
    const isFound = roomNumber.unavaiableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((i) => i !== value)
    );
  };

  const handleReverse = async () => {
    try {
      await Promise.all(
        selectedRooms.map(async (roomId) => {
          const res = await axios.put(`/rooms/availability/${roomId}`, {
            dates: allDates,
          });
          dispatch(resetSearch());
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <div className="reverse">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your room</span>
        {data.map((item) => (
          <div className="rItem">
            <div className="rItemInfo">
              <div className="rTitle">
                Type Room: <b>{item.title}</b>
              </div>
              <div className="rDesc">
                Description: <b>{item.desc}</b>
              </div>
              <div className="rMax">
                Max people:<b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">
                {item.price.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </div>
              <div className="rSelectRooms">
                {item.roomNumbers.map((roomNumber) => (
                  <div className="room">
                    <label>{roomNumber.number}</label>
                    <input
                      type="checkbox"
                      disabled={!isAvaiable(roomNumber)}
                      value={roomNumber._id}
                      onChange={handleSelect}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        <button onClick={handleReverse} className="rButton">
          Reverse Now!!!!
        </button>
      </div>
    </div>
  );
};

export default Reverse;
