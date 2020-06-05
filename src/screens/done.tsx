import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { StyleSheet, Text } from 'react-native'

import Button from '../components/button'
import Screen from '../components/screen'

const styles = StyleSheet.create({
	text: {
		fontFamily: 'OpenSans_700Bold',
		fontSize: 32,
		textAlign: 'center',
	},
})

const DoneScreen: React.FC = () => {
	const navigation = useNavigation()

	const handleCoolButtonPress = useCallback(() => {
		navigation.goBack()
	}, [navigation])

	return (
		<Screen>
			<Text style={styles.text}>All done!</Text>
			<Text style={styles.text}>Repository URL sent.</Text>

			<Button onPress={handleCoolButtonPress}>Cool</Button>
		</Screen>
	)
}

export default DoneScreen
