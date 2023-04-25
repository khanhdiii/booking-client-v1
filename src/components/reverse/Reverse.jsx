import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./reverse.css";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const Reverse = ({ setOpen, hotelId }) => {
  return (
    <div className="reverse">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your room</span>
      </div>
    </div>
  );
};

export default Reverse;
