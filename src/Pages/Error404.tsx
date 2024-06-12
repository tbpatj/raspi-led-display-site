import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Error404Props {}

const Error404: React.FC<Error404Props> = ({}) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);
  return <div></div>;
};

export default Error404;
