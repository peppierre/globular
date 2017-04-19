import isInterfaceImplemented from '../../util/isInterfaceImplemented';

const requiredMethods = ['pluginCall', 'request'];

export default function isApiInterfaceImplemented(apiImplementation) {
    return isInterfaceImplemented(apiImplementation, requiredMethods);
}
