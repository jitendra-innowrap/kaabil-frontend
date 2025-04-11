// useCleverTap.js
import { useEffect } from "react";
import clevertap from "clevertap-web-sdk"; // Import the CleverTap SDK
import appConfig from "@/config/app.config";

const useCleverTap = () => {
  // Initialize CleverTap
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initialize CleverTap SDK using environment variables
      clevertap.privacy.push({ optOut: false }); // Set privacy options
      clevertap.privacy.push({ useIP: false }); // Set IP sharing preference
      // Initialize the account with the account ID, token, and region
      clevertap.init(
        appConfig.cleverTabAccountId,
        appConfig.celverTabAccountRegion,
        appConfig.cleverTabAccountToken
      );

      console.log("CleverTap initialized");
    }
  }, []); // Empty dependency array ensures this runs once on mount

  // Function to send events to CleverTap
  const sendEvent = (eventName: string, eventData: string | object) => {
    if (typeof window !== "undefined" && clevertap) {
      clevertap.event.push(eventName, eventData);
      console.log(`Event sent: ${eventName}`, eventData);
    }
  };

  // Function to set/update user profile
  const setUserProfile = (profileData: any) => {
    if (typeof window !== "undefined" && clevertap) {
      clevertap.profile.push(profileData);
      console.log("User profile updated:", profileData);
    }
  };

  return { sendEvent, setUserProfile };
};

export default useCleverTap;

// Usage Over Here

// const { sendEvent, setUserProfile } = useCleverTap();

// const handleLogin = () => {
//   // Example: Sending a login event
//   sendEvent("User Logged In", { userId: "user123", timestamp: Date.now() });

//   // Example: Setting user profile
//   setUserProfile({
//     name: "John Doe",
//     email: "john@example.com",
//     phone: "+1234567890",
//   });
// };
