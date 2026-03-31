import React from 'react'
import { useAuth } from '../context/AuthContext'
import "../componentsCss/UserProfile.css"

export default function UserProfile() {
  const { user } = useAuth()

  if (!user) {
    return <div className="profile-loading">טוען פרופיל...</div>
  }

  return (
    <div className="profile-page">
      <div className="profile-card">

        <div
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "#e5e7eb",
            margin: "0 auto 20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "48px"
          }}
        >
          {user.imageurl
            ? <img
              src={user.imageurl}
              alt="profile"
              style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
            />
            : "👤"
          }
        </div>

        <h2 className="profile-name">
          {user.firstname} {user.lastname}
        </h2>

        <span className={`profile-role ${user.isadmin ? "admin" : ""}`}>
          {user.isadmin ? "אדמין" : "משתמש"}
        </span>

        <div className="profile-details">
          <ProfileRow label="אימייל" value={user.email} />
          <ProfileRow label="טלפון" value={user.phonenumber} />
          <ProfileRow label="מגדר" value={translateGender(user.gender)} />
          <ProfileRow label="תאריך לידה" value={formatDate(user.birthdate)} />
          <ProfileRow label="כתובת" value={user.address} />
        </div>

      </div>
    </div>
  )
}

function ProfileRow({ label, value }) {
  return (
    <div className="profile-row">
      <span className="profile-label">{label}</span>
      <span className="profile-value">{value}</span>
    </div>
  )
}

function translateGender(gender) {
  if (!gender) return "-"
  if (gender === "male") return "זכר"
  if (gender === "female") return "נקבה"
  return "אחר"
}

function formatDate(dateStr) {
  if (!dateStr) return "-"
  return new Date(dateStr).toLocaleDateString("he-IL")
}
