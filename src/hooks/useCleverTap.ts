import { useEffect } from "react";
import clevertap from "clevertap-web-sdk"; // Import the CleverTap SDK
import appConfig from "@/config/app.config";

const useCleverTap = () => {
  // Initialize CleverTap
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        // Initialize CleverTap SDK using environment variables
        clevertap.privacy.push({ optOut: false }); // Set privacy options
        clevertap.privacy.push({ useIP: false }); // Set IP sharing preference

        // Initialize the account with the account ID, token, and region
        clevertap.init(
          appConfig.cleverTabAccountId,
          appConfig.cleverTabAccountRegion,
          appConfig.cleverTabAccountToken
        );

        console.log("CleverTap initialized");
      } catch (error) {
        console.error("Failed to initialize CleverTap:", error);
      }
    }
  }, []); // Empty dependency array ensures this runs once on mount

  // Function to send events to CleverTap
  const sendEvent = (eventName: string, eventData: string | object) => {
    if (typeof window !== "undefined" && clevertap) {
      try {
        clevertap.event.push(eventName, eventData);
        console.log(`Event sent: ${eventName}`, eventData);
      } catch (error) {
        console.error(`Failed to send event '${eventName}':`, error);
      }
    }
  };

  // Function to set/update user profile
  const setUserProfile = (profileData: any) => {
    if (typeof window !== "undefined" && clevertap) {
      try {
        clevertap.profile.push(profileData);
        console.log("User profile updated:", profileData);
      } catch (error) {
        console.error("Failed to update user profile:", error);
      }
    }
  };

  return { sendEvent, setUserProfile };
};

export default useCleverTap;
