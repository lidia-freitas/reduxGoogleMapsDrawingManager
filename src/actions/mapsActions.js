
function addItem(item) {
    return {type: 'ADD_ITEM', item: item}
}

function removeItem(item) {
    return { type: 'REMOVE_ITEM', item: item}
}

function clearAllItems() {
    return {type: 'CLEAR_ALL_ITEMS'}
}

function setSelectedItem(item) {
    return {type: 'SET_SELECTED_ITEM', item: item}
}

export {
    addItem,
    removeItem,
    clearAllItems,
    setSelectedItem
}