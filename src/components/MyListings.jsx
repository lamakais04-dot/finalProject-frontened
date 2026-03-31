import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CreateListing from './createListing';
import ListingItem from './listingItem'
import { useAuth } from '../context/AuthContext'
import { Box, Modal, Pagination } from '@mui/material';
import '../componentsCss/listing.css'


export default function MyListings() {
    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",

        width: 460,
        maxWidth: "90vw",

        bgcolor: "#ffffff",
        borderRadius: "20px",

        boxShadow: "0 20px 60px rgba(0,0,0,0.25)",

        textAlign: 'center',
        p: 4,
    };

    const [listings, setListings] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [listingToDelete, setListingToDelete] = useState(null)
    const { user } = useAuth()

    const getMyCategories = async () => {
        const res = await axios.get(
            "http://localhost:8000/api/category/my/categories",
            { withCredentials: true, headers: { apiKey: "123456789apikeysecure" } }
        )
        setCategories(res.data)
    }

    const getMyListings = async (categoryId = null) => {
        const res = await axios.get(
            "http://localhost:8000/api/listing/get/my",
            {
                params: categoryId ? { categoryId } : {},
                withCredentials: true,
                headers: { apiKey: "123456789apikeysecure" }
            }
        )
        setListings(res.data)
        setIsLoading(false)
    }
    useEffect(() => {
        getMyListings()
        getMyCategories()
    }, [])

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId)
        getMyListings(categoryId)
    }


    const handleAskDelete = (listing) => {
        setListingToDelete(listing)
    }

    const handleConfirmDelete = async () => {
        await axios.delete(
            `http://localhost:8000/api/listing/${listingToDelete.id}`,
            {
                withCredentials:true,
                headers: {
                    apiKey: "123456789apikeysecure"
                }
            }
        )

        setListings(listings.filter(l => l.id !== listingToDelete.id))
        setListingToDelete(null)
    }

    return (
        <div className='listing-container'>
            {isLoading ? (<h1 className="loading-text">...טוען</h1>) :

                (<><div className="my-listings-categories">

                    <button
                        className={`category-chip ${selectedCategory === null ? "active" : ""}`}
                        onClick={() => handleCategorySelect(null)}
                    >
                        הכל
                    </button>

                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`category-chip ${selectedCategory === cat.id ? "active" : ""}`}
                            onClick={() => handleCategorySelect(cat.id)}
                        >
                            {cat.name}
                        </button>
                    ))}

                </div>

                <div className='listings-grid'>
                {listings.map(l => (
                    <ListingItem listing={l} userId={l.userid} askToDelete={handleAskDelete}  ></ListingItem>
                ))}
            </div></>)}


            <Modal
                open={!!listingToDelete}
                onClose={() => setListingToDelete(null)}
            >
                <Box sx={modalStyle}>
                    <h2 className="delete-modal-title">
                        מחק פרסום
                    </h2>

                    <p className="delete-modal-text">
                        האם אתה בטוח שאתה רוצה למחוק
                        <strong> {listingToDelete?.title} </strong>
                        <br />
                        ! אתה לא יכול לשחזר
                    </p>

                    <div className="modal-buttons">
                        <button
                            className="modal-action-btn cancel-button"
                            onClick={() => setListingToDelete(null)}
                        >
                            ביטול
                        </button>

                        <button
                            onClick={handleConfirmDelete}
                            className="modal-action-btn delete-button"
                        >
                            מחק
                        </button>
                    </div>
                </Box>
            </Modal>

        </div>

    )
}
