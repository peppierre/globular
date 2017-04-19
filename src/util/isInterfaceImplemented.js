import isMethod from './isMethod';

export default function isInterfaceImplemented(apiImplementation, requiredMethods) {
    return requiredMethods.reduce(
        (cumulated, methodName) => cumulated && isMethod(apiImplementation[methodName]),
        true,
    );
}
