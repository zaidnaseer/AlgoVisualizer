import { useState } from 'react';

const useArray = (initialArray) => {
    const [array, setArray] = useState(initialArray);

    const updateArray = (newArray) => {
        setArray(newArray);
    };

    return [array, updateArray];
};

export default useArray;
