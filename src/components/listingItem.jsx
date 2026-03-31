import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "../componentsCss/ListingItem.css"


export default function ListingItem(props) {
  const listing = props.listing
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleEdit = () =>{
    navigate(`/editListing/${listing?.id}`)
  }

  return (

    <div className="listing-card">
      <Link
        to={`/singleListing/${listing.id}`}
        className="listing-card-link"
      >
        <div className="listing-image-wrapper">
          <img
            src={listing.imageFile}
            alt={listing.title}
            className="listing-image"
          />

          <div className="image-overlay">
            <span className="overlay-text">לצפייה בפרטים</span>
          </div>

          <div className="listing-badges">
            {listing.user?.address && (
              <span className="listing-badge">
                📍 {listing.user.address}
              </span>
            )}
            {listing.user?.name && (
              <span onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                navigate(`/UserInfo/${listing.userid}`)
              }} className="listing-badge-light">
                👤 {listing.user.name}
              </span>
            )}
          </div>
        </div>

        <div className="listing-content">
          <h3 className="listing-title">
            {listing.title}
          </h3>

          <p className="listing-description">
            {listing.description}
          </p>
        </div>

        <div className="listing-footer">
          <div className="listing-price">
            ₪ {listing.price}
          </div>

          {!(user?.id == props.userId) ?
            (<div className="listing-contact-btn" onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              navigate(`/UserInfo/${listing.userid}`)
            }}>
              📞 צור קשר
            </div>) : (
              <div>

              </div>
            )}
        </div>

        {user?.id === listing.userid && (
          <div className="listing-actions">
            <button
              className="edit-btn"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleEdit()
              }}
            >
              ✏ עריכה
            </button>

            <button
              className="delete-btn"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                props.askToDelete(listing)
              }}
            >
              🗑 מחיקה
            </button>
          </div>
        )}

      </Link>
    </div>

  )
}
