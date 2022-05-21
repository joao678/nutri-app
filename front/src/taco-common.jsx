import axios from "axios";

export default axios.create({
    baseURL: `http://${process.env.HOST}:4000/api/v1`,
    headers: {
        "Content-type": "application/json"
    }
});