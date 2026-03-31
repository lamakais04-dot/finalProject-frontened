import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ListingItem from './listingItem'
import { Box, Modal, Pagination } from '@mui/material'
import qs from "qs"
import '../componentsCss/listing.css'
import { useAuth } from '../context/AuthContext'
import { Link, useLocation } from 'react-router-dom'

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
    }

    const { user } = useAuth()
    const location = useLocation()

    const searchParams = new URLSearchParams(location.search)
    const searchTerm = searchParams.get("search") || ""


    const [categories, setCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [openCategories, setOpenCategories] = useState(false)
    const [categorySearch, setCategorySearch] = useState("")

    const [listings, setListings] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [page, setPage] = useState(1)
    const [pageNumbers,setPageNumbers] = useState(10)
    const [isSearched, setIsSearched] = useState(false)

    useEffect(() => {
        if (searchTerm != "") {
            setIsSearched(true)
        }
    }, [searchTerm])

    useEffect(() => {
        getCategories()
    }, [])

    useEffect(() => {
        getListings()
    }, [page, selectedCategories])

    const getCategories = async () => {
        try {
            const res = await axios.get("/api/category", {
                withCredentials: true,
                headers: {
                    apiKey: "123456789apikeysecure"
                }
            )
            setCategories(res.data)
        } catch (err) {
            console.log("error:", err)
        }
    }

    const getListings = async () => {
        setIsLoading(true)
        setHasError(false)

        try {
            if (!user?.id) {
                const response = await axios.get(`/api/listing/user`,
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
                const response = await axios.get(`/api/listing/withoutMine`,
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
        } finally {
            setIsLoading(false)
        }
    }

    const filteredListings = listings?.filter(l =>
        l.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.description?.toLowerCase().includes(searchTerm.toLowerCase())

    )

    const handlePageChange = (event, value) => {
        setPage(value)
    }

    return (
        <div className="listing-container">

            <div className="category-filter-bar">

                {selectedCategories.map(catId => {
                    const cat = categories?.find(c => c.id === catId)
                    if (!cat) return null

                    return (
                        <div key={catId} className="category-tag">
                            <span>{cat.name}</span>
                            <span
                                className="category-tag-remove"
                                onClick={() =>
                                    setSelectedCategories(prev =>
                                        prev.filter(id => id !== catId)
                                    )
                                }
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

            {isLoading && (
                <h3 className="loading-text">⏳ ...טוען פרסומים</h3>
            )}

            {!isLoading && hasError && (
                <h3 className="loading-text" style={{ color: "crimson" }}>
                    ❌ לא הצלחנו לטעון פרסומים כרגע
                </h3>
            )}

            {!isLoading && !hasError && listings?.length > 0 && filteredListings?.length === 0 && (
                <>
                    <h3 className="loading-text">
                        🔍 לא נמצאו פרסומים שמתאימים לחיפוש {searchTerm}
                    </h3>
                    <Link onClick={()=>{setIsSearched(false)}} style={{
                        color: "rgba(102, 162, 253, 1)",
                        fontWeight: "600",
                        fontSize: "20px",
                        textDecoration: "none"
                    }} to="/listings">חזרה לכל הפרסומים</Link></>
            )}

            {!isLoading && !hasError && listings?.length === 0 && (
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

            {!isLoading && !hasError && filteredListings?.length > 0 && (
                <>

                    {isSearched && (<Link onClick={()=>{setIsSearched(false)}} style={{
                        color: "rgba(102, 162, 253, 1)",
                        fontWeight: "600",
                        fontSize: "20px",
                        textDecoration: "none"
                    }} to="/listings">חזרה לכל הפרסומים</Link>)}
                    <div className="listings-grid">

                        {filteredListings?.map(l => (
                            <ListingItem
                                key={l.id}
                                listing={l}
                                userId={l.userid}
                            />
                        ))}
                    </div>
                </>)}

            <Pagination
                count={pageNumbers}
                page={page}
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

                            {categories?.filter(c => (c.name || "").includes(categorySearch)).map(c => (
                                    <button
                                        key={c.id}
                                        onClick={() => {
                                            setSelectedCategories(prev =>
                                                prev.includes(c.id)
                                                    ? prev
                                                    : [...prev, c.id]
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
    )
}
