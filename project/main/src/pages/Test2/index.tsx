import {useRef, useState} from "react";

const Test2 = () => {
    const [, update] = useState({});
    const ref = useRef(0);

    return (
        <>
            <div>Test2</div>
            <div>{ref.current}</div>
            <button type="button" onClick={() => {ref.current++;update({})}}>++++</button>
        </>
    )
}

export default Test2;
