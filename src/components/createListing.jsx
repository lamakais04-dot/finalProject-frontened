import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "../componentsCss/CreateListing.css"
import { Modal, Box } from '@mui/material'
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from '../context/AuthContext'

export default function CreateListing() {

    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "420px",
        maxWidth: "90vw",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        textAlign: "center",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        animation: "fadeIn 0.25s ease-out"
    }

    const { user } = useAuth()
    const { id } = useParams()
    const isEdit = !!id
    const navigate = useNavigate()

    const [listing, setListing] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const [onCreateSuccess, setOnCreateSuccess] = useState(false)
    const [userid, setUserId] = useState(user?.id || "")
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [imageFile, setImageFile] = useState(null)
    const [imageUrl, setImageUrl] = useState("")
    const [categoryid, setCategoryid] = useState("")
    const [availability, setAvailability] = useState("")
    const [type, setType] = useState("שירות")
    const [categories, setCategories] = useState([])

    const [errorMsg, setErrorMsg] = useState("")
    const [imagePreview, setImagePreview] = useState("")

    const isFormValid =
        (title != "") &&
        (price != "") &&
        (availability != "") &&
        (description != "") &&
        (categoryid != "")


    const handleRemoveImage = () => {
        setImageFile(null)
        setImagePreview("")
        setImageUrl("")
        document.getElementById("imageUpload").value = "" 
    }

    useEffect(() => {
        if (!isEdit) return

        const getEditedListing = async () => {
            setIsLoading(true)
            try {
                const res = await axios.get(
                    `http://localhost:8000/api/listing/${id}`,
                    { withCredentials: true, headers: { apiKey: "123456789apikeysecure" } }
                )
                setListing(res.data)
                setIsLoading(false)

            } catch (err) {
                console.log("error:", err)
            }
        }

        getEditedListing()
    }, [id, isEdit])

    useEffect(() => {
        async function getCategories() {
            const response = await axios.get(
                "http://localhost:8000/api/category",
                { withCredentials: true, headers: { apiKey: "123456789apikeysecure" } }
            )
            setCategories(response.data)
        }
        getCategories()
    }, [])

    useEffect(() => {
        if (!listing) return

        setUserId(user.id)
        setTitle(listing.title)
        setPrice(listing.price)
        setDescription(listing.description)
        setAvailability(listing.availability)
        setCategoryid(listing.categoryid)
        setType(listing.type)
        setImageUrl(listing.imageFile)

        if (listing.imageFile) {
            setImagePreview(listing.imageFile)
        }
    }, [listing])


    const handleSubmit = async (event) => {
        event.preventDefault()
        setErrorMsg("")

        if (!isFormValid) {
            setErrorMsg("יש למלא את כל שדות החובה לפני פרסום")
            return
        }

        if (Number(price) <= 0) {
            setErrorMsg("המחיר חייב להיות מספר גדול מאפס")
            return
        }

        const payload = {
            userid,
            title,
            description,
            price: Number(price),
            availability,
            categoryid: Number(categoryid),
            imageFile: imageUrl || null,
            type
        }

        try {
            if (isEdit) {
                await axios.put(
                    `http://localhost:8000/api/listing/${id}`,
                    payload,
                    { withCredentials: true, headers: { apiKey: "123456789apikeysecure" } }
                )
                navigate("/myListing")
            } else {
                await axios.post(
                    "http://localhost:8000/api/listing",
                    payload,
                    { withCredentials: true, headers: { apiKey: "123456789apikeysecure" } }
                )
                setOnCreateSuccess(true)
                navigate("/myListing")
            }
        } catch (err) {
            setErrorMsg("אירעה שגיאה בעת יצירת הפרסום, נסי שוב")
        } finally {
            setIsLoading(false)
        }
    }

    const handleSuccesClose = () => {
        navigate("/listings")
    }

    return (
        <>

            {isLoading && (<h1 className="loading-text">...טוען</h1>)}

            <div className="create-listing-container">
                {isEdit &&
                    <div
                        className="single-back-btn"
                        onClick={() => navigate(-1)}
                    >
                        חזרה לכל הפרסומים שלי
                    </div>}
                <h1 className="create-listing-title">
                    {isEdit ? "עריכת פרסום" : "יצירת פרסום"}
                </h1>

                <form className="create-listing-form" onSubmit={handleSubmit} noValidate>

                    <input
                        className="form-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="כותרת הפרסום"
                    />

                    <input
                        className="form-input"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="מחיר"
                    />

                    <input
                        className="form-input"
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                        placeholder="זמינות"
                    />

                    <textarea
                        className="form-textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="תיאור הפרסום"
                    />

                    <div className="form-field">
                        <label className="signup-label">העלאת תמונה</label>

                        <input
                            id="imageUpload"
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
                                    "http://localhost:8000/api/listing/uploadImage",
                                    fd,
                                    { withCredentials: true, headers: { apiKey: "123456789apikeysecure" } }
                                )
                                setImageUrl(res.data)
                            }}
                        />

                        {imagePreview && (
                            <div className="image-preview-wrapper">
                                <img
                                    src={imagePreview}
                                    alt="preview"
                                    className="listing-image-preview"
                                />
                                <button
                                    type="button"
                                    className="remove-image-btn"
                                    onClick={handleRemoveImage}
                                >
                                    ✕ הסר תמונה
                                </button>
                            </div>
                        )}

                        <div className="file-upload-wrapper">
                            <button
                                type="button"
                                className="file-button"
                                onClick={() => document.getElementById("imageUpload").click()}
                            >
                                {imagePreview ? "החלף תמונה" : "בחר תמונה"}
                            </button>

                            <span className="file-name">
                                {imageFile ? imageFile.name : "לא נבחר קובץ"}
                            </span>
                        </div>
                    </div>


                    <select
                        className="form-select"
                        value={categoryid}
                        onChange={(e) => setCategoryid(e.target.value)}
                    >
                        <option value="">בחירת קטגוריה</option>
                        {categories.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>

                    <select
                        className="form-select"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="שירות">שירות</option>
                        <option value="ציוד">ציוד</option>
                    </select>

                    {errorMsg && (
                        <p className="signup-error">{errorMsg}</p>
                    )}
                    <div className='button-contains'>
                        <button
                            className="submit-button"
                            type="submit"
                            disabled={!isFormValid}
                        >
                            {isEdit ? "שמירת שינויים" : "יצירת פרסום"}
                        </button>
                        {isEdit && <button
                            className="cancel-button"
                            type="submit"
                            disabled={!isFormValid}
                        >
                            ביטול שינויים
                        </button>}
                    </div>
                </form>

                <Modal open={onCreateSuccess} onClose={handleSuccesClose}>
                    <Box sx={modalStyle}>
                        <h2>הפרסום נוצר בהצלחה 🎉</h2>
                        <button
                            className="signup-success-btn"
                            onClick={handleSuccesClose}
                        >
                            סגירה
                        </button>
                    </Box>
                </Modal>

            </div></>
    )
}
