import axios from "axios";

const getMaps = () => {
  return axios.get(
    "https://api.openchargemap.io/v3/poi/?output=json&latitude=65.012093&longitude=25.465076&maxresults=15&distanceunit=10miles"
  );
};

export { getMaps };
