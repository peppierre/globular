import { isInterfaceImplemented } from '../../util/isInterfaceImplemented';

const requiredMethods = ['execute'];

export function isFeatureCore(classToCheck) {
    return isInterfaceImplemented(classToCheck, requiredMethods);
}
