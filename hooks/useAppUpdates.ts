import { useEffect } from "react";
import * as Updates from "expo-updates";

export const useAppUpdates = () => {
  useEffect(() => {
    const checkForUpdates = async () => {
      if (__DEV__) {
        console.log("Development mode - skipping update check");
        return;
      }

      try {
        console.log("Checking for updates...");
        const update = await Updates.checkForUpdateAsync();

        if (update.isAvailable) {
          console.log("Update available, fetching...");
          await Updates.fetchUpdateAsync();
          console.log("Update fetched, reloading...");
          await Updates.reloadAsync();
        } else {
          console.log("No updates available");
        }
      } catch (error) {
        console.error("Error checking for updates:", error);
      }
    };

    checkForUpdates();
  }, []);
};
