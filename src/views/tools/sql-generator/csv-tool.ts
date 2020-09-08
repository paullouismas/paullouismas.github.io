interface Iheader {
  name: string;
  base64encoded?: boolean;
}
interface Ientries {
  value: IEntry | null;
  done: boolean;

  readonly raw: string;
  readonly entry: string[];

  next: () => void;
}
type IEntry = (string | number)[];
type ISeparator = ',' | ';';

class CsvManager {
  private _data: string[] = [];
  private _headers: Iheader[] = [];
  private _separator: ISeparator = ',';

  public constructor(data: string, separator: ISeparator = ',', dataHasHeaders = false) {
    this._data = []
    this._headers = []
    this._separator = separator

    const _data = data.trim().split('\n')

    if (dataHasHeaders) {
      const headers = _data.shift()

      if (headers === undefined) {
        throw new Error()
      }

      headers.trim().split(separator).forEach(header => {
        this._headers.push({
          name: header.trim(),
          base64encoded: false
        })
      })
    }

    this._data = _data.map(entry => entry.trim())
  }

  public setHeaders(...headers: (Iheader | string)[]): void {
    this.removeHeaders()

    headers.forEach(header => {
      if (typeof header === 'string') {
        this._headers.push({
          name: header.trim(),
          base64encoded: false
        })
      } else {
        header = header as Iheader

        this._headers.push({
          name: header.name,
          base64encoded: !!header.base64encoded
        })
      }
    })
  }

  public getHeaders(): string[] {
    return this._headers.map(header => header.name)
  }

  public removeHeaders(): void {
    this._headers = []
  }

  public entries(): Ientries {
    let entryPointer = 0

    const _data = this._data
    const separator = this._separator
    const data = this._data.map(entry => {
      const entries = entry.trim().split(this._separator)
      const $entry = [] as IEntry

      entries.forEach((_entry, index) => {
        if (this._headers[index]) {
          if (this._headers[index].base64encoded) {
            _entry = atob(_entry)
          }

          Object.defineProperty($entry, this._headers[index].name, { value: _entry })
        } else {
          $entry[index] = _entry
        }
      })

      return $entry
    })

    return {
      value: data[entryPointer] || null,
      done: entryPointer >= data.length,

      get raw() {
        return _data[entryPointer]
      },
      get entry() {
        return _data[entryPointer].split(separator)
      },

      next() {
        entryPointer += 1

        this.value = data[entryPointer] || null
        this.done = entryPointer >= data.length
      }
    }
  }

  public raw(): string {
    return String(this._data.join('\n'))
  }
}

export default CsvManager
export { Ientries as IEntries, IEntry, Iheader as IHeader, ISeparator }
