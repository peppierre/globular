### shrinkWithFeature()

[Index](/docs/README.md) | [Objects in Globular](/docs/objects/README.md) | [Application](/docs/objects/application/README.md) | shrinkWithFeature()

Removes a feature from application's functionality.

**Signature**

    myApplication.WithFeature(featureName)
    
**Parameters**

`featureName`

*(mandatory)* String identifier to uniquely identify feature.

**Example**

    class ReserveRoom {
        execute() {
            // to some stuffs
        }
    }
    
    myApplication.extendWithFeature('reserve-room', ReserveRoom);
    myApplication.shrinkWithFeature('reserve-room');
