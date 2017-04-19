import isInterfaceImplemented from '../../util/isInterfaceImplemented';

const requiredMethods = ['getItem', 'setItem', 'removeItem', 'clear'];

export default function isPersistencyInterfaceImplemented(apiImplementation) {
    return isInterfaceImplemented(apiImplementation, requiredMethods);
}
