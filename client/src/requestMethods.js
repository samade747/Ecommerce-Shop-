import axios from "axios";

const baseURL = "http://localhost:5000/api/";
const TOKEN = `JSON.parse(localStorage.getItem("persist:root"))?.user).currentUser?.accessToken || null`;


export const publicRequest = axios.create({ 
    baseURL: baseURL,
});



export const userRequest = axios.create({
    baseURL: baseURL,
    headers: { token: `Bearer ${TOKEN}` },
});
