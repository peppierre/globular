import { isInterfaceImplemented } from '../../util/isInterfaceImplemented';

const requiredMethods = ['pluginCall', 'unplugCall', 'request'];

export function isApiAdapter(classToCheck) {
    return isInterfaceImplemented(classToCheck, requiredMethods);
}
