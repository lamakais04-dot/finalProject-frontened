import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ListingItem from './ListingItem'
import CreateListing from './CreateListing';
import { Box, Modal, Pagination } from '@mui/material';
import qs from "qs"
import '../componentsCss/listing.css'
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom'

export default function Listing() {
    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",

        width: "520px",
        maxWidth: "95vw",
        maxHeight: "85vh",

        backgroundColor: "#ffffff",
        borderRadius: "24px",

        boxShadow: "0 40px 100px rgba(0,0,0,0.35)",

        overflow: "hidden",
    };

    const [categories, setCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [openCategories, setOpenCategories] = useState(false)
    const [categorySearch, setCategorySearch] = useState("")
    const { user } = useAuth()

    const [listings, setLestings] = useState([])
    const [ifListings, setIfListings] = useState(false)
    const [page, setPage] = useState(1)

    // ⭐ UX STATE – הוספה בלבד
    const [hasError, setHasError] = useState(false)

    const getCategories = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/category", {
                withCredentials: true,
                headers: {
                    apiKey: "123456789apikeysecure"
                }
            })
            setCategories(res.data)
        } catch (error) {
            console.error("error: ", error)
        }
    }

    useEffect(() => { getCategories() }, [])
    useEffect(() => { getListings() }, [page, selectedCategories])

    async function getListings() {
        setIfListings(true)
        setHasError(false)

        try {
            if (!user?.id) {
                const response = await axios.get(`http://localhost:8000/api/listing/user`,
                    {
                        params: {
                            page: page,
                            categories: selectedCategories
                        },
                        paramsSerializer: params =>
                            qs.stringify(params, { arrayFormat: "repeat" }),
                        withCredentials: true,
                        headers: {
                            apiKey: "123456789apikeysecure"
                        }
                    })
                setLestings(response.data)
            } else {
                const response = await axios.get(`http://localhost:8000/api/listing/withoutMine`,
                    {
                        params: {
                            page: page,
                            categories: selectedCategories
                        },
                        paramsSerializer: params =>
                            qs.stringify(params, { arrayFormat: "repeat" }),
                        withCredentials: true,
                        headers: {
                            apiKey: "123456789apikeysecure"
                        }
                    })
                setLestings(response.data)
            }
        }
        catch (err) {
            console.log("error: ", err)
            setHasError(true)
        }
        finally {
            setIfListings(false)
        }
    }

    const handlePageChange = (event, page) => {
        setPage(page)
    }

    return (
        <>
            <div className="listing-container">
                <div className="category-filter-bar">

                    {selectedCategories.map(catId => {
                        const cat = categories.find(c => c.id === catId)
                        if (!cat) return null

                        return (
                            <div key={catId} className="category-tag">
                                <span>{cat.name}</span>
                                <span
                                    onClick={() =>
                                        setSelectedCategories(prev =>
                                            prev.filter(id => id !== catId)
                                        )
                                    }
                                    className="category-tag-remove"
                                >
                                    ✖
                                </span>
                            </div>
                        )
                    })}

                    <button
                        onClick={() => setOpenCategories(true)}
                        className="category-button"
                    >
                        מיון לפי קטגוריה
                    </button>
                </div>

                <h1 className="listing-page-title">פרסומים להשכרה</h1>

                {/* ⏳ טעינה */}
                {ifListings && (
                    <h3 className="loading-text">⏳ ...טוען פרסומים, אנא המתן</h3>
                )}

                {/* ❌ שגיאה */}
                {!ifListings && hasError && (
                    <h3 className="loading-text" style={{ color: "crimson" }}>
                        ❌ לא הצלחנו לטעון פרסומים כרגע. נסה שוב מאוחר יותר.
                    </h3>
                )}

                {/* ⭐ אין פרסומים */}
                {!ifListings && !hasError && listings.length === 0 && (
                    <div style={{ textAlign: "center", marginTop: "40px" }}>
                        <h3 className="loading-text">
                            😕 אין עדיין פרסומים בקטגוריה הזו
                        </h3>

                        {user && (
                            <p style={{ marginTop: "16px", fontSize: "18px" }}>
                                <Link
                                    to="/createListing"
                                    style={{
                                        color: "rgba(102, 162, 253, 1)",
                                        fontWeight: "600",
                                        textDecoration: "none"
                                    }}
                                >
                                    ✨ תהיה הראשון לפרסם כאן
                                </Link>
                            </p>
                        )}
                    </div>
                )}

                {/* 📦 יש פרסומים */}
                {!ifListings && !hasError && listings.length > 0 && (
                    <div className="listings-grid">
                        {listings.map(l => (
                            <ListingItem key={l.id} listing={l} userId={l.userid} />
                        ))}
                    </div>
                )}

                <Pagination
                    count={15}
                    onChange={handlePageChange}
                    className="pagination-container"
                />

                <Modal open={openCategories} onClose={() => setOpenCategories(false)}>
                    <Box sx={modalStyle}>
                        <div className="category-modal-wrapper">

                            <h2 className="category-modal-title">בחר קטגוריה</h2>

                            <input
                                value={categorySearch}
                                onChange={(e) => setCategorySearch(e.target.value)}
                                placeholder="חפש קטגוריה..."
                                className="category-search-input"
                            />

                            <div className="category-list">
                                <button
                                    onClick={() => {
                                        setSelectedCategories([])
                                        setOpenCategories(false)
                                    }}
                                    className="category-list-button all"
                                >
                                    הכל
                                </button>

                                {categories
                                    .filter(c => (c.name || "").includes(categorySearch))
                                    .map(c => (
                                        <button
                                            key={c.id}
                                            onClick={() => {
                                                setSelectedCategories(prev =>
                                                    prev.includes(c.id) ? prev : [...prev, c.id]
                                                )
                                                setOpenCategories(false)
                                            }}
                                            className="category-list-button"
                                        >
                                            {c.name}
                                        </button>
                                    ))}
                            </div>

                        </div>
                    </Box>
                </Modal>
            </div>
        </>
    )
}
