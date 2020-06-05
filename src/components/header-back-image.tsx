import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
	imageContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 16,
	},
})

const HeaderBackImage: React.FC = () => (
	<View style={styles.imageContainer}>
		<Image source={require('../assets/images/back.png')} />
	</View>
)

export default HeaderBackImage
