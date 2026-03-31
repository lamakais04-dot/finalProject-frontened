import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../componentsCss/SignUp.css'
import { Modal, Box } from "@mui/material";
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext'

export default function Signup() {

    const modalStyle = {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",

        width: "420px",
        maxWidth: "90vw",

        backgroundColor: "#ffffff",
        borderRadius: "18px",

        boxShadow: "0 25px 70px rgba(0,0,0,0.25)",

        textAlign: "right",
        padding: "28px 32px",
        direction: "rtl"
    };

    const { fetchUser, user, loading } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (loading) return
        if (user) navigate("/")
    }, [loading, user])

    const [imageFile, setImageFile] = useState("")
    const [imagePreview, setImagePreview] = useState("")
    const [firstName, setFirstName] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [lastName, setLastName] = useState("")
    const [birthDate, setBirthDate] = useState("")
    const [address, setAddress] = useState("")
    const [gender, setGender] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassWord] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [onSignUpSuccess, setOnSignUpSuccess] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    const handleRemoveImage = () => {
        setImageFile("")
        setImagePreview("")
        setImageUrl("")
    }


    const isValidEmail = (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

    const isValidPhone = /^\d{10}$/.test(phoneNumber)

    const isPasswordsMatch = password === confirmPassword

    const isOldEnough = () => {
        if (!birthDate) return false
        const birth = new Date(birthDate)
        const today = new Date()
        let age = today.getFullYear() - birth.getFullYear()
        const m = today.getMonth() - birth.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            age--
        }
        return age >= 15
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setErrorMsg("")

        if (!isValidEmail(email)) {
            setErrorMsg("יש להזין כתובת אימייל תקינה")
            return
        }

        if (!isOldEnough()) {
            setErrorMsg("ההרשמה מותרת מגיל 15 ומעלה")
            return
        }

        if (!isValidPhone) {
            setErrorMsg("מספר טלפון חייב להכיל 10 ספרות")
            return
        }
        if (!isPasswordsMatch) {
            setErrorMsg("הסיסמאות אינן תואמות")
            return
        }

        const payload = {
            firstname: firstName,
            lastname: lastName,
            birthdate: birthDate,
            address,
            gender,
            email,
            password,
            phonenumber: phoneNumber,
            isadmin: false,
            imageurl: imageUrl ? imageUrl : null
        };

        await axios.post(
            "http://localhost:8000/api/auth/signup",
            payload,
            {
                withCredentials: true,
                headers: { apiKey: "123456789apikeysecure" }
            }
        )

        setOnSignUpSuccess(true)
    }

    const handleSuccesClose = () => {
        setOnSignUpSuccess(false)
        navigate("/")
    }

    return (
        <div className="signup-page">
            <div className="signup-card">

                <h2 className="signup-title">יצירת חשבון</h2>

                <form className="signup-form" onSubmit={handleSubmit}>

                    <input
                        className="signup-input"
                        placeholder="שם פרטי"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />

                    <input
                        className="signup-input"
                        placeholder="שם משפחה"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />

                    <input
                        className="signup-input"
                        placeholder="כתובת"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />

                    <div className="field-group">
                        <label className="signup-label">תאריך לידה</label>
                        <input
                            className="signup-input"
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="field-group">
                        <label className="signup-label">תמונת פרופיל (לא חובה)</label>

                        <input
                            id="signupImageUpload"
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={async (e) => {
                                const file = e.target.files[0]
                                if (!file) return

                                setImageFile(file)
                                setImagePreview(URL.createObjectURL(file))

                                const fd = new FormData()
                                fd.append("image_file", file)

                                const res = await axios.post(
                                    "http://localhost:8000/api/auth/uploadImage",
                                    fd,
                                    {
                                        withCredentials: true,
                                        headers: { apiKey: "123456789apikeysecure" }
                                    }
                                )
                                setImageUrl(res.data)
                            }}
                        />

                        {imagePreview && (
                            <div className="image-preview-wrapper">
                                <img
                                    src={imagePreview}
                                    alt="preview"
                                    className="signup-image-preview"
                                />
                                <button
                                    type="button"
                                    className="remove-image-btn"
                                    onClick={() => {
                                        setImageFile("")
                                        setImagePreview("")
                                        setImageUrl("")
                                    }}
                                >
                                    ✕ הסר תמונה
                                </button>
                            </div>
                        )}

                        <label
                            htmlFor="signupImageUpload"
                            className="file-button"
                            style={{ display: "inline-block", cursor: "pointer" }}
                        >
                            {imagePreview ? "החלף תמונה" : "בחר תמונה"}
                        </label>
                    </div>


                    <div className="field-group">
                        <label className="signup-label">מגדר</label>
                        <select
                            className="signup-input"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        >
                            <option value="">בחר מגדר</option>
                            <option value="male">זכר</option>
                            <option value="female">נקבה</option>
                            <option value="other">אחר</option>
                        </select>
                    </div>

                    <input
                        className="signup-input full-width"
                        placeholder="אימייל"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <div className="password-input-wrapper">
                        <input
                            className="signup-input full-width"
                            type={showPassword ? "text" : "password"}
                            placeholder="סיסמה"
                            value={password}
                            onChange={(e) => setPassWord(e.target.value)}
                            required
                        />
                        <span
                            className="toggle-password"
                            onClick={() => setShowPassword(prev => !prev)}
                        >
                            {showPassword ? "הסתר" : "הצג"}
                        </span>
                    </div>

                    <div className="password-input-wrapper">
                        <input
                            className={`signup-input full-width ${confirmPassword && !isPasswordsMatch ? "input-error" : ""
                                }`}
                            type={showPassword ? "text" : "password"}
                            placeholder="אימות סיסמה"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <span
                            className="toggle-password"
                            onClick={() => setShowConfirmPassword(prev => !prev)}
                        >
                            {showConfirmPassword ? "הסתר" : "הצג"}
                        </span>
                    </div>

                    <input
                        className="signup-input full-width"
                        placeholder="טלפון"
                        value={phoneNumber}
                        onChange={(e) =>
                            setPhoneNumber(e.target.value.replace(/\D/g, ""))
                        }
                        maxLength={10}
                        required
                    />

                    {errorMsg && (
                        <p className="signup-error">{errorMsg}</p>
                    )}

                    <button
                        className="signup-button full-width"
                        disabled={
                            !firstName ||
                            !lastName ||
                            !email ||
                            !password ||
                            !isValidPhone
                        }
                    >
                        הרשמה
                    </button>
                </form>

                <p style={footerText}>
                    כבר יש לך חשבון?{" "}
                    <Link to="/login" style={linkStyle}>
                        היכנס
                    </Link>
                </p>

            </div>

            <Modal open={onSignUpSuccess} onClose={handleSuccesClose}>
                <Box sx={modalStyle}>
                    <h2 style={{ margin: "0 0 8px 0", fontWeight: 700 }}>
                        ההרשמה הושלמה בהצלחה
                    </h2>
                    <p style={{ margin: "0 0 20px 0", color: "#4b5563" }}>
                        החשבון נוצר בהצלחה. ניתן להתחבר למערכת.
                    </p>
                    <button
                        className="signup-success-btn"
                        onClick={handleSuccesClose}
                    >
                        המשך
                    </button>
                </Box>
            </Modal>
        </div>
    )
}

const footerText = {
    fontSize: "20px",
    color: "#6b7280",
}

const linkStyle = {
    color: "rgba(102, 162, 253, 1)",
    fontWeight: "bold",
    textDecoration: "none",
}
