### getFeature()

[Index](/docs/README.md) | [Objects in Globular](/docs/objects/README.md) | [Application](/docs/objects/application/README.md) | getFeature()

Returns a feature of application.

**Signature**

    myAppl.getFeature(featureName)

**Parameters**

`featureName`

*(mandatory)* String ID of feature required.

**Return value**

A feature object or -if no feature available with given ID- `undefined`. For further information, please check [Feature](/docs/objects/feature/README.md) section.

**Example**

    const myFeature = myApplication.getFeature('check-humidity-for-location')
    
