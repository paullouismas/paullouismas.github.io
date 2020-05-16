class URLSearchManager {
	constructor(source, historyPushState = false) {
		this._source = new URLSearchParams(source);
		this._historyPushState = !!historyPushState;
	}

	get(key) {
		return decodeURIComponent(this._source.get(key) || "");
	}

	set(key, value) {
		this._source.set(key, encodeURIComponent(value));

		if (!!this._historyPushState) {
			this.pushState();
		}

		return;
	}

	/* empty() {
		for (let [key] of this._source) {
			this._source.delete(key);
		}

		if (!!this._historyPushState) {
			this.pushState();
		}
	} */

	pushState(state = "") {
		const search = this.toString();
		const { origin, pathname, hash } = location;
		const url = `${origin}${pathname}${search.length > 0 ? `?${search}` : ""}${hash.length > 0 ? `#${hash}` : ""}`;

		history.pushState({ path: state || url }, "", state || url);

		return;
	}

	toString() {
		return this._source.toString();
	}
}