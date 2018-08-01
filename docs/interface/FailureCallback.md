## Failure callback function

[Index](/docs/README.md) | [Interface definitions](/docs/interface/README.md) | Failure callback function

Failure callback function is added to [Feature](/docs/objects/feature/README.md) to be notified once execution failed.

**Example**

    () => {
        document.querySelector('#indicator').innerText = 'Error fetching data from server...';
    }
