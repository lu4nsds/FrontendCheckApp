import axios from "axios";

const api = axios.create({
    //Jardim de Piranhas
    /* baseURL: "http://10.0.0.117:8080", */

    //Natal
    baseURL: "http://192.168.1.64:8080",
  });
  
export default api;