import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from '@react-navigation/native'
import '@/global.css'
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'

import { Box } from '@/components/ui/box'
import { Button, ButtonText } from '@/components/ui/button'

import {
  ThemeProvider as CustomThemeProvider,
  useTheme,
} from '@/components/ui/ThemeProvider/ThemeProvider'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <CustomThemeProvider>
      <AppContent />
    </CustomThemeProvider>
  )
}

function AppContent() {
  const { theme, toggleTheme } = useTheme() // Access theme and toggleTheme from custom ThemeProvider

  return (
    <GluestackUIProvider mode={theme}>
      <NavigationThemeProvider
        value={theme === 'dark' ? DarkTheme : DefaultTheme}
      >
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        {/* <Box className="bg-white dark:bg-black flex-1">
          <Button onPress={toggleTheme}>
            <ButtonText>Toggle color mode</ButtonText>
          </Button>
        </Box> */}
      </NavigationThemeProvider>
    </GluestackUIProvider>
  )
}
