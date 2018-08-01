export function ApplicationFeature(core) {
    const startHookListeners = new Set();
    const resultHookListeners = new Set();
    const failureHookListeners = new Set();
    const finishedHookListeners = new Set();

    function isPromise(value) {
        return value && (typeof value.then === 'function');
    }

    function notifyListeners(listenersToNotify, notificationValue) {
        listenersToNotify.forEach((listener) => {
            listener(notificationValue);
        });
    }

    this.execute = (data) => {
        notifyListeners(startHookListeners, data);
        try {
            const coreOutput = core.execute(data);
            if (isPromise(coreOutput)) {
                coreOutput.then((result) => {
                    notifyListeners(resultHookListeners, result);
                }).catch(() => {
                    notifyListeners(failureHookListeners);
                });
            } else {
                notifyListeners(resultHookListeners, coreOutput);
            }
        } catch (e) {
            notifyListeners(failureHookListeners);
        }
        notifyListeners(finishedHookListeners);
    };

    this.pluginView = callback => this.onResult(callback);

    this.unplugView = callback => this.offResult(callback);

    this.onStart = (callback) => {
        if (typeof callback !== 'function') {
            throw new TypeError('View is not able to called back');
        }
        startHookListeners.add(callback);
        return this;
    };

    this.offStart = (callback) => {
        startHookListeners.delete(callback);
        return this;
    };

    this.onResult = (callback) => {
        if (typeof callback !== 'function') {
            throw new TypeError('View is not able to called back');
        }
        resultHookListeners.add(callback);
        return this;
    };

    this.offResult = (callback) => {
        resultHookListeners.delete(callback);
        return this;
    };

    this.onFailure = (callback) => {
        if (typeof callback !== 'function') {
            throw new TypeError('View is not able to called back');
        }
        failureHookListeners.add(callback);
        return this;
    };

    this.offFailure = (callback) => {
        failureHookListeners.delete(callback);
        return this;
    };

    this.onFinished = (callback) => {
        if (typeof callback !== 'function') {
            throw new TypeError('View is not able to called back');
        }
        finishedHookListeners.add(callback);
        return this;
    };

    this.offFinished = (callback) => {
        finishedHookListeners.delete(callback);
        return this;
    };
}
