import React from 'react'

import {
	Text,
	StyleSheet,
	Image,
	View,
	TouchableOpacity,
} from 'react-native'

const excludedProps = ['containerStyle', 'onPress', 'style', 'left', 'right', 'top', 'bottom']

class TextWrap extends React.Component {
	_textRef

	setNativeProps = (nativeProps) => {
    this._textRef.setNativeProps(nativeProps);
  }

	_renderText = () => {
		let textStyles = [styles.defaultText, this.props.style]
		let cloneProps = { ...this.props }
		excludedProps.forEach(propName => {
			delete cloneProps[propName]
		})
		if (this.props.children) {
			return <Text ref={ref => {if (ref) this._textRef = ref}} {...cloneProps} style={textStyles}>{this.props.children}</Text>
		}
		
		return null
	}

	_renderPart = (part) => {
		if (!part) return null
		if (part.render) return part.render()
		if (part.icon) {
			icon = <Image source={part.icon} style={part.style} />	
			if (part.onPress) icon = <TouchableOpacity style={[]} onPress={part.onPress}>{icon}</TouchableOpacity>
			return icon
		}

		return null
	}

	_combineParts = (leadingPart, text, trailingPart, wrapStyle) => {
		let accum = [leadingPart, text, trailingPart].reduce((accum, curr) => ({
			count: accum.count + (curr ? 1 : 0),
			last: curr || accum.last
		}), { count: 0, last: null })
		if (accum.count <= 1) return accum.last
		
		return (
			<View style={[wrapStyle]}>
				{leadingPart}
				{text}
				{trailingPart}
			</View>
		)
	}

	render() {
		const { left, right, top, bottom, onPress, containerStyle } = this.props
		let partLeft = this._renderPart(left)
		let partRight = this._renderPart(right)
		let partTop = this._renderPart(top)
		let partBottom = this._renderPart(bottom)
		let text = this._renderText()

		if (onPress && text) {
			text = <TouchableOpacity style={[]} onPress={onPress}>{text}</TouchableOpacity>
		}

		text = this._combineParts(partLeft, text, partRight, styles.horizontalWrap)
		text = this._combineParts(partTop, text, partBottom, styles.verticalWrap)

		if (containerStyle) {
			if (text.type === Text || text.type === Image) {
				text = <View style={[]}>{text}</View>
			}
			text.props.style.push(styles.defaultContainer, containerStyle)
		}
		
		return text
	}
}

export default TextWrap

const styles = StyleSheet.create({
	verticalWrap: {
		alignItems: 'center'
	},

	horizontalWrap: {
		flexDirection: 'row',
		alignItems: 'center',
	},

	defaultText: {
		// add common font style/color/size... here
		backgroundColor: 'transparent'
	},

	defaultContainer: {
		backgroundColor: 'transparent'
	}
})