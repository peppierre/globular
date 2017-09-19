import isFeatureCore from './isFeatureCore';
import { ApplicationFeature } from './ApplicationFeature';

export default class FeatureFactory {
    static produce({ Core, persistency, api }) {
        const core = new Core({ persistency, api });
        if (!isFeatureCore(core)) {
            throw new TypeError('Attempt to wrap in invalid feature, no FeatureCore API implemented.');
        }
        const feature = new ApplicationFeature(core);
        return feature;
    }
}
