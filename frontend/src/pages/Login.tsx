import {
  Button,
  Checkbox,
  Label,
  TextInput,
  ThemeConfig,
} from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingModal from "../components/modal/LoadingModal";
import { showErrorMessage, showSuccessMessage } from "../helper/toastHelper";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { loginUser } from "../store/slices/authReducer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userData = await dispatch(loginUser({ email, password })).unwrap();
      showSuccessMessage("Đăng nhập thành công!");
      navigate(`/${userData.user.role}`);
    } catch {
      showErrorMessage("Đăng nhập thất bại!");
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-tr from-green-400 via-blue-500 to-purple-600">
      <div className="flex h-full w-full items-center justify-center bg-gray-200/80">
        <div className="mx-6 w-full rounded-md bg-white p-8 text-black md:mx-0 md:w-1/2 md:p-20">
          <div className="my-2 text-center">
            <h4 className="text-lg font-medium">
              HỆ THỐNG ĐIỂM DANH TRỰC TUYẾN
            </h4>
          </div>
          <form className="flex w-full flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" className="dark:text-gray-900">
                  Email
                </Label>
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
                <Label htmlFor="password1" className="dark:text-gray-900">
                  Mật khẩu
                </Label>
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

            <Button
              type="submit"
              onClick={handleLogin}
              className="mt-6 md:mt-12"
            >
              Đăng nhập
            </Button>
          </form>
        </div>
      </div>
      <LoadingModal isOpen={loading} />
    </div>
  );
};

export default Login;
