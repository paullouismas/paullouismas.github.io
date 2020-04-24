"use strict";
class CsvManager {
    constructor(data, separator = ",", dataHasHeaders = false) {
        this._data = [];
        this._headers = [];
        this._separator = ",";
        this._data = [];
        this._headers = [];
        this._separator = separator;
        const _data = data.trim().split("\n");
        if (!!dataHasHeaders) {
            let headers = _data.shift();
            if (headers === undefined) {
                throw new Error();
            }
            headers.trim().split(separator).forEach(header => {
                this._headers.push({
                    name: header.trim(),
                    base64encoded: false
                });
            });
        }
        this._data = _data.map(entry => entry.trim());
    }
    setHeaders(...headers) {
        this.removeHeaders();
        let header;
        headers.forEach(header => {
            if (typeof header === "string") {
                this._headers.push({
                    name: header.trim(),
                    base64encoded: false
                });
            }
            else {
                header = header;
                this._headers.push({
                    name: header.name,
                    base64encoded: !!header.base64encoded
                });
            }
        });
    }
    removeHeaders() {
        this._headers = [];
    }
    entries() {
        let entryPointer = 0;
        const self = this;
        const data = this._data.map(entry => {
            const entries = entry.trim().split(this._separator);
            const $entry = [];
            entries.forEach((_entry, index) => {
                if (!!this._headers[index]) {
                    if (this._headers[index].base64encoded) {
                        _entry = atob(_entry);
                    }
                    Object.defineProperty($entry, this._headers[index].name, { value: _entry });
                }
                else {
                    $entry[index] = _entry;
                }
            });
            return $entry;
        });
        return {
            value: data[entryPointer] || null,
            done: entryPointer >= data.length,
            get raw() {
                return self._data[entryPointer];
            },
            get entry() {
                return self._data[entryPointer].split(self._separator);
            },
            next() {
                entryPointer += 1;
                this.value = data[entryPointer] || null;
                this.done = entryPointer >= data.length;
            }
        };
    }
    raw() {
        return String(this._data.join("\n"));
    }
}