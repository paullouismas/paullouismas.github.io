import BulmaTagsInput from '@creativebulma/bulma-tagsinput'
import * as bulmaToast from 'bulma-toast'

export const deepCloneUncircularObject = (source: object | []): object | [] => JSON.parse(JSON.stringify(source))

export class Notify {
  private static toast = bulmaToast.toast

  public static success(message = ''): void {
    this.toast({
      message,
      duration: 3000,
      type: 'is-success',
      position: 'bottom-right',
      animate: {
        in: 'fadeIn',
        out: 'fadeOut'
      }
    })
  }
}

export const initBulmaTagsInput = (el: HTMLInputElement, source: string[] = []) => {
  return new BulmaTagsInput(el, {
    caseSensitive: false,
    clearSelectionOnTyping: true,
    freeInput: true,
    noResultsLabel: 'No previous matching tags',
    placeholder: 'Choose tags',
    selectable: false,
    source
  })
}

export const formatTime = (dateObject: Date) => {
  const year = dateObject.getFullYear()
  const month = `${dateObject.getMonth() + 1}`.padStart(2, '0')
  const date = `${dateObject.getDate()}`.padStart(2, '0')
  const hour = `${dateObject.getHours()}`.padStart(2, '0')
  const minute = `${dateObject.getMinutes()}`.padStart(2, '0')

  return `${year}/${month}/${date} ${hour}h${minute}`
}
