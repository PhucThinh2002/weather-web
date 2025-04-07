import React, { useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import Header from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";

const App = () => {
  const [searchCountry, setSearchCountry] = useState(""); // Lưu tên nước tìm kiếm

  const handleSearch = (country) => {
    setSearchCountry(country); // Cập nhật quốc gia tìm kiếm
  };

  return (
    <>
      <NavBar />
      <Header onSearch={handleSearch} />
      <Dashboard searchCountry={searchCountry} />
    </>
  );
};

export default App;
