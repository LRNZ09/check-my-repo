import { useNavigation, useIsFocused } from '@react-navigation/native'
import axios from 'axios'
import React, { useCallback, useState, useEffect } from 'react'
import { useAsync } from 'react-async'
import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	AsyncStorage,
} from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'

import Button from '../components/button'
import Screen from '../components/screen'
import { USERNAME_KEY } from './username'
import { REPOSITORY_KEY } from './repository'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
	},
	error: {
		paddingVertical: 24,
	},
	errorText: {
		fontFamily: 'OpenSans_400Regular',
		fontSize: 24,
	},
	errorTextEmphasized: {
		fontFamily: 'OpenSans_700Bold',
	},
	loading: {
		alignSelf: 'flex-end',
		flex: 1,
		justifyContent: 'flex-end',
		padding: 8,
	},
	row: {
		flexDirection: 'row',
	},
	screenError: {
		backgroundColor: 'lightcoral',
	},
	screenSuccess: {
		backgroundColor: 'lightgreen',
	},
	text: {
		fontFamily: 'OpenSans_700Bold',
		fontSize: 24,
		paddingBottom: 32,
	},
	textURL: {
		fontFamily: 'OpenSans_400Regular',
		fontSize: 32,
	},
	textURLButton: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 4,
	},
	textURLButtonText: {
		fontFamily: 'OpenSans_400Regular',
		fontSize: 28,
	},
	textURLButtonTextPlaceholder: {
		color: 'grey',
	},
})

const asyncGetUsernameAndRepository = () =>
	AsyncStorage.multiGet([USERNAME_KEY, REPOSITORY_KEY])

const HomeScreen: React.FC = () => {
	const isFocused = useIsFocused()

	const navigation = useNavigation()

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [ghResponseData, setGhResponseData] = useState<{
		html_url: string
	} | null>(null)

	const {
		data: [[, username] = [], [, repository] = []] = [],
	} = useAsync(asyncGetUsernameAndRepository, { watch: isFocused })

	const handleUserButtonPress = useCallback(() => {
		navigation.navigate('username')
	}, [navigation])

	const handleRepositoryButtonPress = useCallback(() => {
		navigation.navigate('repository')
	}, [navigation])

	const handleCheckButtonPress = useCallback(async () => {
		setLoading(true)

		const url = `https://api.github.com/repos/${username}/${repository}`
		try {
			const response = await axios.get(url)
			setGhResponseData(response.data)
			setError(false)
		} catch {
			setError(true)
		} finally {
			setLoading(false)
		}
	}, [repository, username])

	const handleSendButtonPress = useCallback(async () => {
		setLoading(true)

		const url = 'https://pushmore.io/webhook/d3Gm4aEPCuhAUjfbECLLdW41'
		await axios.post(url, ghResponseData.html_url)

		setGhResponseData(null)
		setLoading(false)

		navigation.navigate('done')
	}, [ghResponseData])

	useEffect(() => {
		setError(false)
		setGhResponseData(null)
	}, [username, repository])

	return (
		<Screen
			contentContainerStyle={[
				error && styles.screenError,
				ghResponseData && styles.screenSuccess,
			]}
		>
			<Text style={styles.text}>Set the repository address</Text>

			<Text style={styles.textURL}>github.com</Text>
			<View style={styles.row}>
				<Text style={styles.textURL}>/</Text>
				<BorderlessButton
					onPress={handleUserButtonPress}
					style={styles.textURLButton}
				>
					<Text
						style={[
							styles.textURLButtonText,
							!username && styles.textURLButtonTextPlaceholder,
						]}
					>
						{username || 'username'}
					</Text>
				</BorderlessButton>
			</View>
			<View style={styles.row}>
				<Text style={styles.textURL}>/</Text>
				<BorderlessButton
					onPress={handleRepositoryButtonPress}
					style={styles.textURLButton}
				>
					<Text
						style={[
							styles.textURLButtonText,
							!repository && styles.textURLButtonTextPlaceholder,
						]}
					>
						{repository || 'repository'}
					</Text>
				</BorderlessButton>
			</View>

			{error && (
				<View style={styles.error}>
					<Text style={styles.errorText}>
						Check your <Text style={styles.errorTextEmphasized}>username</Text>{' '}
						or your <Text style={styles.errorTextEmphasized}>repository</Text>{' '}
						name
					</Text>
				</View>
			)}

			{loading ? (
				<ActivityIndicator style={styles.loading} size='large' />
			) : (
				<Button
					disabled={!(username && repository)}
					onPress={
						ghResponseData ? handleSendButtonPress : handleCheckButtonPress
					}
				>
					{ghResponseData ? 'Send' : 'Check'}
				</Button>
			)}
		</Screen>
	)
}

export default HomeScreen
