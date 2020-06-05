import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { AsyncStorage } from 'react-native'

import Screen from '../components/screen'
import TextInput from '../components/text-input'
import { useAsync } from 'react-async'

const REPOSITORY_KEY = '@repository'

const asyncGetRepository = () => AsyncStorage.getItem(REPOSITORY_KEY)
const asyncSetRepository = ([text]) =>
	AsyncStorage.setItem(REPOSITORY_KEY, text)

const RepositoryScreen: React.FC = () => {
	const navigation = useNavigation()

	const { data } = useAsync(asyncGetRepository)
	const { run: handleOnChangeText } = useAsync({ deferFn: asyncSetRepository })

	const handleSubmitEditing = useCallback(() => {
		navigation.goBack()
	}, [navigation])

	return (
		<Screen>
			<TextInput
				defaultValue={data}
				onChangeText={handleOnChangeText}
				onSubmitEditing={handleSubmitEditing}
				placeholder='Type a GitHub repository'
			/>
		</Screen>
	)
}

export { REPOSITORY_KEY, RepositoryScreen as default }
