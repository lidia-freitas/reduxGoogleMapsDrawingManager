
function addItem(item) {
    return {type: 'ADD_ITEM', ...item}
}

function removeItem(item) {
    return { type: 'REMOVE_ITEM', ...item}
}

export {
    addItem,
    removeItem
}