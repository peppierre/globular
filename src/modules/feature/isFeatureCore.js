import isInterfaceImplemented from '../../util/isInterfaceImplemented';

const requiredMethods = ['execute'];

export default function isApiInterfaceImplemented(apiImplementation) {
    return isInterfaceImplemented(apiImplementation, requiredMethods);
}
