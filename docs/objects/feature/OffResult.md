### offResult()

[Index](/docs/README.md) | [Objects in Globular](/docs/objects/README.md) | [Feature](/docs/objects/feature/README.md) | offResult()

Unregister a callback which would have been notified once [Feature](/docs/objects/feature/README.md) [execution](/docs/objects/feature/Execute.md) finished successfully.

**Signature**

    offResult(callback)

**Parameters**

`callback`

*(mandatory)* A function which is called with result of feature execution. For required signature, please check [Result callback function](/docs/interface/ResultCallback.md).

**Return value**

For chaining purpose, this method returns [Feature](/docs/objects/feature/README.md) itself.

**Example**

    function updateOperation(data) {
        // do stuffs in DOM
    }
    
    function updateResult(data) {
        // do stuffs in DOM
    }
    
    myFeature.offResult(updateOperation).offResult(updateResult);
