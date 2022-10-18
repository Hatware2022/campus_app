import GetOS from './platform'

const isIOS = GetOS.getInstance() === 'ios'
const a11y = (id, hint = '', value) => {
  if (id !== undefined) {
    return isIOS
      ? {
          testID: id,
          accessibilityLabel: id,
          accessibilityHint: hint,
          accessibilityValue: value
        }
      : {
          accessible: true,
          accessibilityLabel: id,
          accessibilityHint: hint,
          accessibilityValue: value
        }
  }
  return ''
}

export default a11y
