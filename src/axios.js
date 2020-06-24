import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-web-app-a7dbc.firebaseio.com/",
});

export default instance;
