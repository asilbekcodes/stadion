// import React from "react";
import { BottomNavigation, BottomNavigationAction, useMediaQuery } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PersonIcon from "@mui/icons-material/Person";
import { Link, useLocation } from "react-router-dom";
import {  Favorite } from "@mui/icons-material";

const Footer = () => {
  const location = useLocation(); // Hozirgi yo'nalishni olish
  const currentPath = location.pathname;

  // Ekran o'lchami uchun media query (desktopda yashirish uchun)
  const isDesktop = useMediaQuery("(min-width:1024px)");

  // Footerni yashirish uchun
  if (isDesktop) return null;

  return (
    <div className="pb-20 bg-gray-100">
      <BottomNavigation
        value={currentPath}
        showLabels
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          boxShadow: "0 -1px 5px rgba(0, 0, 0, 0.1)",
          borderTop: "1px solid #e0e0e0",
          backgroundColor: "#fff",
          zIndex: 1000,
        }}
      >
        <BottomNavigationAction component={Link} to="/" value="/" label="Bosh sahifa" icon={<HomeIcon />} />
        <BottomNavigationAction component={Link} to="/ordersPage" value="/ordersPage" label="Buyurtmalar" icon={<ReceiptIcon />} />
        <BottomNavigationAction component={Link} to="/favorites" value="/favorites" label="Sevimlilar" icon={<Favorite  />} />
        <BottomNavigationAction component={Link} to="/client/profil" value="/client/profil" label="Profil" icon={<PersonIcon />} />
      </BottomNavigation>
    </div>
  );
};

export default Footer;
