//naive error formatting

export function formatUnknownError(error) {
  if (!error) return ''

  let text

  switch (typeof error) {
      case 'string':
        text = error;
        break;
      case 'object':
        if (error.message) {
          text = error.message
        } else {
          text = JSON.stringify(error)
        }
        break;
      default:
        console.error('Unknown error', error)
        text = 'unknown (see console)'
  }

  return `Error: ${text}`
}

