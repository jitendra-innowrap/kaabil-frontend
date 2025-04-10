"use client";
import axios from "axios";
import { encryptAndBase64 } from "./Encryption";
import { getAuthToken, getSessionData } from "@/components/utils/deviceId";
import { job_listing_base_uri } from "@/config/app.config";

const api = axios.create({
  baseURL: "/api/endpoint/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptors to modify requests
api.interceptors.request.use(async (config) => {
  const { deviceId, secret, salt } = getSessionData();
  const token = getAuthToken();
  const timestamp = Date.now().toString();
  const jsonData = {
    version: "1",
    timestamp,
    os: "web",
    deviceId,
  };
  const jsonString = JSON.stringify(jsonData);

  const hash = encryptAndBase64(jsonString, secret, salt) + salt;
  if (deviceId) {
    config.headers["deviceId"] = jsonData.deviceId;
    config.headers["timestamp"] = jsonData.timestamp;
    config.headers["version"] = jsonData.version;
    config.headers["os"] = jsonData.os;

    if (secret) {
      config.headers["hash"] = hash;
    }
    if (token) {
      config.headers["token"] = token;
    }
  }
  return config;
});

export const api2 = axios.create({
  baseURL: job_listing_base_uri,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptors to modify requests
api2.interceptors.request.use(async (config) => {
  const { deviceId, secret, salt } = getSessionData();
  const token = getAuthToken();
  const timestamp = Date.now().toString();
  const jsonData = {
    version: "1",
    timestamp,
    os: "web",
    deviceId,
  };
  const jsonString = JSON.stringify(jsonData);

  const hash = encryptAndBase64(jsonString, secret, salt) + salt;
  if (deviceId) {
    config.headers["deviceId"] = jsonData.deviceId;
    config.headers["timestamp"] = jsonData.timestamp;
    config.headers["version"] = jsonData.version;
    config.headers["os"] = jsonData.os;

    if (secret) {
      config.headers["hash"] = hash;
    }
    if (token) {
      config.headers["token"] = token;
    }
  }
  return config;
});

export const api3 = axios.create({
  baseURL: "/api/branchendpoint/",
  headers: {
    "Content-Type": "application/json",
  },
});

api3.interceptors.request.use(async (config) => {
  const { deviceId, secret, salt } = getSessionData();
  const token = getAuthToken();
  const timestamp = Date.now().toString();
  const jsonData = {
    version: "1",
    timestamp,
    os: "web",
    deviceId,
  };
  const jsonString = JSON.stringify(jsonData);
  const hash = encryptAndBase64(jsonString, secret, salt) + salt;
  if (deviceId) {
    config.headers["deviceId"] = jsonData.deviceId;
    config.headers["timestamp"] = jsonData.timestamp;
    config.headers["version"] = jsonData.version;
    config.headers["os"] = jsonData.os;

    if (secret) {
      config.headers["hash"] = hash;
    }
    if (token) {
      config.headers["token"] = token;
    }
  }
  return config;
});

export default api;
