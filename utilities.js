isRectangularCollision = ({ rectangle1, rectangle2 }) => {
    const offset_y = 40;
    const offset_x = 8;
    return (
        rectangle1.position.x + rectangle1.width >=
            rectangle2.position.x + offset_x &&
        rectangle1.position.x + offset_x <=
            rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y + offset_y <=
            rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    );
};

convertTo2dArray = (initialArray) => {
    const returnArray = [];

    for (let i = 0; i < initialArray.lenght; i += 70) {
        returnArray.push(initialArray.slice(i, i + 70));
    }

    return returnArray;
};
