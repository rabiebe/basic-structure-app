import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from '@react-navigation/native'
import '@/global.css'
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
// import * as SplashScreen from 'expo-splash-screen'
import Splach from '../app/splash/splash'
import { useEffect, useState } from 'react'
import 'react-native-reanimated'

import {
  ThemeProvider as CustomThemeProvider,
  useTheme,
} from '@/components/ui/ThemeProvider/ThemeProvider'

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  // Hide splash screen once fonts are loaded
  // useEffect(() => {
  //   if (loaded) {
  //     // SplashScreen.hideAsync()
  //   }
  // }, [loaded])

  // if (!loaded) {
  //   return null
  // }

  return (
    <CustomThemeProvider>
      <AppContent />
    </CustomThemeProvider>
  )
}

function AppContent() {
  const [loading, setLoading] = useState(true)
  const { theme, toggleTheme } = useTheme() // Access theme and toggleTheme from custom ThemeProvider
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  })
  return (
    <GluestackUIProvider mode={theme}>
      <NavigationThemeProvider
        value={theme === 'dark' ? DarkTheme : DefaultTheme}
      >
        {loading ? (
          <Splach />
        ) : (
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        )}
      </NavigationThemeProvider>
    </GluestackUIProvider>
  )
}
