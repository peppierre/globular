import { isInterfaceImplemented } from '../../util/isInterfaceImplemented';

const requiredMethods = ['getItem', 'setItem', 'removeItem', 'clear'];

export function isPersistencyAdapter(storageToCheck) {
    return isInterfaceImplemented(storageToCheck, requiredMethods);
}
