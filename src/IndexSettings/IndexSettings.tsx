import { useEffect, useState } from "react";
import IndexInputs, { IndicesType } from "./IndexInputs";
import axios from "axios";

const IndexSettings: React.FC = () => {
  const [indices, setIndices] = useState<IndicesType | undefined>();
  const getIndices = async () => {
    console.log(window.location);
    const { origin } = window.location;
    try {
      const res = await axios({ url: `${origin}/indices`, method: "GET" });
      console.log(res);
      setIndices(res?.data?.indices);
    } catch (err) {
      return err;
    }
    // axios.get("")
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
        />
      )}
    </>
  );
};

export default IndexSettings;
