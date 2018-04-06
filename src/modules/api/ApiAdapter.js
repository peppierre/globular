export function ApiAdapter() {
    const calls = new Map();

    function isAlreadyPluggedIn(id) {
        return calls.has(id);
    }

    function handleXHR(configuration, resolve, reject) {
        const xhr = new XMLHttpRequest();

        xhr.open(configuration.method || 'get', configuration.url);
        if (configuration.headers) {
            Object.keys(configuration.headers).forEach((key) => {
                xhr.setRequestHeader(key, configuration.headers[key]);
            });
        }
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = () => {
            reject(xhr.statusText);
        };
        xhr.send(configuration.body);
    }

    /* eslint-disable class-methods-use-this */
    return new class {
        pluginCall(id, call) {
            if (typeof call !== 'function') {
                throw new TypeError('Invalid API call');
            }
            if (isAlreadyPluggedIn(id)) {
                return;
            }
            /* eslint-disable no-eval */
            calls.set(id, eval(call));
            /* eslint-enable no-eval */
        }

        unplugCall(id) {
            calls.delete(id);
        }

        getAvailableCalls() {
            return Array.from(calls.keys());
        }

        request(id, data) {
            return new Promise((resolve, reject) => {
                if (!isAlreadyPluggedIn(id)) {
                    reject(`No API call found (${id})`);
                }
                const callSetup = calls.get(id)(data);
                handleXHR(callSetup.config, resolve, reject);
            });
        }
    }();
    /* eslint-enable class-methods-use-this */
}
