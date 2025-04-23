import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { ThemeConfig } from "flowbite-react";
import React, { useState } from "react";

const users = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  },
  {
    id: 2,
    name: "Teacher User",
    email: "teacher@example.com",
    role: "teacher",
  },
  {
    id: 3,
    name: "Student User",
    email: "student@example.com",
    role: "student",
  },
];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Mô phỏng mật khẩu

  const handleLogin = () => {
    const user = users.find((u) => u.email === email);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = `/${user.role}`;
    } else {
      alert("Email không đúng! Vui lòng thử lại.");
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-tr from-green-400 via-blue-500 to-purple-600">
      <ThemeConfig dark={false} />
      <div className="flex h-full w-full items-center justify-center bg-gray-200/80">
        <div className="w-3/4 rounded-md bg-white p-20 text-black md:w-1/2">
          <div className="my-2 text-center">
            <h4 className="text-lg font-medium">
              HỆ THỐNG ĐIỂM DANH TRỰC TUYẾN
            </h4>
          </div>
          <form className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email">Email</Label>
              </div>
              <TextInput
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1">Your password</Label>
              </div>
              <TextInput
                id="password1"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Nhớ tôi</Label>
            </div>
            <Button type="button" onClick={handleLogin}>
              Đăng nhập
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
