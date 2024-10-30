import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import '@/global.css'
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState, useMemo } from 'react'
import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/useColorScheme'
import { Box } from '@/components/ui/box'
import { Button, ButtonText } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { View } from 'react-native'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light')
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  // Memoize the colorMode value to avoid unnecessary re-renders
  const colorModeValue = useMemo(
    () => ({ colorMode, setColorMode }),
    [colorMode]
  )

  if (!loaded) {
    return null
  }

  return (
    <GluestackUIProvider mode={colorModeValue.colorMode}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <Box className="bg-white dark:bg-black flex-1">
          <Button
            onPress={() => {
              setColorMode(colorMode === 'light' ? 'dark' : 'light')
            }}
          >
            <ButtonText>Toggle color mode</ButtonText>
          </Button>
        </Box>
      </ThemeProvider>
    </GluestackUIProvider>
  )
}
