import { RefreshControl, ScrollView, ScrollViewProps } from "react-native";
import { useRef } from "react";

interface RefreshViewProps extends ScrollViewProps {
  refreshing: boolean;
  onRefresh: () => void;
  showRefreshSpinner?: boolean;
  children: React.ReactNode;
}

const RefreshView = ({
  refreshing,
  onRefresh,
  children,
  ...props
}: RefreshViewProps) => {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          // colors={["transparent"]}
          // tintColor="transparent"
          // style={{ backgroundColor: "transparent" }}
          // progressBackgroundColor="transparent"
        />
      }
      {...props}
    >
      {children}
    </ScrollView>
  );
};

export default RefreshView;
