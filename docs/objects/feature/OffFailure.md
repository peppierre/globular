### offFailure()

[Index](/docs/README.md) | [Objects in Globular](/docs/objects/README.md) | [Feature](/docs/objects/feature/README.md) | offFailure()

Unregister a callback which would have been notified once [Feature](/docs/objects/feature/README.md) [execution](/docs/objects/feature/Execute.md) failed.

**Signature**

    offFailure(callback)

**Parameters**

`callback`

*(mandatory)* A function which is called. For required signature, please check [Failure callback function](/docs/interface/FailureCallback.md).

**Return value**

For chaining purpose, this method returns [Feature](/docs/objects/feature/README.md) itself.

**Example**

    function updateOperation(data) {
        // do stuffs in DOM
    }
    
    function updateResult(data) {
        // do stuffs in DOM
    }
    
    myFeature.offFailure(updateOperation).offFailure(updateResult);
