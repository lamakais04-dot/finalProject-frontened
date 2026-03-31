import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../componentsCss/navbar.css"
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import bg from '../images/Logo.png'

export default function Navigation() {

    const { user, loading, setUser, fetchUser, isAdmin } = useAuth()
    const [searchTerm, setSearchTerm] = useState("")
    const [adminOpen, setAdminOpen] = useState(false)

    const adminRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        fetchUser()
    }, [])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (adminRef.current && !adminRef.current.contains(e.target)) {
                setAdminOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        if (!searchTerm.trim()) return
        navigate(`/listings?search=${encodeURIComponent(searchTerm)}`)
        setSearchTerm("")
    }

    if (loading) return null

    const logout = async () => {
        await axios.post(
            "http://localhost:8000/api/auth/logout",
            {},
            {
                withCredentials: true,
                headers: { apiKey: "123456789apikeysecure" }
            }
        )
        setUser(null)
        navigate("/login")
        window.location.reload()
    }

    return (
        <div className="navbar">

            <div className="navbar-logo-wrapper">
                <Link to="/">
                    <img id="logo" src={bg} alt="Logo" />
                </Link>
            </div>

            <Link className="navbar-link" to="/listings">כל הפרסומים</Link>
            <Link className="navbar-link" to="/createListing">יצירת פרסום</Link>

            {user && (
                <Link className="navbar-link" to="/myListing">פרסומים שלי</Link>
            )}

            {isAdmin && (
                <div className="admin-dropdown" ref={adminRef}>
                    <button
                        className={`admin-dropdown-btn ${adminOpen ? "open" : ""}`}
                        onClick={() => setAdminOpen(prev => !prev)}
                        type="button"
                    >
                        🛠 Admin
                        <span className="admin-arrow">▾</span>
                    </button>

                    {adminOpen && (
                        <div className="admin-dropdown-menu">
                            <Link
                                to="/admin/categories"
                                onClick={() => setAdminOpen(false)}
                            >
                                ניהול קטגוריות
                            </Link>

                        </div>
                    )}
                </div>
            )}

            <form className="navbar-search" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="חיפוש פרסום..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="navbar-search-input"
                />
                <button className='search-button' type='submit'>חפש</button>
            </form>

            {user ? (
                <div className="navbar-user">
                    <span className="navbar-welcome">ברוך הבא</span>
                    <Link className="navbar-link navbar-username" to="/me">
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
