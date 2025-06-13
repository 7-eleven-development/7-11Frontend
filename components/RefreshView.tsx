import { RefreshControl, ScrollView, ScrollViewProps } from "react-native";

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
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      {...props}
    >
      {children}
    </ScrollView>
  );
};

export default RefreshView;
