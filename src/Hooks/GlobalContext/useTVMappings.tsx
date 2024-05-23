import { useCallback, useEffect, useState } from "react";
import {
  GetTVMappingsResponse,
  TVMappings,
  defaultTVMappings,
} from "../../Resources/TVSettingsResources";
import { serverNotFoundResponse } from "../../Context/GlobalContext";
import axios from "axios";

interface TVMappingsProps {}

interface TVMappingsHook {
  tv_mappings: TVMappings;
}

const baseURL = process.env.REACT_APP_BASE_URL || window.location.origin;

const useTVMappings: (props: TVMappingsProps) => TVMappingsHook = ({}) => {
  const [tv_mappings, setTv_mappings] = useState<TVMappings>(defaultTVMappings);

  const getMappings = useCallback(async () => {
    const options = {
      method: "GET",
      url: baseURL + "/capture-mappings",
    };
    let response = serverNotFoundResponse;
    try {
      response = await axios(options);
      response = response?.data;
      if (response.status === "success") {
        setTv_mappings(response.data);
      }
    } catch (error) {
      console.log(error);
    }
    return {} as GetTVMappingsResponse;
  }, [setTv_mappings]);

  useEffect(() => {
    getMappings();
  }, []);

  return {
    tv_mappings,
  };
};

export default useTVMappings;
