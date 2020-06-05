import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useContext } from 'react'

import Screen from '../components/screen'
import TextInput from '../components/text-input'
import GlobalStateContext from '../utils/global-state-context'

const INITIAL_USERNAME_TEXT = 'username'

const UsernameScreen: React.FC = () => {
	const navigation = useNavigation()

	const [globalState, setGlobalState] = useContext(GlobalStateContext)

	const handleOnChangeText = useCallback((text) => {
		setGlobalState({ username: text })
	}, [])

	const handleSubmitEditing = useCallback(() => {
		navigation.goBack()
	}, [navigation])

	return (
		<Screen>
			<TextInput
				defaultValue={globalState.username}
				onChangeText={handleOnChangeText}
				onSubmitEditing={handleSubmitEditing}
				placeholder='Type a GitHub username'
				textContentType='username'
			/>
		</Screen>
	)
}

export { INITIAL_USERNAME_TEXT, UsernameScreen as default }
