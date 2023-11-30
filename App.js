import { useCallback } from 'react'
import StackNavigator from './navigations/StackNavigator';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from 'react-redux';
import store from './store';
import { ModalPortal } from 'react-native-modals';
import { UserContext } from './UserContext';

export default function App() {
  const [fontsLoaded] = useFonts({
    'bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'light': require('./assets/fonts/Poppins-Light.ttf'),
    'extrabold': require('./assets/fonts/Poppins-ExtraBold.ttf'),
    'medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'semibold': require('./assets/fonts/Poppins-SemiBold.ttf'),

  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Provider store={store}>
        <UserContext>
          <StackNavigator onLayout={onLayoutRootView} />
          <ModalPortal />
        </UserContext>
      </Provider>
    </>
  );
}
