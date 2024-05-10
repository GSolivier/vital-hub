import { MontserratAlternates_700Bold, MontserratAlternates_500Medium, MontserratAlternates_600SemiBold, useFonts } from '@expo-google-fonts/montserrat-alternates';
import { Quicksand_500Medium, Quicksand_600SemiBold, Quicksand_400Regular } from '@expo-google-fonts/quicksand';
import AppRoutes from './src/settings/routes/AppRoutes';
import { StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/components/AppToast';
import { UserProvider } from './src/contexts/UserContext';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useFonts({
    MontserratAlternates_700Bold,
    MontserratAlternates_500Medium,
    MontserratAlternates_600SemiBold,
    Quicksand_600SemiBold,
    Quicksand_500Medium,
    Quicksand_400Regular
  })


  if (!fontsLoaded) {
    return null
  }

  return (
    <>
    <UserProvider>
      <AppRoutes />
      <Toast
      config={toastConfig}
        position='bottom'
        bottomOffset={20}
         />
         </UserProvider>
    </>
  );
}


