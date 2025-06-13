import { StyleSheet, FlatList, ListRenderItem } from "react-native";
import Card from "@/components/Card";
import ThemedView from "@/components/ThemedView";
import Header from "@/components/Header";
import useHomeContext from "@/context/home/useHomeConext";
import useRefresh from "@/hooks/useRefresh";
import { useCardData } from "@/hooks/useCardData";
import { CardData } from "@/types/cards";

const Index = () => {
  const { homeData, refreshData } = useHomeContext();
  const { refreshing, handleRefresh } = useRefresh(refreshData);
  const cardData = useCardData(homeData);

  const renderCard: ListRenderItem<CardData> = ({ item }) => (
    <Card cardData={item} />
  );

  const keyExtractor = (item: CardData) => item.type;

  return (
    <ThemedView style={styles.container}>
      <Header
        locationName={homeData.location.name}
        temperature={homeData.temperature}
      />
      <FlatList
        data={cardData}
        renderItem={renderCard}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        bounces={true}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
});

export default Index;
