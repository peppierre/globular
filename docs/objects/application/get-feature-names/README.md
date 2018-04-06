### getFeatureNames()

[Index](/docs/README.md) | [Objects in Globular](/docs/objects/README.md) | [Application](/docs/objects/application/README.md) | getFeatureNames()

Returns IDs of application's available features.

**Signature**

    myApp.getFeatureNames()

**Return value**

Array containing string IDs of features.

**Example**

    const featureList = myApp.getFeatureNames();
    if (featureList.indexOf('check-wind-condictions') < 0) {
        throw new Error('Missing feature: Check Wind Conditions');
    }

