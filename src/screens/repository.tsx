import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useContext } from 'react'

import Screen from '../components/screen'
import TextInput from '../components/text-input'
import GlobalStateContext from '../utils/global-state-context'

const INITIAL_REPOSITORY_TEXT = 'repository'

const RepositoryScreen: React.FC = () => {
	const navigation = useNavigation()

	const [globalState, setGlobalState] = useContext(GlobalStateContext)

	const handleOnChangeText = useCallback((text) => {
		setGlobalState({ repository: text })
	}, [])

	const handleSubmitEditing = useCallback(() => {
		navigation.goBack()
	}, [navigation])

	return (
		<Screen>
			<TextInput
				defaultValue={globalState.repository}
				onChangeText={handleOnChangeText}
				onSubmitEditing={handleSubmitEditing}
				placeholder='Type a GitHub repository'
			/>
		</Screen>
	)
}

export { INITIAL_REPOSITORY_TEXT, RepositoryScreen as default }
