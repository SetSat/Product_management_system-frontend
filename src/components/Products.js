import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Products() {

    useEffect(() => {
        getProducts();
    }, []);

    const [productData, setProductData] = useState([]);

    const getProducts = async () => {
        try {
            const res = await fetch("https://product-management-backend-nxpo.onrender.com/products", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();

            if (res.status === 201) {
                console.log("Data Retrieved.");
                setProductData(data);
            } else {
                console.log("Something went wrong. Please try again.");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`https://product-management-backend-nxpo.onrender.com/deleteproduct/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const deletedata = await response.json();
            console.log(deletedata);

            if (response.status === 422 || !deletedata) {
                console.log("Error");
            } else {
                console.log("Product deleted");
                getProducts();
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='container-fluid p-3'>
            <h1 className='mb-2'>Products Inventory</h1>
            <div className='d-flex justify-content-end mb-3'>
                <NavLink to="/insertproduct" className='btn btn-primary fs-5'>+ Add New Product</NavLink>
            </div>
            <div className="table-responsive overflow-auto" style={{ maxHeight: "38rem" }}>
                <table className="table table-striped table-hover mt-3 fs-5">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Product Price</th>
                            <th scope="col">Product Barcode</th>
                            <th scope="col">Update</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productData.map((element, id) => (
                            <tr key={element._id}>
                                <th scope="row">{id + 1}</th>
                                <td>{element.ProductName}</td>
                                <td>{element.ProductPrice}</td>
                                <td>{element.ProductBarcode}</td>
                                <td>
                                    <NavLink to={`/updateproduct/${element._id}`} className="btn btn-primary">
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </NavLink>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteProduct(element._id)}>
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
