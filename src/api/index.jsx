import useSWR,{SWRConfig} from "swr";
import axios from "axios";


export const baseUrl ="http://10.10.80.228:8043/"
axios.defaults.baseURL = `${baseUrl}api/`;

export function ApiProvider({ children, options }) {
    return (
      <SWRConfig
        value={{
          fetcher: (path, params) => axios.get(path, { params }).then((res) => res.data),
          ...options,
        }}
      >
        {children}
      </SWRConfig>
    );
  }