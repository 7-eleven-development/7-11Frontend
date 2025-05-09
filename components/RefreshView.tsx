import { StyleSheet, RefreshControl, ScrollView } from "react-native";

interface Props {
  refreshing: boolean;
  onRefresh: () => void;
  children?: React.ReactNode;
}

const RefreshView = ({ refreshing, onRefresh, children }: Props) => {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {children}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
});
export default RefreshView;
