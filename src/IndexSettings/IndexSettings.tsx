import { useEffect, useState } from "react";
import IndexInputs, { IndicesType } from "./IndexInputs";
import axios from "axios";

const IndexSettings: React.FC = () => {
  const [indices, setIndices] = useState<IndicesType | undefined>({
    top: { s: 0, e: 0 },
    bottom: { s: 0, e: 0 },
    right: { s: 0, e: 0 },
    left: { s: 0, e: 0 },
  });

  const getIndices = async () => {
    const { origin } = window.location;
    try {
      const res = await axios({ url: `${origin}/indices`, method: "GET" });
      console.log(res);
      setIndices(res?.data);
    } catch (err) {
      return err;
    }
  };

  const handlePost = async () => {
    const { origin } = window.location;
    try {
      const res = await axios({
        url: `${origin}/indices`,
        method: "POST",
        data: { indices },
      });
      console.log(res);
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    getIndices();
  }, []);

  return (
    <>
      {indices && (
        <IndexInputs
          indices={indices}
          onChange={(val: IndicesType) => setIndices(val)}
          onPost={handlePost}
        />
      )}
    </>
  );
};

export default IndexSettings;
