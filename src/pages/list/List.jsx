import { format } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { destinationOptions } from "../../lib/destinationOptions";
import Loading from "../loading/Loading";
import { newSearch } from "../../redux/searchSlice";
import "./list.css";
import NavbarMenu from "../../components/navbar/NavbarMenu";

const List = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const desti = useSelector((state) => state.search);

  const [destination, setDestination] = useState(desti.destination);
  const [dates, setDates] = useState(desti.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(desti.options);
  const [showOptions, setShowOptions] = useState(false);

  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
  );

  useEffect(() => {
    const searchPayload = {
      destination: destination,
      dates: dates,
      options: {
        ...options,
        destinationOptions: destination,
      },
    };
    dispatch(newSearch(searchPayload));
  }, [destination, dates, options, dispatch]);

  // const handleClick = () => {
  //   const searchPayload = {
  //     destination: destination,
  //     dates: dates,
  //     options: {
  //       ...options,
  //       destinationOptions: destination,
  //     },
  //   };
  //   dispatch(newSearch(searchPayload));
  //   navigate("/hotels");
  // };

  // Updated function to handle destination click from Featured component
  const handleDestinationClick = (name) => {
    setDestination(name);
    setDestinationOptions(name);
  };

  const setDestinationOptions = (name) => {
    if (destinationOptions.includes(name)) {
      setOptions({
        ...options,
        destinationOptions: name,
      });
    }
  };

  useEffect(() => {}, []);

  return (
    <div>
      <NavbarMenu />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <div className="select-wrapper">
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  onClick={() => setShowOptions(true)}
                >
                  {destinationOptions.map((option) => (
                    <option
                      key={option}
                      value={option}
                      onClick={() => handleDestinationClick(option)}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0]?.startDate,
                "dd/MM/yyyy"
              )} to ${format(dates[0]?.endDate, "dd/MM/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    onChange={(e) => setMin(e.target.value)}
                    value={min}
                  />
                </div>{" "}
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    onChange={(e) => setMax(e.target.value)}
                    value={max}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            {/* <button onClick={handleClick}>Search</button> */}
          </div>
          <div className="listResult">
            {data &&
              Array.isArray(data) &&
              data.map((item) => <SearchItem item={item} key={item._id} />)}
            {!data && <Loading />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
