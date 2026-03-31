import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "../componentsCss/SingleListing.css"
import { useAuth } from '../context/AuthContext'

export default function SingleListing() {

    const [singleListing, setSingleListing] = useState({})
    const [categoryName, setCategoryName] = useState("")
    const [userInfo, setUserInfo] = useState(null)
    const { listingId } = useParams()
    const { user } = useAuth()
    const userLoginId = user?.id

    const navigate = useNavigate()

    useEffect(() => {
        if (!singleListing.userid) return
        getUserInfo()
    }, [singleListing])

    useEffect(() => {
        getSingleListing()
    }, [])

    const getUserInfo = async () => {
        const response = await axios.get(
            `http://localhost:8000/api/user/${singleListing.userid}`,
            {
                withCredentials: true,
                headers: { apiKey: "123456789apikeysecure" }
            }
        )
        setUserInfo(response.data)
    }

    const getSingleListing = async () => {
        const response = await axios.get(
            `http://localhost:8000/api/listing/${listingId}`,
            {
                withCredentials: true,
                headers: { apiKey: "123456789apikeysecure" }
            }
        )
        setSingleListing(response.data)
    }

    useEffect(() => {
        if (!singleListing.categoryid) return
        getCategoryName()
    }, [singleListing])

    const getCategoryName = async () => {
        const response = await axios.get(
            `http://localhost:8000/api/category/${singleListing.categoryid}`,
            {
                withCredentials: true,
                headers: { apiKey: "123456789apikeysecure" }
            }
        )
        setCategoryName(response.data.name)
    }

    return (
        <div className="single-card-wrapper">

            <div
                className="single-back-btn"
                onClick={() => navigate(-1)}
            >
                 חזרה לכל הפרסומים שלי
            </div>

            <div className="single-card">

                <div className="single-image-wrapper">
                    <img
                        src={singleListing.imageFile}
                        alt={singleListing.title}
                    />
                </div>

                <div className="single-content">

                    <h1 className="single-title">
                        {singleListing.title}
                    </h1>

                    <p className="single-description">
                        {singleListing.description}
                    </p>

                    <div className="single-meta">

                        <div className="meta-row">
                            <span>מחיר</span>
                            <strong>₪{singleListing.price}</strong>
                        </div>

                        <div className="meta-row">
                            <span>סוג</span>
                            <strong>{singleListing.type}</strong>
                        </div>

                        <div className="meta-row">
                            <span>זמינות</span>
                            <strong>{singleListing.availability}</strong>
                        </div>

                        <div className="meta-row">
                            <span>קטגוריה</span>
                            <strong>{categoryName}</strong>
                        </div>

                    </div>

                    {userLoginId === singleListing.userid && (
                        <button
                            className="edit-listing-btn"
                            onClick={() => navigate(`/editListing/${singleListing.id}`)}
                        >
                         עריכת פרסום ✏
                        </button>
                    )}

                    {!(userInfo?.id == userLoginId) && userInfo && (
                        <div className="single-user-card">

                            <h3 className="user-title">פרטי מפרסם</h3>

                            <div className="user-row">
                                <span>שם</span>
                                <strong>{userInfo.firstname}</strong>
                            </div>

                            <div className="user-row">
                                <span>מיקום</span>
                                <strong>{userInfo.address}</strong>
                            </div>

                            <button
                                className="contact-btn"
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    navigate(`/UserInfo/${singleListing.userid}`)
                                }}
                            >
                                📞 צור קשר
                            </button>

                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}
