import axios from "axios";
import { serverNotFoundResponse } from "../Context/GlobalContext";
import { useState } from "react";

const baseURL = process.env.REACT_APP_BASE_URL || window.location.origin;
const names = ["Processed Image Border", "Processed LED Image Border"];
const DebugPage: React.FC = () => {
  const [images, setImages] = useState<string[]>(["", ""]);
  const [diffs, setDiffs] = useState<string[]>(["", ""]);
  const [showDif, setShowDiff] = useState<boolean[]>([false, false]);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    const options = {
      method: "GET",
      url: baseURL + "/debug-image",
    };
    setLoading(true);
    let response = serverNotFoundResponse;
    try {
      response = await axios(options);
      response = response.data;
      if (response?.data?.image) {
        setImages((imgs) => {
          const nImgs = [...imgs];
          nImgs[0] = response.data.image;
          return nImgs;
        });
        setDiffs((difs) => {
          const ndifs = [...difs];
          ndifs[0] = response.data.diff_image;
          return ndifs;
        });
      }
      if (response?.data?.led_image) {
        setImages((imgs) => {
          const nImgs = [...imgs];
          nImgs[1] = response.data.led_image;
          return nImgs;
        });
        setDiffs((difs) => {
          const ndifs = [...difs];
          ndifs[1] = response.data.diff_led_image;
          return ndifs;
        });
      }
      console.log(response);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <div className="new-device-container debug-device-container">
        <button disabled={loading} className="my-button" onClick={handleClick}>
          {loading ? "loading" : "Debug Image"}
        </button>
        <div className="debug-image-container">
          {images.map((image, index) => {
            if (image === "") return null;
            return (
              <div className="debug-container" key={index}>
                <span>{names[index]}</span>
                <img
                  className="debug-image"
                  src={`data:image/jpeg;base64,${
                    showDif[index] ? diffs[index] : image
                  }`}
                  alt="debug"
                />
                <button
                  onClick={() => {
                    console.log("change");
                    setShowDiff((sd) => {
                      const nsd = [...sd];
                      nsd[index] = !nsd[index];
                      return nsd;
                    });
                  }}
                >
                  {showDif[index] ? "Show Original" : "Show Difference"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DebugPage;
