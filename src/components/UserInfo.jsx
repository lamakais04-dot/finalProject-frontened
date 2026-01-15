import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import '../componentsCss/UserInfo.css'

export default function UserInfo() {
    const { userId } = useParams()
    const [userInfo, setUserInfo] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getUserInfo()
    }, [])

    const getUserInfo = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8000/api/user/${userId}`,
                {
                    withCredentials: true,
                    headers: { apiKey: "123456789apikeysecure" }
                }
            )
            setUserInfo(res.data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }



    return (
        <div className="userinfo-page">

            {loading? <h1 className="loading-text" >...טוען נתונים</h1>:
            (<div className="userinfo-card">

                {/* תמונת פרופיל */}
                <div className="userinfo-avatar">
                    {userInfo.imageurl ? (
                        <img src={userInfo.imageurl} alt="profile" />
                    ) : (
                        "👤"
                    )}
                </div>

                {/* שם */}
                <h2 className="userinfo-name">
                    {userInfo.firstname} {userInfo.lastname}
                </h2>

                {/* כתובת */}
                <p className="userinfo-address">
                    📍 {userInfo.address}
                </p>

                <hr />

                {/* פרטים */}
                <div className="userinfo-details">
                    <p><strong>📧 אימייל:</strong> {userInfo.email}</p>
                    <p><strong>📞 טלפון:</strong> {userInfo.phonenumber}</p>
                    <p><strong>👤 מגדר:</strong> {userInfo.gender === "female" ? "נקבה" : "זכר"}</p>
                    <p><strong>🎂 תאריך לידה:</strong> {userInfo.birthdate}</p>
                </div>

                {/* פעולות */}
                <div className="userinfo-actions">
                    <a
                        href={`tel:${userInfo.phonenumber}`}
                        className="userinfo-btn phone"
                    >
                        📞 התקשר
                    </a>

                    <a
                        href={`mailto:${userInfo.email}`}
                        className="userinfo-btn mail"
                    >
                        ✉️ שלח מייל
                    </a>
                </div>

            </div>)}
        </div>
    )
}

