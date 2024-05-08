import {useState} from "react";

const Test3 = () => {
    const [count, setCount] = useState(0);

    return (
        <>
            <div>Test3</div>
            <div>{count}</div>
            <button type="button" onClick={() => setCount(count + 1)}>++++</button>
        </>
    )
}

export default Test3;
