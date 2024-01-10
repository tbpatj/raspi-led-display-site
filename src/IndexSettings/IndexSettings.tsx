import { useEffect, useState } from "react";
import IndexInputs, { IndicesType } from "./IndexInputs";
import axios from "axios";

const IndexSettings: React.FC = () => {
  const [indices, setIndices] = useState<IndicesType | undefined>();
  const [status, setStatus] = useState<boolean | undefined>();

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

  const getStatus = async () => {
    const { origin } = window.location;
    try {
      const res = await axios({
        url: `${origin}/status`,
        method: "GET",
      });
      console.log(res);
      setStatus(res?.data?.status);
    } catch (err) {
      return err;
    }
  };

  const initialize = async () => {
    await getIndices();
    await getStatus();
  };

  const updateStatus = async () => {
    const { origin } = window.location;
    try {
      const res = await axios({
        url: `${origin}/status`,
        method: "POST",
        data: { status: !status },
      });
      if (res?.data?.includes("success")) {
        setStatus(!status);
      }
      console.log(res);
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
    initialize();
  }, []);

  const render = indices !== undefined && status !== undefined;

  return (
    <>
      {render && (
        <IndexInputs
          indices={
            indices ?? {
              top: { s: 0, e: 0 },
              bottom: { s: 0, e: 0 },
              right: { s: 0, e: 0 },
              left: { s: 0, e: 0 },
            }
          }
          onChange={(val: IndicesType) => setIndices(val)}
          onPost={handlePost}
          onStatusChange={() => updateStatus()}
          status={status ?? true}
        />
      )}
    </>
  );
};

export default IndexSettings;
