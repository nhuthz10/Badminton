"use client";
import React, { Fragment, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import Tippy from "@tippyjs/react/headless";
import "./AdminHeader.scss";
import UserMenu from "../../components/UserMenu/UserMenu";
import DrawerNav from "@/components/DrawerNav/DrawerNav";
import { USER_MENU } from "../../utils/menu";
import { logOut } from "../../redux-toolkit/userSlice";
import Notification from "@/components/Notification/Notification";
import Image from "next/image";

function AdminHeader() {
  const avatar = useSelector((state) => state.user.userInfo.avatar);
  const roleId = useSelector((state) => state.user.userInfo?.roleData?.roleId);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogOut = () => {
    dispatch(logOut());
    router.push("/");
  };

  return (
    <div className="admin-header-container">
      <Link href="/" className="header-wrap-logo">
        <Image
          src="/images/logo.png"
          width={35}
          height={60}
          sizes="100vw"
          alt="bamito"
          className="header-logo"
        ></Image>
      </Link>
      <FontAwesomeIcon
        onClick={() => setIsOpenDrawer(true)}
        icon={faBars}
        className="header-bars-icon"
      ></FontAwesomeIcon>
      <div className="admin-info">
        <Notification />
        <Tippy
          interactive
          placement="bottom-end"
          delay={[0, 300]}
          render={(attrs) => (
            <UserMenu
              attrs={attrs}
              handleLogOut={handleLogOut}
              menu={USER_MENU}
              roleId={roleId}
            />
          )}
        >
          <Image
            src={avatar ? avatar : "/images/default-avatar.png"}
            alt="admin"
            height={50}
            width={50}
            className="admin-avatar"
          />
        </Tippy>
      </div>
      <DrawerNav
        isOpenDrawer={isOpenDrawer}
        setIsOpenDrawer={setIsOpenDrawer}
      ></DrawerNav>
    </div>
  );
}

export default AdminHeader;
