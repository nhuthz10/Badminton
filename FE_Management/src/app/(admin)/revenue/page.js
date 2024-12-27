"use client";
import React from "react";
import GridData from "@/components/GridData/GridData";

function ReportAdmin() {
  const tableColumns = [
    {
      label: "STT",
      key: "",
      style: {
        borderTopLeftRadius: 15,
        paddingLeft: "1rem",
        BorderLeft: "none",
      },
    },
    { label: "TÊN SẢN PHẨM", key: "name" },
    { label: "KÍCH CỠ", key: "sizeName" },
    { label: "GIÁ", key: "price" },
    { label: "GIẢM GIÁ", key: "discount" },
    { label: "SỐ LƯỢNG", key: "quantity" },
    { label: "TỔNG TIỀN", key: "totalPrice" },
    {
      label: "NGÀY MUA",
      key: "time",
      style: { borderTopRightRadius: 15, borderRight: "none" },
    },
  ];

  return (
    <GridData
      tableColumns={tableColumns}
      headerString="Báo cáo doanh thu"
      gridType="report-admin"
    />
  );
}

export default ReportAdmin;
