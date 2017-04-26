### extendWithFeature()

[Index](/docs/README.md) | [Objects in Globular](/docs/objects/README.md) | [Application](/docs/objects/application/README.md) | extendWithFeature()

Extends application's functionality with a feature.

**Signature**

    myApplication.extendWithFeature(featureName, featureCore)
    
**Parameters**

`featureName`

*(mandatory)* String identifier to uniquely identify feature.

`featureCore`

*(mandatory)* A class which implements business object of feature. For details about interface requirement, check [Feature Core class](/docs/interface/feature-core/README.md) section.

**Return value**

For chaining purpose, this method returns newly added feature object. For further information about object returned, please check [Feature](/docs/objects/feature/README.md) section.

**Example**

    class ReserveRoom {
        execute() {
            // to some stuffs
        }
    }
    
    myApplication.extendWithFeature('reserve-room', ReserveRoom);
