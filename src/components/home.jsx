import React from 'react'
import bg from '../images/Screenshot 2026-01-08 083307.png'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function home() {
    const { user } = useAuth()

    return (
        <>
            <div
                style={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundImage: `url(${bg})`,
                    borderRadius: "15px",
                    backgroundSize: 'cover',
                    marginTop: "120px",
                    height: '500px',
                    width: "90%"
                }}
            >
                <h1 style={{ zIndex: 1, color: 'white', fontSize: "80px", margin: "0px" }}>
                    אתר ההשכרה של הכפר
                </h1>

                <p style={{ zIndex: 1, color: 'white', fontSize: "30px" }}>
                    ,תראו את כל הפרסומים של השכרות ציוד או שירות באתר שלנו <br />
                    ותוכלו ליצור קשר עם המפרסם או אפילו לפרסם בעצמכם
                </p>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        width: "80%",
                        gap: "20px",
                        flexWrap: "wrap"
                    }}
                >
                    <button
                        style={{
                            width: "200px",
                            height: "50px",
                            borderRadius: "10px",
                            backgroundColor: "white",
                            border: "none",
                            cursor: "pointer"
                        }}
                    >
                        <Link
                            style={{
                                color: "rgba(102, 162, 253, 1)",
                                fontFamily: "ui-monospace",
                                fontWeight: "100",
                                fontSize: "20px",
                                textDecorationLine: "none"
                            }}
                            to="/listings"
                        >
                            לכל הפרסומים
                        </Link>
                    </button>

                    {user && (
                        <button
                            style={{
                                width: "200px",
                                height: "50px",
                                borderRadius: "10px",
                                backgroundColor: "white",
                                border: "none",
                                cursor: "pointer"
                            }}
                        >
                            <Link
                                style={{
                                    color: "rgba(102, 162, 253, 1)",
                                    fontFamily: "ui-monospace",
                                    fontWeight: "100",
                                    fontSize: "20px",
                                    textDecorationLine: "none"
                                }}
                                to="/myListing"
                            >
                                הפרסומים שלי
                            </Link>
                        </button>
                    )}

                    {!user && (
                        <button
                            style={{
                                width: "200px",
                                height: "50px",
                                borderRadius: "10px",
                                backgroundColor: "white",
                                border: "none",
                                cursor: "pointer"
                            }}
                        >
                            <Link
                                style={{
                                    color: "rgba(102, 162, 253, 1)",
                                    fontFamily: "ui-monospace",
                                    fontWeight: "100",
                                    fontSize: "20px",
                                    textDecorationLine: "none"
                                }}
                                to="/signup"
                            >
                                הצטרפו אלינו
                            </Link>
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}
