import React, { useContext } from 'react'
import '../Assets/Styles/Profile.css'
import myContext from '../Context/useContext'
function Profile() {
    const context = useContext(myContext);
    return (
        <div className='profile-container'>
            <h3>Logged with {context.provider}</h3>
            <div className='profile'>
                <img src={context.photos[0].value} alt='profile-img' />
            </div>
            <div className='text'>
                <h4>{context.displayName}</h4>
            </div>

        </div>
    )
}

export default Profile