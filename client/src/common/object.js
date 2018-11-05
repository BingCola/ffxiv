const getAttr = function(object, key) {
    let arr = key.split('.');
    let value = object;
    for (let i = 0; i < arr.length; i++) {
        if (value.hasOwnProperty(key[i])) {
            value = value[key[i]];
        } else {
            break;
        }
    }
    return value;
};
export default { getAttr };
