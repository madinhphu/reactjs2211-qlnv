import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const Profile = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  return (
    <>
      <h1>Tên người dùng: {userInfo.username}</h1>
      <p>Tên: {userInfo.firstName}</p>
      <p>Họ: {userInfo.lastName}</p>
    </>
  );
};

export default Profile;
