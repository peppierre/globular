### offStart()

[Index](/docs/README.md) | [Objects in Globular](/docs/objects/README.md) | [Feature](/docs/objects/feature/README.md) | offStart()

Unregister a callback which would have been notified once [Feature](/docs/objects/feature/README.md) [execution](/docs/objects/feature/Execute.md) is started.

**Signature**

    offStart(callback)

**Parameters**

`callback`

*(mandatory)* A function which is called with parameters of feature execution. For required signature, please check [Start callback function](/docs/interface/StartCallback.md).

**Return value**

For chaining purpose, this method returns [Feature](/docs/objects/feature/README.md) itself.

**Example**

    function updateOperation(data) {
        // do stuffs in DOM
    }
    
    function updateResult(data) {
        // do stuffs in DOM
    }
    
    myFeature.offStart(updateOperation).offStart(updateResult);
