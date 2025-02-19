'use client'
import axios from "axios";
import { encryptAndBase64 } from "./Encryption";
import { getSessionData } from "@/components/utils/deviceId";

const api = axios.create({
  baseURL: "/api/endpoint/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to generate hash
const generateHash = async (data: any, secret: string) => {
  return 
};
// Function to retrieve device data from localStorage
const getDeviceData = () => {
    if (typeof window === "undefined") return { deviceId: "null", secret: "null" };
  
    const deviceId = localStorage.getItem("deviceId");
    const secret = localStorage.getItem("secret") || "null";
    return { deviceId, secret };
  };
// Add interceptors to modify requests
api.interceptors.request.use(async (config) => {
  const { deviceId, secret, salt } = getSessionData();
  const timestamp = Date.now().toString();
  const jsonData = {
    "version":"1",
    timestamp,
    "os":"web",
    deviceId}
  const jsonString = JSON.stringify(jsonData)

  const hash = encryptAndBase64(jsonString, secret, salt) + salt;
  if (deviceId) {
    config.headers["deviceId"] = jsonData.deviceId;
    config.headers["timestamp"] = jsonData.timestamp;
    config.headers["version"] = jsonData.version;;
    config.headers["os"] = jsonData.os;

    if (config.data && secret) {
      config.headers["hash"] = hash;
    }
  }
  console.log("headers---",config.headers)
  return config;
});

export default api;
