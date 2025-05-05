import { useState, useEffect } from "react";

const useDialogSize = (): string => {
  const [size, setSize] = useState<string>("md");

  useEffect(() => {
    const updateSize = () => {
      setSize(window.innerWidth < 768 ? "xxl" : "md");
    };

    updateSize(); // Set the initial size
    window.addEventListener("resize", updateSize); // Listen for window resize

    return () => window.removeEventListener("resize", updateSize); // Cleanup on unmount
  }, []);

  return size;
};

export default useDialogSize;
