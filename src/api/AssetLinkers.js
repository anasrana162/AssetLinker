import axios from "axios";
import { Platform } from "react-native";
export default axios.create({

  baseURL: "https://devstaging.a2zcreatorz.com/assetLinkerProject/api/",
  headers: {
    "Accept": "application/json",
    "Content-Type": 'application/json; charset=utf-8; ',
    "User-Agent": Platform.OS
  },

});

export const ImagePath = "https://devstaging.a2zcreatorz.com/assetLinker_laravel/storage/app/public/images/userProfile/"