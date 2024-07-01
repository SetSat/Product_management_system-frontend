import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Skeleton, Table, Button, message, Typography } from 'antd';
import { tokenStatus } from '../Redux/authSlice';
import './Products.css';

const { Title } = Typography;

export default function Products() {
  const tokenFromRedux = useSelector(tokenStatus);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = useCallback(async () => {
    try {
      const res = await fetch("https://product-management-backend-nxpo.onrender.com/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokenFromRedux}`
        }
      });

      const data = await res.json();

      if (res.status === 201) {
        console.log("Data Retrieved.");
        setProductData(data);
      } else {
        console.log("Something went wrong. Please try again.");
        message.error("Failed to retrieve products.");
      }
    } catch (err) {
      console.log(err);
      message.error("An error occurred while fetching products.");
    } finally {
      setLoading(false);
    }
  }, [tokenFromRedux]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`https://product-management-backend-nxpo.onrender.com/deleteproduct/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokenFromRedux}`
        }
      });

      const deletedata = await response.json();
      console.log(deletedata);

      if (response.status === 422 || !deletedata) {
        console.log("Error");
        message.error("Failed to delete product.");
      } else {
        console.log("Product deleted");
        message.success("Product deleted successfully.");
        getProducts();
      }
    } catch (err) {
      console.log(err);
      message.error("An error occurred while deleting the product.");
    }
  };

  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => index + 1,
      className: 'table-cell',
    },
    {
      title: 'Product Name',
      dataIndex: 'ProductName',
      key: 'ProductName',
      className: 'table-cell bold-text',
    },
    {
      title: 'Product Price',
      dataIndex: 'ProductPrice',
      key: 'ProductPrice',
      className: 'table-cell bold-text',
    },
    {
      title: 'Product Barcode',
      dataIndex: 'ProductBarcode',
      key: 'ProductBarcode',
      className: 'table-cell bold-text',
    },
    {
      title: 'Update',
      key: 'update',
      render: (text, record) => (
        <NavLink to={`/updateproduct/${record._id}`} className="btn btn-primary">
          <i className="fa-solid fa-pen-to-square"></i>
        </NavLink>
      ),
    },
    {
      title: 'Delete',
      key: 'delete',
      render: (text, record) => (
        <Button type="danger" onClick={() => deleteProduct(record._id)}>
          <i className="fa-solid fa-trash"></i>
        </Button>
      ),
    },
  ];

  return (
    <div className='container-fluid p-3'>
      <Title level={2} className='mb-2'>Products Inventory</Title>
      <div className='d-flex justify-content-end mb-3'>
        <NavLink to="/insertproduct" className='btn onee fs-6'>+ Add New Product</NavLink>
      </div>
      {loading ? (
        <Skeleton active />
      ) : (
        <div className="table-responsive overflow-auto" style={{ maxHeight: "38rem" }}>
          <Table
            columns={columns}
            dataSource={productData}
            rowKey="_id"
            pagination={false}
            className="ant-table-light"
          />
        </div>
      )}
    </div>
  );
}
