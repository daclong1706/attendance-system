import React, { useEffect, useState } from "react";
import axios from "axios";

const TestConnection = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/ping")
      .then((response) => setMessage(response.data.message))
      .catch((error) => setMessage("Không thể kết nối với backend"));
  }, []);

  return (
    <div>
      <h1>Kiểm tra kết nối</h1>
      <p>{message}</p>
    </div>
  );
};

export default TestConnection;
