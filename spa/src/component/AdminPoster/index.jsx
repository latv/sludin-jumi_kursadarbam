import "./styles.css";

import React, { Component } from 'react'

const AdminPoster = ({ isSignedIn }) => {

    return (
        <div>
            {isSignedIn ?

                <h1>Esi !</h1>
                : <h1 className="not-authtorized">Neesi autorizējies</h1 >
            }
        </div>
    )
}
export default AdminPoster;