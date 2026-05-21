// import { createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import axios from 'axios'

// export const AppContext = createContext()

// const AppContextProvider = (props) => {

//     const currencySymbol = '₹'
//     const backendUrl = import.meta.env.VITE_BACKEND_URL

//     const [doctors, setDoctors] = useState([])
//     const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
//     const [userData, setUserData] = useState(false)

//     // Getting Doctors using API
//     const getDoctosData = async () => {

//         try {

//             const { data } = await axios.get(backendUrl + '/api/doctor/list')
//             if (data.success) {
//                 setDoctors(data.doctors)
//             } else {
//                 toast.error(data.message)
//             }

//         } catch (error) {
//             console.log(error)
//             toast.error(error.message)
//         }

//     }

//     // Getting User Profile using API
//     const loadUserProfileData = async () => {

//         try {

//             const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })

//             if (data.success) {
//                 setUserData(data.userData)
//             } else {
//                 toast.error(data.message)
//             }

//         } catch (error) {
//             console.log(error)
//             toast.error(error.message)
//         }

//     }

//     useEffect(() => {
//         getDoctosData()
//     }, [])

//     useEffect(() => {
//         if (token) {
//             loadUserProfileData()
//         }
//     }, [token])

//     const value = {
//         doctors, getDoctosData,
//         currencySymbol,
//         backendUrl,
//         token, setToken,
//         userData, setUserData, loadUserProfileData
//     }

//     return (
//         <AppContext.Provider value={value}>
//             {props.children}
//         </AppContext.Provider>
//     )

// }

// export default AppContextProvider



import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currencySymbol = "₹";
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [userData, setUserData] = useState(false);

    //  GLOBAL AXIOS TOKEN SETUP (MOST IMPORTANT FIX)
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    }, [token]);

    //  Get Doctors
    const getDoctosData = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/doctor/list");

            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    //  Get User Profile (NO manual headers now)
    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(
                backendUrl + "/api/user/get-profile"
            );

            if (data.success) {
                setUserData(data.userData);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // Load doctors on start
    useEffect(() => {
        getDoctosData();
    }, []);

    // Load user when token changes
    useEffect(() => {
        if (token) {
            loadUserProfileData();
        }
    }, [token]);

    const value = {
        doctors,
        getDoctosData,
        currencySymbol,
        backendUrl,
        token,
        setToken,
        userData,
        setUserData,
        loadUserProfileData,
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;