import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "../componentsCss/admin.css"

export default function AdminCategories() {

    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [editId, setEditId] = useState(null)
    const [editedName, setEditedName] = useState("")
    const [deleteId, setDeleteId] = useState(null)
    const [isAdding, setIsAdding] = useState(false)
    const [newCategoryName, setNewCategoryName] = useState("")

    const getCategories = async () => {
        try {
            const result = await axios.get(
                "http://localhost:8000/api/category",
                {
                    withCredentials: true,
                    headers: { apiKey: "123456789apikeysecure" }
                }
            )
            setCategories(result.data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const save = async () => {
        try {
            await axios.put(
                `http://localhost:8000/api/category/${editId}`,
                { name: editedName },
                {
                    withCredentials: true,
                    headers: { apiKey: "123456789apikeysecure" }
                }
            )

            setCategories(prev =>
                prev.map(cat =>
                    cat.id === editId
                        ? { ...cat, name: editedName }
                        : cat
                )
            )

            setEditId(null)
        } catch (err) {
            console.error(err)
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(
                `http://localhost:8000/api/category/delete/${id}`,
                {
                    withCredentials: true,
                    headers: { apiKey: "123456789apikeysecure" }
                }
            )

            setCategories(prev => prev.filter(cat => cat.id !== id))
        } catch (err) {
            console.error(err)
        }
    }

    const addCategory = async () => {
        if (!newCategoryName.trim()) return

        try {
            const res = await axios.post(
                "http://localhost:8000/api/category",
                { name: newCategoryName },
                {
                    withCredentials: true,
                    headers: { apiKey: "123456789apikeysecure" }
                }
            )

            setCategories(prev => [...prev, res.data])

            setNewCategoryName("")
            setIsAdding(false)

        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div className="admin-page">
            <h1 className="admin-title">ניהול קטגוריות</h1>

            <div style={{ marginBottom: "20px" }}>
                {!isAdding ? (
                    <button
                        className="admin-btn edit"
                        onClick={() => setIsAdding(true)}
                    >
                        ➕ הוספת קטגוריה
                    </button>
                ) : (
                    <>
                        <input
                            className="admin-input"
                            placeholder="שם קטגוריה חדשה"
                            value={newCategoryName}
                            onChange={e => setNewCategoryName(e.target.value)}
                        />

                        <button className="admin-btn save" onClick={addCategory}>
                            ✔ הוסף
                        </button>

                        <button
                            className="admin-btn cancel"
                            onClick={() => {
                                setIsAdding(false)
                                setNewCategoryName("")
                            }}
                        >
                            ✖ ביטול
                        </button>
                    </>
                )}
            </div>

            {loading ? (
                <p className="admin-loading">טוען קטגוריות...</p>
            ) : (
                <div className="admin-card">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>שם קטגוריה</th>
                                <th>פעולות</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((cat, index) => (
                                <tr key={cat.id}>
                                    <td>{index + 1}</td>

                                    <td>
                                        {editId === cat.id ? (
                                            <input
                                                className="admin-input"
                                                value={editedName}
                                                onChange={e => setEditedName(e.target.value)}
                                            />
                                        ) : (
                                            cat.name
                                        )}
                                    </td>

                                    <td>
                                        {editId === cat.id ? (
                                            <>
                                                <button className="admin-btn save" onClick={save}>
                                                    ✔ שמור
                                                </button>
                                                <button
                                                    className="admin-btn cancel"
                                                    onClick={() => setEditId(null)}
                                                >
                                                    ✖ ביטול
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    className="admin-btn edit"
                                                    onClick={() => {
                                                        setEditId(cat.id)
                                                        setEditedName(cat.name)
                                                    }}
                                                >
                                                    עריכה
                                                </button>
                                                <button className="admin-btn delete" onClick={() => { handleDelete(cat.id) }}>
                                                    מחיקה
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                    {categories.length === 0 && (
                        <p className="admin-empty">אין קטגוריות להצגה</p>
                    )}
                </div>
            )
            }
        </div >
    )
}
