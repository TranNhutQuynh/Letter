import { useEffect } from "react";
import { trackVisit } from "../services/api";

export const useTrackVisit = () => {
  useEffect(() => {
    const track = async () => {
      // Kiểm tra xem đã track trong session chưa
      const tracked = sessionStorage.getItem("visit_tracked");

      if (!tracked) {
        try {
          await trackVisit();
          sessionStorage.setItem("visit_tracked", "true");
          console.log("✅ Visit tracked successfully");
        } catch (error) {
          console.error("❌ Failed to track visit:", error);
        }
      }
    };

    track();
  }, []);
};