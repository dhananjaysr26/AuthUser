import React, { useEffect, useState } from 'react';
import axios from 'axios';
import myContext from './useContext';

const USState = (props) => {
    const [userObj, setUserObj] = useState({})

    useEffect(() => {
        axios.get("https://mynotes26.herokuapp.com/getuser", { withCredentials: true }).then((res) => {
            if (res.data) {
                setUserObj(res.data);
                console.log(res.data)
            }
        })
    }, [])
    return (
        <myContext.Provider value={userObj}>{props.children}</myContext.Provider>
    )
}
export default USState;