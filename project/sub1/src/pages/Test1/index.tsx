import {useState} from "react";

const Test1 = () => {
    const [count, setCount] = useState(0);

    return (
        <>
            <div>Test1</div>
            <div>{count}</div>
            <button type="button" onClick={() => setCount(count + 1)}>++++</button>
        </>
    )
}

export default Test1;
