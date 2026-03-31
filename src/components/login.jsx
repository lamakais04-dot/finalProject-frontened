import { Modal, Box } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import "../componentsCss/Login.css";

export default function Login() {
    const navigate = useNavigate();
    const { fetchUser } = useAuth();

    const [onLoginSuccess, setOnLoginSuccess] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassWord] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const isValidEmail = (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const isPasswordValid = password.length >= 6;

    const isFormValid = isValidEmail(email) && isPasswordValid;

    const handleLogin = async (event) => {
        event.preventDefault();
        setErrorMsg("");

        if (!isFormValid) return;

        try {
            await axios.post(
                "/api/auth/login",
                { email, password },
                {
                    withCredentials: true,
                    headers: { apiKey: "123456789apikeysecure" }
                }
            );

            setOnLoginSuccess(true);
        } catch (err) {
            setErrorMsg("פרטי ההתחברות שגויים. אנא נסה שוב.");
        }
    };

    const handleSuccesClose = async () => {
        setOnLoginSuccess(false);
        await fetchUser();
        navigate("/");
    };

    return (
        <>
            <div className="login-page" dir="rtl">
                <h1 className="login-main-title">
                    ברוך הבא, התחבר כדי שתוכל לפרסם גם אתה
                </h1>

                <div className="login-card">
                    <h2 className="login-title">התחברות</h2>
                    <p className="login-subtitle">התחבר כדי להמשיך</p>

                    <form className="login-form" onSubmit={handleLogin}>

                        <input
                            type="email"
                            placeholder="אימייל"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="login-input"
                        />

                        <div className="password-input-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="סיסמה"
                                value={password}
                                onChange={(e) => setPassWord(e.target.value)}
                                className="login-input"
                            />
                            <span
                                className="toggle-password"
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                {showPassword ? "הסתר" : "הצג"}
                            </span>
                        </div>

                        {errorMsg && (
                            <p className="login-error">
                                {errorMsg}
                            </p>
                        )}

                        <button
                            className="login-button"
                            disabled={!isFormValid}
                        >
                            התחבר
                        </button>
                    </form>

                    <p className="login-footer">
                        אין לך חשבון?{" "}
                        <Link to="/signup" className="login-link">
                            הרשמה
                        </Link>
                    </p>
                </div>
            </div>

            <Modal open={onLoginSuccess} onClose={handleSuccesClose}>
                <Box className="login-success-modal">
                    <h2 className="success-title">
                        התחברת בהצלחה
                    </h2>

                    <p className="success-text">
                        ההתחברות בוצעה בהצלחה. אתה מועבר כעת למערכת.
                    </p>

                    <button
                        className="success-btn"
                        onClick={handleSuccesClose}
                    >
                        המשך
                    </button>
                </Box>
            </Modal>
        </>
    );
}
