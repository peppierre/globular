### onFailure()

[Index](/docs/README.md) | [Objects in Globular](/docs/objects/README.md) | [Feature](/docs/objects/feature/README.md) | onFailure()

Register a callback to be notified once [Feature](/docs/objects/feature/README.md) [execution](/docs/objects/feature/Execute.md) failed.

**Signature**

    onFailure(callback)

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
    
    myFeature.onFailure(updateOperation).onFailure(updateResult);
