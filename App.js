import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import KittenCard from "./components/KittenCard";

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="light" translucent={false}/>
          <ScrollView>
            <KittenCard 
              title="Gatinho lindo!" 
              text="Textinho sobre o gatinho."
              buttonLabel="Saber sobre gatinho"
              image="https://placekitten.com/390/240"
            />
            <KittenCard 
              title="Gatinho fofo!" 
              text="Textinho sobre o gatinho fofo."
              image="https://placekitten.com/390/240"
            />
            <KittenCard 
              title="Gatinho lindo e fofo!" 
              text="Textinho sobre o gatinho."
            />
          </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
});