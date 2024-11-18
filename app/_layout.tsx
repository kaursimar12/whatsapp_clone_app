import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Link, Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store'
import { TouchableOpacity, View } from 'react-native';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;


const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key)
      if (item) {
        console.log(`${key} was used 🔐 \n`)
      } else {
        console.log('No values stored under key: ' + key)
      }
      return item
    } catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const router = useRouter();
  const segments = useSegments();
  const { isLoaded, isSignedIn } = useAuth();
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  
  useEffect(() => {
    if (!isLoaded){
      return
    }
    const inTabsGroup = segments[0] === '(tabs)';

    console.log('isSignedIn changed', isSignedIn)

    if( isSignedIn && !inTabsGroup){
      router.replace('/(tabs)/chats');
    }
    else if (!isSignedIn){
      router.replace('/');
    }
  },[isSignedIn])
  if (!loaded) {
    return <View />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="otp" options={{  headerTitleAlign: 'center', headerTitle:'Enter your phone number', headerBackVisible: false }} />
      <Stack.Screen name="verify/[phone]" options={{  headerTitleAlign: 'center', headerTitle:'verify your phone number', headerBackTitle: 'Edit Number', headerBackTitleVisible: true, }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(modals)/new-chat" options={{ 
        presentation: 'modal',
        title: 'New Chat',
        headerTitleAlign: 'center',
        // headerTransparent: true,
        headerBlurEffect: 'regular',
        headerStyle: {
          backgroundColor: '#fff'
        },
        headerRight: () => (
          <Link href={'/(tabs)/chats/'} asChild>
            <TouchableOpacity style={{ backgroundColor: Colors.background, borderRadius: 20, padding: 4, marginRight: 10}}>
              <Ionicons name="close" color={Colors.gray} size={30} />
            </TouchableOpacity>
          </Link>
        )
       }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
    </Stack>
);;
}

const RootLayoutNav = () => {

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
    <InitialLayout />
  </ClerkProvider>
  );
}

export default RootLayoutNav;