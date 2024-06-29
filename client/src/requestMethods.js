import axios from "axios";

const baseURL = "http://localhost:5000/api/";
const Token = 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzQxYzIyYjQ1YzI0MzkwNzU1NjU5ZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjQ3NzI3N30.0n9h7k6kzS7JqSf6Eo7H9OuZ6pWkXyZpV'


export const publicRequest = axios.create({ 
    baseURL: baseURL 
});

export const userRequest = axios.create({
    baseURL: baseURL,
    headers: { token: `Bearer ${localStorage.getItem("accessToken")}` },
})