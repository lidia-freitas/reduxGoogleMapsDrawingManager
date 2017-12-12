
function addItem(item) {
    return {type: 'ADD_ITEM', item: item}
}

function removeSelectedItems() {
    return { type: 'REMOVE_SELECTED_ITEMS'}
}

function removeAllItems() {
    return {type: 'REMOVE_ALL_ITEMS'}
}

function setSelectedItem(item) {
    return {type: 'SET_SELECTED_ITEM', item: item}
}
function setSelectedMultiItem(item) {
    return {type: 'SET_SELECTED_MULTI_ITEM', item: item}
}


export {
    addItem,
    removeSelectedItems,
    removeAllItems,
    setSelectedItem,
    setSelectedMultiItem
}