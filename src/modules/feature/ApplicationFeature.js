import isMethod from '../../util/isMethod';

export function ApplicationFeature(core) {
    const viewCallbacks = new Set();

    function isPromise(value) {
        return value && isMethod(value.then);
    }

    function notifyViews(model) {
        viewCallbacks.forEach((callback) => {
            callback(model);
        });
    }

    this.execute = (data) => {
        const coreOutput = core.execute(data);
        if (isPromise(coreOutput)) {
            coreOutput.then((result) => {
                notifyViews(result);
            });
        } else {
            notifyViews(coreOutput);
        }
    };

    this.pluginView = (callback) => {
        if (!isMethod(callback)) {
            throw new TypeError('View is not able to called back');
        }
        viewCallbacks.add(callback);
        return this;
    };

    this.unplugView = (callback) => {
        viewCallbacks.delete(callback);
    };
}
