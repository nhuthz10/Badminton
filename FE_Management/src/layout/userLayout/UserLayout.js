"use client";
import React from "react";
import AdminHeader from "../adminHeader/AdminHeader";
import Loading from "../../components/Loading/Loading";
import { useSelector } from "react-redux";
import "./UserLayout.scss";

function AdminLayout({ children }) {
  const isLoading = useSelector((state) => state.admin.isLoading);
  return (
    <Loading loading={isLoading}>
      <div className="user-layout-container">
        <AdminHeader />
        <div className="children">{children}</div>
      </div>
    </Loading>
  );
}

export default AdminLayout;
