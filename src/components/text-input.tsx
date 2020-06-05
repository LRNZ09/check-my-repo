import React from 'react'
import { StyleSheet, TextInputProps } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

const styles = StyleSheet.create({
	textInput: {
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		paddingBottom: 2,
		fontSize: 16,
	},
})

const BaseTextInput: React.FC<TextInputProps> = (props) => (
	<TextInput
		autoCapitalize='none'
		autoCorrect={false}
		autoFocus
		clearButtonMode='while-editing'
		enablesReturnKeyAutomatically
		placeholderTextColor='grey'
		returnKeyType='done'
		style={styles.textInput}
		underlineColorAndroid='transparent'
		{...props}
	/>
)

export default BaseTextInput
