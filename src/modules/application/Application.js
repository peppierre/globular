import isPersistencyAdapter from '../../modules/persistency/isPersistencyAdapter';
import isApiAdapter from '../../modules/api/isApiAdapter';
import FeatureFactory from '../../modules/feature';

export function Application({ persistency, api } = {}) {
    if (persistency && !isPersistencyAdapter(persistency)) {
        throw new TypeError('Attempt to plug in invalid persistency, no Storage API implemented.');
    }
    if (api && !isApiAdapter(api)) {
        throw new TypeError('Attempt to plug in invalid API, no API API implemented');
    }

    const features = new Map();

    this.apiAdapter = api;

    this.getFeatures = () => Array.from(features.keys());

    this.getFeature = featureName => features.get(featureName);

    this.extendWithFeature = (featureName, Core) => {
        const feature = FeatureFactory.produce({ Core, persistency, api });
        features.set(featureName, feature);
        return feature;
    };

    this.shrinkWithFeature = (featureName) => {
        features.delete(featureName);
    };

    this.executeFeature = (featureName, data) => {
        const featureToExecute = features.get(featureName);
        if (featureToExecute) {
            featureToExecute.execute(data);
        }
    };
}
