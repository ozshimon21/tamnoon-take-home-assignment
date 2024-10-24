import axios from "axios";
import { Asset } from "../models";

export const getAssets = async (): Promise<Asset[]> => {
  const response = await axios.get<Asset[]>(
    "https://raw.githubusercontent.com/tamnoon-io/webinterviews/refs/heads/main/assets.json"
  );

  return response.data;
};
