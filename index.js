import React from 'react'

import {
	Text,
	StyleSheet,
	Image,
	View,
	TouchableOpacity,
} from 'react-native'

import omit from 'lodash/omit'

const excludedProps = ['containerStyle', 'touchable', 'onPress', 'style', 'left', 'right', 'top', 'bottom']

class TextWrap extends React.Component {
	_textRef

	setNativeProps = (nativeProps) => {
    this._textRef.setNativeProps(nativeProps);
  }

	_renderText = () => {
		let textStyles = [styles.defaultText, this.props.style]
		let cloneProps = omit(this.props, excludedProps)
		return <Text ref={ref => {if (ref) this._textRef = ref}} {...cloneProps} style={textStyles}>{this.props.children}</Text>
	}

	_renderPart = (part) => {
		if (!part) return null
		if (part.render) return part.render()
		if (part.icon) {
			icon = <Image source={part.icon} style={[part.style]} />	
			if (part.onPress) icon = <TouchableOpacity style={[]} onPress={part.onPress}>{icon}</TouchableOpacity>
			return icon
		}

		return null
	}

	_combineParts = (parts, wrapStyle) => {
		let accum = parts.reduce((accum, curr) => ({
			count: accum.count + (!!curr ? 1 : 0),
			last: curr || accum.last
		}), { count: 0, last: null })
		if (accum.count == 1) return accum.last
		
		return (
			<View style={[wrapStyle]}>
				{parts}
			</View>
		)
	}

	_makeTouchable = text => {
		const { onPress, touchable } = this.props
		if (!onPress) return text
		
		let TouchableComponent, touchableStyle
		if (!!touchable) {
			TouchableComponent = touchable.component
			touchableStyle = touchable.style
		}

		if (!TouchableComponent) TouchableComponent = TouchableOpacity
		if (!touchableStyle) touchableStyle = []
		
		return <TouchableComponent style={[touchableStyle]} onPress={onPress}>{text}</TouchableComponent>
	}

	_wrapContainer = text => {
		const { onPress, containerStyle, touchable } = this.props
		if (!containerStyle) return text
		
		let hasWrapped = !!onPress || text.type === View
		let hasTouchableStyle = !!onPress && touchable && touchable.style
		if (!hasWrapped || hasTouchableStyle) {
			text = <View style={[styles.defaultContainer]}>{text}</View>
		}
			
		text.props.style.push(styles.defaultContainer, containerStyle)
		
		return text
	}

	render() {
		const { left, right, top, bottom, onPress, containerStyle } = this.props
		let partLeft = this._renderPart(left)
		let partRight = this._renderPart(right)
		let partTop = this._renderPart(top)
		let partBottom = this._renderPart(bottom)
		let text = this._renderText()

		text = this._combineParts([partLeft, text, partRight], styles.horizontalWrap)
		text = this._combineParts([partTop, text, partBottom], styles.verticalWrap)

		text = this._makeTouchable(text)

		text = this._wrapContainer(text)
		
		return text
	}
}

export {TextWrap}

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
		backgroundColor: 'transparent',
	},

	defaultContainer: {
		backgroundColor: 'transparent'
	}
})