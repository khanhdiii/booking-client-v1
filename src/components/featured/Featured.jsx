import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=berlin,madrid,london"
  );
  return (
    <div className="featured">
      {loading ? (
        "Loading..."
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Da Nang</h1>
              <h2>{data[0]} </h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Nha Trang</h1>
              <h2>{data[1]} </h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Vung Tau</h1>
              <h2>{data[2]} </h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
