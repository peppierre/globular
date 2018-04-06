function xor(value1, value2) {
    return (value1 && !value2) || (!value1 && value2);
}

export function isInterfaceImplemented(objectToCheck, requiredMethods) {
    let prototypeMatch = (objectToCheck.prototype !== undefined);
    let instanceMatch = true;
    if (objectToCheck.prototype) {
        prototypeMatch = requiredMethods.reduce(
            (cumulated, methodName) => cumulated && (typeof objectToCheck.prototype[methodName] === 'function'),
            prototypeMatch);
    }
    instanceMatch = requiredMethods.reduce(
        (cumulated, methodName) => cumulated && (typeof objectToCheck[methodName] === 'function'),
        instanceMatch);
    return xor(prototypeMatch, instanceMatch);
}
