import React, { useState } from "react";
import { Form, Input, Button, message, Typography, Space, Card } from "antd";
import { useDispatch } from "react-redux";
import { login } from "../Redux/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const { Title } = Typography;

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://product-management-backend-nxpo.onrender.com/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        dispatch(login(response.data.token));
        console.log(response.data.token);
        message.success("Login successful");
        navigate("/");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data && error.response.data.message) {
        message.error(error.response.data.message);
      } else {
        message.error("An unknown error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="login-page-container">
      <Card className="login-card">
        <Space
          direction="vertical"
          size="middle"
          style={{ width: "100%", textAlign: "center" }}
        >
          <Title level={2}>Login</Title>
          <Form onFinish={handleLogin} layout="vertical">
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>
                Login
              </Button>
            </Form.Item>
          </Form>
          <Button
            type="link"
            onClick={() => navigate("/signup")}
            style={{ color: "#68D2E8" }}
          >
            Don't have an account?{" "}
            <span style={{ color: "#FF7D29" }}>Sign Up</span>
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default LoginPage;
