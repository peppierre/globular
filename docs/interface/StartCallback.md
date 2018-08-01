## Start callback function

[Index](/docs/README.md) | [Interface definitions](/docs/interface/README.md) | Start callback function

Start callback function is added to [Feature](/docs/objects/feature/README.md) to be notified once execution started.

*Please note that there is no restriction about what will be passed to this function. Arguments of execution would be a simple string or an object, relevant feature must determine what kind of arguments is required.*

**Example**

    data => {
        document.querySelector('#indicator').innerText = data.label;
    }
