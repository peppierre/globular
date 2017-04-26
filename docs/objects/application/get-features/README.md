### getFeatures()

[Index](/docs/README.md) | [Objects in Globular](/docs/objects/README.md) | [Application](/docs/objects/application/README.md) | getFeatures()

Returns IDs of application's available features.

**Signature**

    myApp.getFeatures()

**Return value**

Array containing string IDs of features.

**Example**

    const featureList = myApp.getFeatures();
    if (featureList.indexOf('check-wind-condictions') < 0) {
        throw new Error('Missing feature: Check Wind Conditions');
    }

