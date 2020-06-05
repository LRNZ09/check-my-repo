import {
	OpenSans_300Light,
	OpenSans_300Light_Italic,
	OpenSans_400Regular,
	OpenSans_400Regular_Italic,
	OpenSans_600SemiBold,
	OpenSans_600SemiBold_Italic,
	OpenSans_700Bold,
	OpenSans_700Bold_Italic,
	OpenSans_800ExtraBold,
	OpenSans_800ExtraBold_Italic,
	useFonts,
} from '@expo-google-fonts/open-sans'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AppLoading } from 'expo'
import React from 'react'

import HeaderBackImage from './components/header-back-image'
import DoneScreen from './screens/done'
import HomeScreen from './screens/home'
import RepositoryScreen from './screens/repository'
import UsernameScreen from './screens/username'

const NAVIGATOR_SCREEN_OPTIONS = {
	headerBackImage: HeaderBackImage,
	headerBackTitleVisible: false,
	headerTitleAlign: 'left',
	headerTitleStyle: {
		fontFamily: 'OpenSans_800ExtraBold',
		textTransform: 'uppercase',
	},
}

const Stack = createStackNavigator()

const App: React.FC = () => {
	const [fontsLoaded] = useFonts({
		OpenSans_300Light,
		OpenSans_300Light_Italic,
		OpenSans_400Regular,
		OpenSans_400Regular_Italic,
		OpenSans_600SemiBold,
		OpenSans_600SemiBold_Italic,
		OpenSans_700Bold,
		OpenSans_700Bold_Italic,
		OpenSans_800ExtraBold,
		OpenSans_800ExtraBold_Italic,
	})

	if (!fontsLoaded) return <AppLoading />

	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={NAVIGATOR_SCREEN_OPTIONS}>
				<Stack.Screen component={HomeScreen} name='home' />
				<Stack.Screen component={UsernameScreen} name='username' />
				<Stack.Screen component={RepositoryScreen} name='repository' />
				<Stack.Screen component={DoneScreen} name='done' />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default App
