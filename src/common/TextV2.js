import * as React from 'react'
import {Text} from 'react-native'
import * as Colors from '../config/colors'
import Fonts from '../config/fonts'

const TextV2 = ({
  color = Colors.black600,
  size = 'medium',
  children,
  family = 'regular',
  numberOfLines,
  customStyle,
  link = false,
  onPressLink,
  testID,
  cutLength,
  align = 'auto'
}) => {
  if (link) color = 'blue'
  const fontColor = React.useMemo(() => {
    const colorList = {
      // black: Colors.text,
      black: '#000',
      // gray: Colors.GRAY_TEXT_NEW,
      red: Colors.PRIMARY
      //   blue: Colors.LINK,
      //   dark: Colors.DARKER,
    }
    return colorList[color] || color
  }, [color])

  const fontFamily = React.useMemo(() => {
    let fontList
    if (Platform.OS === 'ios') {
      fontList = {
        regular: Fonts.fontFamily.sFProDisplayRegular,
        bold: Fonts.fontFamily.sFProDisplayBold,
        semi: Fonts.fontFamily.sFProDisplaySemibold,
        medium: Fonts.fontFamily.sFProDisplayMedium
      }
    } else {
      fontList = {
        regular: Fonts.fontFamily.robotoRegular,
        bold: Fonts.fontFamily.robotoBold,
        semi: Fonts.fontFamily.robotMedium,
        medium: Fonts.fontFamily.robotMedium
      }
    }

    return fontList[family]
  }, [family])

  const textAlign = React.useMemo(() => {
    const alignList = {
      auto: 'auto',
      center: 'center',
      left: 'left',
      right: 'right',
      justify: 'justify'
    }

    return alignList[align]
  }, [align])

  const fontSize = React.useMemo(() => {
    const sizeList = {
      tiny: Fonts.size.xxsmall,
      mini: Fonts.size.xsmall,
      small: Fonts.size.small,
      medium: Fonts.size.medium,
      big: Fonts.size.slightlyLarge,
      mediumLarge: Fonts.size.mediumLarge,
      large: Fonts.size.large,
      giant: Fonts.size.xlarge,
      huge: Fonts.size.xxlarge
    }
    return sizeList[size]
  }, [size])

  return (
    <Text
      numberOfLines={numberOfLines}
      style={[{fontFamily, color: fontColor, fontSize, textAlign}, customStyle]}
      testID={testID}
      onPress={link ? onPressLink : undefined}
      accessibilityLabel={testID}
    >
      {children}
    </Text>
  )
}

export default TextV2
