import React, { useContext } from 'react'
import myContext from '../Context/useContext'
const Home = () => {
    const context = useContext(myContext);

    return (
        <div>
            <h1>Welcome {context.displayName ? context.displayName : "Stranger!"}</h1>
        </div>
    )
}

export default Home;