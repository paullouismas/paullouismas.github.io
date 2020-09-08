type RecursiveObject = { [key: string]: string | number | RecursiveObject }

export const getIndexFromObjectValue = (array: RecursiveObject[], keyName: string, keyValue: string | number) => array.reduce<number | undefined>((accumulator, value, index) => value[keyName] === keyValue ? index : undefined, undefined)
/* (array: { [key: string]: string | number | object | [] | undefined | null }[], keyName: string, keyValue: string | number) => {
  let index = undefined as number | undefined

  array.forEach((obj, idx) => {
    if (obj[keyName] === keyValue) {
      index = idx
    }
  })

  return index
} */

export const prettyPrintElapsedTime = (secondsCount = 0) => {
  if (secondsCount < 0) {
    return secondsCount
  } else if (secondsCount < 60) { // Seconds
    const seconds = Math.round(secondsCount)

    return `${seconds} second${seconds > 1 ? 's' : ''} ago`
  } else if (secondsCount < (60 * 60)) { // Minutes
    const minutes = Math.round(secondsCount / 60)

    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  } else if (secondsCount < (60 * 60 * 24)) { // Hours
    const hours = Math.round(secondsCount / (60 * 60))

    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else { // Days and more
    const days = Math.round(secondsCount / (60 * 60 * 24))

    return `${days} day${days > 1 ? 's' : ''} ago`
  }
}

export const deepCloneUncircularObject = (source: object | []): object | [] => JSON.parse(JSON.stringify(source))
