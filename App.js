import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

function KittenCard(){

}

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View>
            <Text>Teste</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
