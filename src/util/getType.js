export function getType(value) {
    return Object.prototype.toString.call(value).split(' ')[1].replace(']', '').toLowerCase();
}
