import PropTypes from 'prop-types'
import React from 'react'
import { StyleSheet, ScrollViewProps } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const styles = StyleSheet.create({
	screen: {
		flexGrow: 1,
		padding: 24,
	},
})

const Screen: React.FC<ScrollViewProps> = ({
	contentContainerStyle,
	...props
}) => (
	<ScrollView
		{...props}
		contentContainerStyle={[styles.screen, contentContainerStyle]}
	/>
)

Screen.propTypes = {
	contentContainerStyle: PropTypes.any,
}

export default Screen
