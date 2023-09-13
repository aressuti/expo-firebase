import { SafeAreaView } from 'react-native';
import Rotas from './src/rotas'
import { useFonts, Roboto_700Bold, Roboto_500Medium } from '@expo-google-fonts/roboto';

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Roboto_700Bold,
    Roboto_500Medium
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }  

  return (
    <SafeAreaView style={{ flex: 1}}>
    <Rotas />

    </SafeAreaView>
  );
}