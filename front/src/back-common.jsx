import axios from "axios";

export default axios.create({
    baseURL: `http://${process.env.REACT_APP_BACK_URL}:8080/api`, //"http://10.0.0.100:8080/api",
    headers: {
        "Content-type": "application/json"
    }
});