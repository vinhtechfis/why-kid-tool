const getFitContainSize = (objectWidth: number, objectHeight: number, containerWidth: number, containerHeight: number) => {
    let width = objectWidth;
    let height = objectHeight;
    if (width > containerWidth) {
        width = containerWidth;
        height = objectHeight / objectWidth * width;
    }
    if (height > containerHeight) {
        height = containerHeight;
        width = objectWidth / objectHeight * height;
    }
    return { width, height };
}

export {
    getFitContainSize,
}