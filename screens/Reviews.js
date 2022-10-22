import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { styles } from './styles';

import KittenCard from "../components/KittenCard";

export default function Reviews() {
  return (
    <PaperProvider>
      <View style={styles.container}>
      <View style={{ paddingHorizontal: 10, paddingBottom: 12 }}>
        <Text style={styles.listTitle}>
          Reviews
        </Text>
        <Text style={styles.listSubtitle}>
          Veja o que estão comentando sobre os últimos lançamentos.
        </Text>
      </View>

      <StatusBar style="auto" translucent={false} />
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f0f0', padding: 10 }}>
          <ScrollView>
            <KittenCard
              style={{ marginBottom: 21 }}
              image="https://bloody-disgusting.com/wp-content/uploads/2022/08/darkiubg.png"
              title="Don't Worry Darling"
              titleStyle={{ color: '#1F1E25', fontSize: 16, fontWeight: 'bold', marginTop: 2 }}
            >
              <Text style={{ color: '#6B6B6B', fontSize: 14 }}>
                Muito lindos, nota 10.
              </Text>
            </KittenCard>
            <KittenCard
              style={{ marginBottom: 21 }}
              image="https://zonasombria.com.br/wp-content/uploads/2017/05/Get-Out-movie-song.jpg"
              title="Get Out"
              titleStyle={{ color: '#1F1E25', fontSize: 16, fontWeight: 'bold', marginTop: 2 }}
            >
              <Text style={{ color: '#6B6B6B', fontSize: 14 }}>
                Muito bom, já vi 10 vezes, (não ironicamente).
              </Text>
            </KittenCard>
            <KittenCard
              style={{ marginBottom: 21 }}
              image="https://static1.colliderimages.com/wordpress/wp-content/uploads/2021/09/jordan-peele-nope.jpg"
              title="NOPE"
              titleStyle={{ color: '#1F1E25', fontSize: 16, fontWeight: 'bold', marginTop: 2 }}
            >
              <Text style={{ color: '#6B6B6B', fontSize: 14 }}>
                Muito bom, recomendo.
              </Text>
            </KittenCard>
          </ScrollView>
        </SafeAreaView>
      </View>
    </PaperProvider>
  );
}