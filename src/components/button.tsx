import PropTypes from 'prop-types'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {
	BorderlessButton,
	BorderlessButtonProperties,
} from 'react-native-gesture-handler'

const styles = StyleSheet.create({
	buttonContainer: {
		alignSelf: 'flex-end',
		flex: 1,
		justifyContent: 'flex-end',
		padding: 8,
	},
	buttonText: {
		color: 'black',
		fontFamily: 'OpenSans_700Bold',
		fontSize: 20,
		textTransform: 'uppercase',
	},
	buttonTextDisabled: {
		color: 'grey',
	},
})

const Button: React.FC<BorderlessButtonProperties> = ({
	children,
	disabled = false,
	...props
}) => (
	<View style={styles.buttonContainer}>
		<BorderlessButton {...props} enabled={!disabled}>
			<Text style={[styles.buttonText, disabled && styles.buttonTextDisabled]}>
				{children}
			</Text>
		</BorderlessButton>
	</View>
)

Button.propTypes = {
	children: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
}

export default Button
