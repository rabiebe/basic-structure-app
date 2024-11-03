import { Button, ButtonIcon, ButtonText } from '@/components/ui/button'
import { Center } from '@/components/ui/center'
import { Icon } from '@/components/ui/icon'
import { Text } from '@/components/ui/text'
import { Dimensions, View } from 'react-native'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit'
import { Sun, Moon } from 'lucide-react-native'
import { useState } from 'react'
import { useTheme } from '@/components/ui/ThemeProvider/ThemeProvider'

export default function HomeScreen() {
  const { theme, toggleTheme } = useTheme()

  return (
    <View>
      <Text>Bezier Line Chart</Text>
      <LineChart
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={Dimensions.get('window').width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      {/* dark mode icon sun and moon  */}
      {theme === 'dark' ? (
        <Moon color={'white'} size={48} onPress={toggleTheme} />
      ) : (
        <Sun color={'black'} size={48} onPress={toggleTheme} />
      )}
    </View>
  )
}
