// export const toggleTool = (i) => {
//     return {type: 'TOGGLE_TOOL', id: i}
// };
//

function toggleTool(i) {
    return {type: 'TOGGLE_TOOL', id: i}
}

function clearAll() {
    return {type: 'TOGGLE_TOOL', id: 0}
}

function toggleToolFlag() {
    return {type: 'TOGGLE_TOOL', id: 1}
}

function toggleToolCircle() {
    return {type: 'TOGGLE_TOOL', id: 2}
}

function toggleToolRectangle() {
    return {type: 'TOGGLE_TOOL', id: 3}
}

function toggleToolPoligon() {
    return {type: 'TOGGLE_TOOL', id: 4}
}

function toggleToolLine() {
    return {type: 'TOGGLE_TOOL', id: 5}
}


export { toggleTool, clearAll, toggleToolFlag, toggleToolCircle, toggleToolRectangle, toggleToolPoligon, toggleToolLine}