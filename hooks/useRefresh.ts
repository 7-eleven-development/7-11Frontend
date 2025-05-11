import { useState, useCallback } from "react";

const useRefresh = <T>(refreshFn: () => Promise<T>) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    if (refreshing) return;
    setRefreshing(true);

    try {
      // Execute the refresh function
      await refreshFn();

      // Add a small consistent delay before ending the refresh state
      // This ensures the spinner is visible for a meaningful amount of time
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error("Refresh error:", error);
    } finally {
      setRefreshing(false);
    }
  }, [refreshFn, refreshing]);

  return { refreshing, handleRefresh };
};

export default useRefresh;
