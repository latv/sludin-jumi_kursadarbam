import "./styles.css";
import React, { useState, useEffect } from "react";
import APIClient from "../../utils/apiClient";
import { message } from "antd"
import jwt from "../../utils/jwt";

const AdminPoster = ({ isSignedIn, update }) => {
    const [isPermmit, setIsPermit] = useState(false);
    const permisons = async () => {
        try {

            let response = await APIClient.request(
                "/api/test/is-admin",
                {},
                "GET"
            );
            console.log("respone: ", response);
            if (response == "authorized!") {
                setIsPermit(true)
            }


        } catch (err) {
            if (message.error.status == 403) {
                setIsPermit(false);
            }
            else {
                setIsPermit(false);
                console.log(err);
            }

        }
    };


    useEffect(() => {
        permisons();
    }, [update]);

    return (
        <div>
            {
                isPermmit ? <h1>Gan atlauja ,gan aut</h1> : [isSignedIn ? <h1>Nav atlauja , pieprasi atļauju adminam!</h1> : <h1 className="not-authtorized">Neesi autorizējies!</h1 >]

               
            }
        </div>
    )
}
export default AdminPoster;