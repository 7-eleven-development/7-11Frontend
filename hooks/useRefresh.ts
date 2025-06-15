import { useState, useCallback } from "react";
import { AccessibilityInfo } from "react-native";

const useRefresh = <T>(refreshFn: () => Promise<T>) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    if (refreshing) return;
    setRefreshing(true);

    try {
      AccessibilityInfo.announceForAccessibility("Uppdaterar data");

      await refreshFn();

      await new Promise((resolve) => setTimeout(resolve, 500));

      AccessibilityInfo.announceForAccessibility("Data har uppdaterats");
    } catch (error) {
      console.error("Refresh error:", error);
      AccessibilityInfo.announceForAccessibility("Kunde inte uppdatera data");
    } finally {
      setRefreshing(false);
    }
  }, [refreshFn, refreshing]);

  return { refreshing, handleRefresh };
};

export default useRefresh;
