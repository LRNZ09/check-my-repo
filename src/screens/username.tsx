import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { useAsync } from 'react-async'
import { AsyncStorage } from 'react-native'

import Screen from '../components/screen'
import TextInput from '../components/text-input'

const USERNAME_KEY = '@username'

const asyncGetUsername = () => AsyncStorage.getItem(USERNAME_KEY)
const asyncSetUsername = ([text]) => AsyncStorage.setItem(USERNAME_KEY, text)

const UsernameScreen: React.FC = () => {
	const navigation = useNavigation()

	const { data } = useAsync(asyncGetUsername)
	const { run: handleOnChangeText } = useAsync({ deferFn: asyncSetUsername })

	const handleSubmitEditing = useCallback(() => {
		navigation.goBack()
	}, [navigation])

	return (
		<Screen>
			<TextInput
				defaultValue={data}
				onChangeText={handleOnChangeText}
				onSubmitEditing={handleSubmitEditing}
				placeholder='Type a GitHub username'
				textContentType='username'
			/>
		</Screen>
	)
}

export { USERNAME_KEY, UsernameScreen as default }
