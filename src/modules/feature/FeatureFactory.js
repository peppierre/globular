import isFeatureCore from './isFeatureCore';
import isMethod from '../../util/isMethod';

function ApplicationFeature(core) {
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
}

export default class FeatureFactory {
    static produce({ Core, persistency, api }) {
        const core = new Core({ persistency, api });

        if (!isFeatureCore(core)) {
            throw new TypeError('Attempt to wrap in invalid feature, no FeatureCore API implemented.');
        }
        return new ApplicationFeature(core);
    }
}
