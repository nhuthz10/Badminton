"use client";
import React, { useEffect, useState, useRef, Fragment, use } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faSquarePlus,
  faCircleXmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";
import dayjs from "dayjs";
import "./GridData.scss";
import PaginatedItems from "../Pagination/Pagination";
import ModalDelete from "../ModalDelete/ModalDelete";
import { useForm, Controller } from "react-hook-form";
import { LIMIT } from "../../utils";
import { handleChangePage } from "@/redux-toolkit/paginationSlice";
import {
  CRUDProductSize,
  handleChangeSearchProductAdmin,
  handleChangeTimeReport,
} from "../../redux-toolkit/adminSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import XLSX from "xlsx-js-style";
import { useDebounce } from "@/utils/commonUtils";

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const formatterDate = (date) => {
  const dateObject = new Date(date);
  const formattedTime = dayjs(dateObject).format("DD/MM/YYYY");
  return formattedTime;
};

const GridData = ({
  gridType,
  tableColumns,
  headerString,
  orderStatus,
  handleDelete,
  getRoleString,
  product,
}) => {
  const [PaginationData, setPaginationData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const userData = useSelector((state) => state.admin.allUser?.data);
  const brandData = useSelector((state) => state.admin.allBrand?.data);
  const productTypeData = useSelector(
    (state) => state.admin.allProductType?.data
  );
  const sizeData = useSelector((state) => state.admin.allSize?.data);
  const productData = useSelector((state) => state.admin.allProduct?.data);
  const productSizeData = useSelector(
    (state) => state.admin.allProductSize?.data
  );
  const voucherData = useSelector((state) => state.admin.allVoucher?.data);
  const blogData = useSelector((state) => state.admin.allBlog?.data);
  const orderData = useSelector((state) => state.admin.allOrder?.data);
  const productOrderData = useSelector(
    (state) => state.admin.allProductOrder?.data
  );
  const page = useSelector((state) => state.pagination.page);
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname.split("/");
  const searchTextDebounce = useDebounce(searchText, 500);

  const {
    handleSubmit,
    register,
    control,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm();

  const inputRef = useRef();
  const dispatch = useDispatch();

  const handleSearchClear = () => {
    setSearchText("");
    inputRef.current.focus();
  };

  const handleClickSearch = () => {
    dispatch(handleChangePage(1));
    dispatch(handleChangeSearchProductAdmin(searchText.trim()));
  };

  useEffect(() => {
    dispatch(handleChangePage(1));
    dispatch(handleChangeSearchProductAdmin(searchText.trim()));
  }, [dispatch, searchTextDebounce]);

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const handleClickEdit = (item) => {
    gridType === "productSize"
      ? router.push(`/product/${product.id}/productsize/edit/${item.id}`)
      : router.push(`/${path[path.length - 1]}/edit/${item.id}`);
  };

  useEffect(() => {
    if (gridType === "user") {
      setPaginationData(userData);
    } else if (gridType === "product-brand") {
      setPaginationData(brandData);
    } else if (gridType === "product-type") {
      setPaginationData(productTypeData);
    } else if (gridType === "product-size") {
      setPaginationData(sizeData);
    } else if (gridType === "product") {
      setPaginationData(productData);
    } else if (gridType === "productSize") {
      setPaginationData(productSizeData);
    } else if (gridType === "voucher") {
      setPaginationData(voucherData);
    } else if (gridType === "order-admin") {
      setPaginationData(orderData);
    } else if (gridType === "report-admin") {
      setPaginationData(productOrderData);
    } else if (gridType === "blog") {
      setPaginationData(blogData);
    }
  }, [
    brandData,
    gridType,
    orderData,
    productData,
    productSizeData,
    productTypeData,
    sizeData,
    userData,
    voucherData,
    productOrderData,
    blogData,
  ]);

  useEffect(() => {
    const firstDayOfMonth = dayjs().startOf("month").toDate();
    const lastDayOfMonth = dayjs().endOf("month").toDate();
    setValue("timeStart", dayjs(new Date(firstDayOfMonth)));
    setValue("timeEnd", dayjs(new Date(lastDayOfMonth)));
  }, []);

  const onSubmit = async (submitData) => {
    let start = dayjs(submitData.timeStart).valueOf();
    let end = dayjs(submitData.timeEnd).valueOf();
    dispatch(
      handleChangeTimeReport({
        timeStart: start,
        timeEnd: end,
      })
    );
  };

  const handleClickSizeProduct = (item) => {
    dispatch(handleChangePage(1));
    router.push(`/product/${item.id}/productsize`);
  };

  const getBorder = () => {
    return {
      top: { style: "thin", color: { rgb: "000000" } },
      bottom: { style: "thin", color: { rgb: "000000" } },
      left: { style: "thin", color: { rgb: "000000" } },
      right: { style: "thin", color: { rgb: "000000" } },
    };
  };

  const handleExportExcel = () => {
    if (PaginationData?.length === 0) {
      toast.error("Không có dữ liệu để xuất báo cáo");
    } else {
      let totalResult = PaginationData.reduce(
        (acc, curr) => acc + curr.totalPrice,
        0
      );

      let startDate = getValues("timeStart");
      let endDate = getValues("timeEnd");

      startDate = formatterDate(startDate);
      endDate = formatterDate(endDate);

      let title = `THỐNG KÊ DOANH THU`;
      let dateRange = `${startDate} - ${endDate}`;

      let data = PaginationData.map((item) => {
        return {
          "Tên sản phẩm": item.name,
          "Kích cỡ": item.sizeName,
          Giá: currencyFormatter.format(item.price) + " đ",
          "Giảm giá":
            currencyFormatter.format((item.price * item.discount) / 100) + " đ",
          "Số lượng": item.quantity,
          "Tổng tiền": currencyFormatter.format(item.totalPrice) + " đ",
          "Ngày mua": formatterDate(item.time),
        };
      });

      data.push({
        "Tên sản phẩm": "Tổng cộng:",
        "Kích cỡ": "",
        Giá: "",
        "Giảm giá": "",
        "Số lượng": "",
        "Tổng tiền": currencyFormatter.format(totalResult) + " đ",
        "Ngày mua": "",
      });

      const cols = Object.keys(data[0]).map((key) => {
        const maxLength = Math.max(
          ...data.map((item) => (item[key] || "").toString().length)
        );
        return { wch: maxLength + 9 };
      });

      var ws = XLSX.utils.json_to_sheet([], { skipHeader: true });

      XLSX.utils.sheet_add_aoa(ws, [[title]], { origin: "A2" });
      XLSX.utils.sheet_add_aoa(ws, [[dateRange]], { origin: "A3" });

      ws["!merges"] = [
        { s: { r: 1, c: 0 }, e: { r: 1, c: 6 } },
        { s: { r: 2, c: 0 }, e: { r: 2, c: 6 } },
      ];

      ws["A2"].s = {
        alignment: { vertical: "center", horizontal: "center" },
        font: { name: "Times New Roman", bold: true, sz: 16 },
      };
      ws["A3"].s = {
        alignment: { vertical: "center", horizontal: "center" },
        font: { name: "Times New Roman", bold: true, sz: 14 },
      };

      XLSX.utils.sheet_add_aoa(ws, [["", "", "", "", "", "", ""]], {
        origin: "A4",
      });

      const headerRow = [
        {
          v: "Tên sản phẩm",
          s: {
            alignment: { vertical: "center", horizontal: "center" },
            font: { name: "Times New Roman", bold: true, sz: 13 },
            border: getBorder(),
          },
        },
        {
          v: "Kích cỡ",
          s: {
            alignment: { vertical: "center", horizontal: "center" },
            font: { name: "Times New Roman", bold: true, sz: 13 },
            border: getBorder(),
          },
        },
        {
          v: "Giá",
          s: {
            alignment: { vertical: "center", horizontal: "center" },
            font: { name: "Times New Roman", bold: true, sz: 13 },
            border: getBorder(),
          },
        },
        {
          v: "Giảm giá",
          s: {
            alignment: { vertical: "center", horizontal: "center" },
            font: { name: "Times New Roman", bold: true, sz: 13 },
            border: getBorder(),
          },
        },
        {
          v: "Số lượng",
          s: {
            alignment: { vertical: "center", horizontal: "center" },
            font: { name: "Times New Roman", bold: true, sz: 13 },
            border: getBorder(),
          },
        },
        {
          v: "Tổng tiền",
          s: {
            alignment: { vertical: "center", horizontal: "center" },
            font: { name: "Times New Roman", bold: true, sz: 13 },
            border: getBorder(),
          },
        },
        {
          v: "Ngày mua",
          s: {
            alignment: { vertical: "center", horizontal: "center" },
            font: { name: "Times New Roman", bold: true, sz: 13 },
            border: getBorder(),
          },
        },
      ];

      XLSX.utils.sheet_add_aoa(ws, [headerRow], { origin: "A5" });

      data.forEach((item, index) => {
        const row = [
          {
            v: item["Tên sản phẩm"],
            s: {
              font: { name: "Times New Roman", sz: 13 },
              border: getBorder(),
            },
          },
          {
            v: item["Kích cỡ"],
            s: {
              font: { name: "Times New Roman", sz: 13 },
              border: getBorder(),
            },
          },
          {
            v: item["Giá"],
            s: {
              font: { name: "Times New Roman", sz: 13 },
              border: getBorder(),
            },
          },
          {
            v: item["Giảm giá"],
            s: {
              font: { name: "Times New Roman", sz: 13 },
              border: getBorder(),
            },
          },
          {
            v: item["Số lượng"],
            s: {
              font: { name: "Times New Roman", sz: 13 },
              border: getBorder(),
            },
          },
          {
            v: item["Tổng tiền"],
            s: {
              font: { name: "Times New Roman", sz: 13 },
              border: getBorder(),
            },
          },
          {
            v: item["Ngày mua"],
            s: {
              font: { name: "Times New Roman", sz: 13 },
              border: getBorder(),
            },
          },
        ];
        XLSX.utils.sheet_add_aoa(ws, [row], { origin: `A${index + 6}` });
      });

      ws["!cols"] = cols;

      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, "Báo cáo doanh thu.xlsx");
    }
  };

  return (
    <div className="grid-data">
      <div className="grid-data-header">
        <h1
          style={{
            marginLeft: 10,
            marginBottom: 0,
            fontSize: "var(--title-fontSize)",
          }}
        >
          {headerString}
        </h1>
      </div>
      <div className="grid-data-action">
        {gridType === "product" ? (
          <div className="search-product-admin">
            <div className="search">
              <input
                ref={inputRef}
                className="searchInput"
                type="text"
                onChange={handleSearchText}
                value={searchText}
                placeholder="Tìm kiếm..."
              ></input>

              {searchText.length > 0 && (
                <button className="searchClear" onClick={handleSearchClear}>
                  <FontAwesomeIcon icon={faCircleXmark} />
                </button>
              )}

              <span
                style={{ border: "1px solid #ddd9d9", height: "65%" }}
              ></span>
              <div className="searchBtn" onClick={handleClickSearch}>
                <FontAwesomeIcon
                  className="searchIcon"
                  icon={faMagnifyingGlass}
                />
              </div>
            </div>
          </div>
        ) : null}

        {gridType === "report-admin" ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="time-report-container"
          >
            <div className="time-report-content">
              <div className="time-report-start">
                <p
                  style={{
                    fontSize: "var(--text-fontSize)",
                    fontWeight: "Bold",
                    color: "#00000099",
                  }}
                >
                  Từ ngày
                </p>
                <Controller
                  control={control}
                  name="timeStart"
                  rules={{
                    required: "Chọn ngày bắt đầu",
                    validate: {
                      isEndDateAfterStartDate: (value) => {
                        const endDate = getValues("timeEnd");
                        const startDate = value;

                        if (startDate && endDate) {
                          const startDateObj = new Date(startDate);
                          const endDateObj = new Date(endDate);

                          if (
                            dayjs(startDate).isAfter(dayjs(endDate)) ||
                            startDateObj.getTime() === endDateObj.getTime()
                          ) {
                            return "Ngày bắt đầu phải nhỏ hơn ngày kết thúc";
                          }
                        }
                      },
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => {
                    return (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          className="date-picker"
                          id="timeStart"
                          {...register("timeStart", {
                            required: "Chọn ngày bắt đầu",
                          })}
                          sx={{
                            "& .MuiInputBase-input": {
                              padding: "0 !important",
                              fontSize: "var(--title-small-fontSize)",
                            },
                            "& .MuiSvgIcon-root": {
                              fontSize: "2.5rem",
                              color: "var(--second-color)",
                            },
                          }}
                          format="DD/MM/YYYY"
                          onChange={(date) => {
                            onChange(date);
                            trigger("timeStart");
                            trigger("timeEnd");
                          }}
                          onBlur={onBlur}
                          value={value ? value : null}
                        />
                      </LocalizationProvider>
                    );
                  }}
                />
                {errors.timeStart && (
                  <p className="error-message">{errors.timeStart?.message}</p>
                )}
              </div>
              <div className="time-report-end">
                <p
                  style={{
                    fontSize: "var(--text-fontSize)",
                    fontWeight: "Bold",
                    color: "#00000099",
                  }}
                >
                  Đến ngày
                </p>
                <Controller
                  control={control}
                  name="timeEnd"
                  rules={{
                    required: "Chọn ngày kết thúc",
                    validate: {
                      isEndDateAfterStartDate: (value) => {
                        const startDate = getValues("timeStart");
                        const endDate = value;

                        if (startDate && endDate) {
                          const startDateObj = new Date(startDate);
                          const endDateObj = new Date(endDate);

                          if (
                            dayjs(startDate).isAfter(dayjs(endDate)) ||
                            startDateObj.getTime() === endDateObj.getTime()
                          ) {
                            return "Ngày kết thúc phải lớn hơn ngày bắt đầu";
                          }
                        }
                      },
                    },
                  }}
                  render={({ field: { onChange, onBlur, value, ref } }) => {
                    return (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          className="date-picker"
                          id="timeStart"
                          {...register("timeEnd", {
                            required: "Chọn ngày kết thúc",
                          })}
                          sx={{
                            "& .MuiInputBase-input": {
                              padding: "0 !important",
                              fontSize: "var(--title-small-fontSize)",
                            },
                            "& .MuiSvgIcon-root": {
                              fontSize: "2.5rem",
                              color: "var(--second-color)",
                            },
                          }}
                          format="DD/MM/YYYY"
                          onChange={(date) => {
                            onChange(date);
                            trigger("timeStart");
                            trigger("timeEnd");
                          }}
                          onBlur={onBlur}
                          value={value ? value : null}
                        />
                      </LocalizationProvider>
                    );
                  }}
                />
                {errors.timeEnd && (
                  <p className="error-message">{errors.timeEnd?.message}</p>
                )}
              </div>
            </div>
            <div
              style={{
                marginTop: "auto",
                display: "flex",
                gap: 30,
                marginTop: 16,
              }}
            >
              <button type="submit" className="btn-report">
                Thống kê
              </button>
              <div className="btn-report" onClick={() => handleExportExcel()}>
                Xuất báo cáo
              </div>
            </div>
          </form>
        ) : null}

        {gridType === "order-admin" || gridType === "report-admin" ? null : (
          <FontAwesomeIcon
            style={{ alignSelf: "flex-end", cursor: "pointer" }}
            icon={faSquarePlus}
            size="4x"
            color="#022E6C"
            onClick={() => {
              gridType === "productSize"
                ? router.push(`/product/${product.id}/productsize/create`)
                : router.push(`/${path[path.length - 1]}/create`);
            }}
          />
        )}
      </div>
      <div className="grid-data-table-container">
        <table>
          <thead>
            <tr>
              {tableColumns.map((column, index) => (
                <th key={index} style={column.style}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PaginationData &&
              PaginationData?.length > 0 &&
              PaginationData?.map((item, index) => (
                <tr
                  className="Table-Element"
                  key={index}
                  style={{
                    backgroundColor:
                      (index + 1) % 2 === 0
                        ? "#022E6C4D"
                        : "var(--white-color)",
                  }}
                >
                  {tableColumns.map((column, columnIndex) => {
                    if (
                      columnIndex === tableColumns.length - 1 &&
                      gridType !== "report-admin"
                    )
                      return null;
                    if (gridType === "product-size") {
                      return (
                        <td key={columnIndex}>
                          {column.label === "STT"
                            ? (page - 1) * LIMIT + index + 1
                            : column.label === "TÊN LOẠI SẢN PHẨM"
                            ? item[column.key]?.productTypeName
                            : item[column.key]}
                        </td>
                      );
                    } else if (gridType === "user") {
                      return (
                        <td key={columnIndex}>
                          {column.label === "QUYỀN HẠN"
                            ? getRoleString(item?.roleData?.roleId)
                            : column.label === "TRẠNG THÁI"
                            ? item[column.key] === 1
                              ? "Đã kích hoạt"
                              : "Chưa kích hoạt"
                            : column.label === "STT"
                            ? (page - 1) * LIMIT + index + 1
                            : item[column.key]}
                        </td>
                      );
                    } else if (gridType === "product") {
                      return (
                        <td key={columnIndex}>
                          {column.key === "price"
                            ? currencyFormatter.format(item[column.key]) + " đ"
                            : column.key === "productTypeData"
                            ? item[column.key]?.productTypeName
                            : column.label === "STT"
                            ? (page - 1) * LIMIT + index + 1
                            : column.key === "discount"
                            ? item[column.key] === 0
                              ? item[column.key]
                              : +item[column.key] + "%"
                            : item[column.key]}
                        </td>
                      );
                    } else if (gridType === "productSize") {
                      return (
                        <td key={columnIndex}>
                          {column.key === "ProductSizeData"
                            ? item[column.key]?.name
                            : column.key === "SizeData"
                            ? item[column.key]?.sizeName
                            : column.label === "STT"
                            ? (page - 1) * LIMIT + index + 1
                            : item[column.key]}
                        </td>
                      );
                    } else if (gridType === "voucher") {
                      return (
                        <td key={columnIndex}>
                          {column.key === "timeStart"
                            ? dayjs(+item[column.key]).format("DD/MM/YYYY")
                            : column.key === "timeEnd"
                            ? dayjs(+item[column.key]).format("DD/MM/YYYY")
                            : column.key === "voucherPrice"
                            ? currencyFormatter.format(item[column.key]) + " đ"
                            : column.label === "STT"
                            ? (page - 1) * LIMIT + index + 1
                            : item[column.key]}
                        </td>
                      );
                    } else if (gridType === "blog") {
                      return (
                        <td key={columnIndex}>
                          {column.label === "TÁC GIẢ"
                            ? item?.UserBlogData?.userName
                            : column.label === "TRẠNG THÁI"
                            ? item[column.key] === 1
                              ? "Đăng bài"
                              : "Nháp"
                            : column.label === "STT"
                            ? (page - 1) * LIMIT + index + 1
                            : item[column.key]}
                        </td>
                      );
                    } else if (gridType === "order-admin") {
                      return (
                        <td key={columnIndex}>
                          {column.key === "createdAt"
                            ? formatterDate(item[column.key])
                            : column.key === "totalPrice"
                            ? currencyFormatter.format(item[column.key]) + " đ"
                            : column.label === "STT"
                            ? (page - 1) * LIMIT + index + 1
                            : item[column.key]}
                        </td>
                      );
                    } else if (gridType === "report-admin") {
                      return (
                        <td key={columnIndex}>
                          {column.key === "time"
                            ? formatterDate(item[column.key])
                            : column.key === "price"
                            ? currencyFormatter.format(item[column.key]) + " đ"
                            : column.key === "discount"
                            ? currencyFormatter.format(
                                (item["price"] * item[column.key]) / 100
                              ) + " đ"
                            : column.key === "totalPrice"
                            ? currencyFormatter.format(item[column.key]) + " đ"
                            : column.label === "STT"
                            ? (page - 1) * LIMIT + index + 1
                            : item[column.key]}
                        </td>
                      );
                    } else {
                      return (
                        <td key={columnIndex}>
                          {column.label === "STT"
                            ? (page - 1) * LIMIT + index + 1
                            : item[column.key]}
                        </td>
                      );
                    }
                  })}
                  {gridType === "order-admin" ? (
                    <td>
                      <Link
                        href={`/order/${orderStatus.orderType}/${item.orderId}`}
                        className="more"
                      >
                        Xem chi tiết
                      </Link>
                    </td>
                  ) : gridType === "report-admin" ? null : (
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "20px",
                        }}
                      >
                        {gridType === "product" && (
                          <div
                            onClick={() => handleClickSizeProduct(item)}
                            className="product-size"
                          >
                            Size
                          </div>
                        )}
                        <div
                          onClick={() => handleClickEdit(item)}
                          style={{
                            width: "20px",
                            height: "30px",
                            cursor: "pointer",
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faPencil}
                            style={{ height: "100%", width: "100%" }}
                            color="#1976d2"
                          />
                        </div>
                        <ModalDelete
                          handleDelete={() =>
                            handleDelete(item, PaginationData?.length === 1)
                          }
                        />
                      </div>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <PaginatedItems
        type={gridType}
        orderStatus={orderStatus?.data}
        productId={product?.productId}
      />
    </div>
  );
};

export default GridData;
