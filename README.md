# rn-text-wrap
React Native component that wraps some frequently used features of a text view into one.

## Installation

```
npm install --save rn-text-wrap
```

## Usage example

```javascript
import { TextWrap as Text } from 'rn-text-wrap'
<Text>Use same way as RN Text</Text>
```

### Touchable

Before
```javascript
<TouchableOpacity onPress={onPressHandler}>
	<Text>Press me</Text>
</TouchableOpacity>
```

Now
```javascript
<Text onPress={onPressHandler}></Text>
```

### Leading/Trailing parts

Before
```javascript
<View style={{
	flexDirection: 'row' // or 'column'
}}>
	<TouchableOpacity onPress={onPressLeadingImage}>
		<Image 
			source={leadingImageSource} 
			style={leadingImageStyle} />
	</TouchableOpacity>
	<Text>Text goes here</Text>
	<TouchableOpacity onPress={onPressTrailingImage}>
		<Image 
			source={trailingImageSource} 
			style={trailingImageStyle}/>
	</TouchableOpacity>
</View>
```

Now 
```javascript
	<Text left={{
			onPress: onPressLeadingImage
			icon: leadingImageSource,
			style: leadingImageStyle,
			render: returnAnyComponent	// giving this will ignore above two
		}}	// or top={...}
		right={{
			onPress: onPressTrailingImage
			icon: trailingImageSource,
			style: trailingImageStyle,
			render: returnAnyComponent	// giving this will ignore above two
		}}	// or bottom={...}
	>Text goes here</Text>
```