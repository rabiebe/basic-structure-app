import React from 'react'
import { SPLASH, SPLASH_DARK } from './images/images'
import { Image, View } from 'react-native'
import { useTheme } from '@/components/ui/ThemeProvider/ThemeProvider'
const Splash = () => {
  const { theme, toggleTheme } = useTheme()
  return (
    <View>
      <Image
        style={{
          resizeMode: 'cover',
          width: '100%',
          height: '100%',
        }}
        source={theme === 'dark' ? SPLASH_DARK : SPLASH}
        alt="image"
      />
    </View>
  )
}

export default Splash
