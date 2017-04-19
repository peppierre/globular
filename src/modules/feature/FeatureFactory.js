import isFeatureCore from './isFeatureCore';
import isMethod from '../../util/isMethod';

function ApplicationFeature(core) {
    const viewCallbacks = new Set();

    this.execute = (data) => {
        const result = core.execute(data);
        viewCallbacks.forEach((callback) => {
            callback(result);
        });
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
