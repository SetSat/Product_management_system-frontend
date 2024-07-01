import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { tokenStatus } from '../Redux/authSlice';

export default function InsertProduct() {
    const tokenFromRedux = useSelector(tokenStatus)
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState();
    const [productBarcode, setProductBarcode] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate("");

    const setName = (e) => {
        setProductName(e.target.value);
    };

    const setPrice = (e) => {
        setProductPrice(e.target.value);
    };

    const setBarcode = (e) => {
        const value = e.target.value.slice(0, 12);
        setProductBarcode(value);
    };

    const { id } = useParams("");

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await fetch(`https://product-management-backend-nxpo.onrender.com/products/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${tokenFromRedux}`
                    }
                });

                const data = await res.json();

                if (res.status === 201) {
                    console.log("Data Retrieved.");
                    setProductName(data.ProductName);
                    setProductPrice(data.ProductPrice);
                    setProductBarcode(data.ProductBarcode);
                } else {
                    console.log("Something went wrong. Please try again.");
                }
            } catch (err) {
                console.log(err);
            }
        };

        getProduct();
    }, [id,tokenFromRedux]);

    const updateProduct = async (e) => {
        e.preventDefault();

        if (!productName || !productPrice || !productBarcode) {
            setError("*Please fill in all the required fields.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(`https://product-management-backend-nxpo.onrender.com/updateproduct/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokenFromRedux}`
                },
                body: JSON.stringify({ "ProductName": productName, "ProductPrice": productPrice, "ProductBarcode": productBarcode })
            });

            await response.json();

            if (response.status === 201) {
                alert("Data Updated");
                navigate('/product');
            }
            else {
                setError("Something went wrong. Please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again later.");
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='container-fluid p-5'>
            <h1 className=''>Enter Product Information</h1>
            <div className="mt-5 col-lg-6 col-md-6 col-12">
                <label htmlFor="product_name" className="form-label fs-4 fw-bold">Product Name</label>
                <input type="text" onChange={setName} value={productName} className="form-control fs-5" id="product_name" placeholder="Enter Product Name" required />
            </div>
            <div className="mt-3 col-lg-6 col-md-6 col-12">
                <label htmlFor="product_price" className="form-label fs-4 fw-bold">Product Price</label>
                <input type="number" onChange={setPrice} value={productPrice} className="form-control fs-5" id="product_price" placeholder="Enter Product Price" required />
            </div>
            <div className="mt-3 mb-5 col-lg-6 col-md-6 col-12">
                <label htmlFor="product_barcode" className="form-label fs-4 fw-bold">Product Barcode</label>
                <input type="number" onChange={setBarcode} value={productBarcode} maxLength={12} className="form-control fs-5" id="product_barcode" placeholder="Enter Product Barcode" required />
            </div>
            <div className='d-flex justify-content-center col-lg-6 col-md-6'>
                <NavLink to="/product" style={{backgroundColor:"#68E8CE"}}  className='btn  me-5 fs-4'>Cancel</NavLink>
                <button type="submit" onClick={updateProduct} style={{backgroundColor:"#68E8CE"}} className="btn fs-4" disabled={loading}>{loading ? 'Updating...' : 'Update'}</button>
            </div>
            <div className="col text-center col-lg-6 ">
                {error && <div className="text-danger mt-3 fs-5 fw-bold">{error}</div>}
            </div>
        </div>
    )
}
