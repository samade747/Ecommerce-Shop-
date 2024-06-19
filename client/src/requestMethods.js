import axios from "axios";

const baseURL = "http://localhost:5000/api/";


export const publicRequest = axios.create({ 
    baseURL: baseURL 
});

export const userRequest = axios.create({
    baseURL: baseURL,
    headers: { token: `Bearer ${localStorage.getItem("accessToken")}` },
})