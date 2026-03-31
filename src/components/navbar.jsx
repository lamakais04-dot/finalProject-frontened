import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../componentsCss/navbar.css"
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import bg from '../images/Logo.png'


export default function Navigation() {

    const { user, loading, setUser, fetchUser } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        fetchUser()
    }, [])

    if (loading) return null

    const logout = async () => {
        await axios.post(
            "/api/auth/logout",
            {},
            {
                withCredentials: true,
                headers: { apiKey: "123456789apikeysecure" }
            }
        )
        setUser(null)
        navigate("/login")
        window.location.reload();
    }

    return (
        <div className="navbar">

            {/* לוגו */}
            <div className="navbar-logo-wrapper">
                <Link to="/">
                    <img id="logo" src={bg} alt="Logo" />
                </Link>
            </div>

            {/* ניווט */}
            <Link className="navbar-link" to="/listings">כל הפרסומים</Link>
            <Link className="navbar-link" to="/createListing">יצירת פרסום</Link>

            {user && (
                <Link className="navbar-link" to="/myListing">פרסומים שלי</Link>
            )}

            {/* משתמש */}
            {user ? (
                <div className="navbar-user">
                    <span className="navbar-welcome">ברוך הבא</span>
                    <Link
                        className="navbar-link navbar-username"
                        to="/me"
                    >
                        {user.firstname}
                    </Link>
                    /
                    <button className="logout-btn" onClick={logout}>
                        התנתק
                    </button>
                </div>
            ) : (
                <div>
                    <Link className="navbar-link" to="/signup">הרשמה</Link>
                    /
                    <Link className="navbar-link" to="/login"> התחברות </Link>
                </div>
            )}
        </div>
    )
}
