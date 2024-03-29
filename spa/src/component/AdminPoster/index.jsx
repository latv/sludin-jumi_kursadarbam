import "./styles.css";
import React, { useState, useEffect } from "react";
import APIClient from "../../utils/apiClient";
import { message, Button, Spin } from "antd"
import jwt from "../../utils/jwt";

const AdminPoster = ({ isSignedIn, update ,isActiveAdminPermisson ,setIsActiveAdminPermisson}) => {
    const [isPermmit, setIsPermit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const permisons = async () => {
        try {
            setIsLoading(true);

            let response = await APIClient.request(
                "/api/test/is-admin",
                {},
                "GET"
            );
            console.log("respone: ", response);
            if (response == "authorized!") {
                setIsPermit(true)
                setIsLoading(false);
            }


        } catch (err) {
            if (message.error.status == 403) {
                setIsPermit(false);
                setIsLoading(false);
            }
            else {
                setIsPermit(false);
                setIsLoading(false);
                console.log(err);
            }

        }
    };
    const askedForAdminPermssions = async () => {
        try {
            setIsLoading(true);
            let response = await APIClient.request(
                "/api/test/put-admin",
                {},
                "GET"
            );
            
            console.log("respone: ", response);
            if (response == "You are put on admin mode!") {
                setIsLoading(false);
                setIsActiveAdminPermisson(true);
                message.info("Tev tagad ir admina tiesības");
            }


        } catch (err) {
            if (message.error.status == 403) {
                message.error("Tev nepiesķīra admina tiesības!");
                setIsActiveAdminPermisson(true);
                setIsLoading(false);
            }
            else {
                message.error("Tev nepiesķīra admina tiesības!");
                setIsActiveAdminPermisson(true);
                console.log(err);
                setIsLoading(false);
            }

        }

    };
    const removeAdminMode = async () => {
        try {
            setIsLoading(true);
            let response = await APIClient.request(
                "/api/test/disable-admin",
                {},
                "GET"
            );
            
            console.log("respone: ", response);
            if (response == "Now you removed admin mode!") {
                setIsLoading(false);
                setIsActiveAdminPermisson(false);
                message.info("Tev tagad ir admina tiesības");
            }


        } catch (err) {
            if (message.error.status == 400) {
                message.error("Tev nebijaa admina tiesības!");
                setIsActiveAdminPermisson(false);
                setIsLoading(false);
            }
            else {
                message.error("Cita kļūda notikās!");
                setIsActiveAdminPermisson(false);
                console.log(err);
                setIsLoading(false);
            }

        }

    };


    useEffect(() => {
        permisons();
    }, [update]);

    return (
        <div className="frame">
            <Spin spinning={isLoading}>  
            {/* Vajag ,lai pārbauda vai jau ir pieprasījis admina tiesības  */}
            {isSignedIn ? [ isPermmit ? [<h1>Vai gribi admin atlauju?</h1>,<button className="admin-mode" loading={isLoading} onClick={isActiveAdminPermisson ? removeAdminMode :askedForAdminPermssions } style={isActiveAdminPermisson ? { borderColor: "red" } : null}>{isActiveAdminPermisson ? "Esi adminis tagad!" : "Pieprasīt atlauju"}</button>]
            : <h1>Nav atlauja, pieprasi atļauju adminam!</h1>] : <h1 className="not-authtorized">Neesi autorizējies!</h1 >
            }
            </Spin>
        </div>
    )
}
export default AdminPoster;