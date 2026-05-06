import axios from "axios";

import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Auth,
} from "../../context/AuthContext";

import {
  FaShoppingCart,
  FaUserCircle,
} from "react-icons/fa";

const Navbar = () => {

  const {
    user,
    logout,
  } = useContext(Auth);

  const navigate =
    useNavigate();

  const [
    cartCount,
    setCartCount,
  ] = useState(0);

  const [
    profileImg,
    setProfileImg,
  ] = useState("");


  // FETCH CART COUNT
  const fetchCartCount =
    async () => {

      if (!user) {

        setCartCount(0);

        return;

      }

      try {

        const res =
          await axios.get(
            `https://course-management-system-zibg.onrender.com/cart?userId=${user.id}`
          );

        const totalQty =
          res.data.reduce(
            (
              sum,
              item
            ) => {

              return (
                sum +
                Number(
                  item.quantity
                )
              );

            },
            0
          );

        setCartCount(
          totalQty
        );

      }

      catch {

        setCartCount(0);

      }

    };


  // FETCH PROFILE IMAGE
  const fetchProfile =
    async () => {

      if (!user) {

        setProfileImg("");

        return;

      }

      try {

        const res =
          await axios.get(
            `https://course-management-system-zibg.onrender.com/profile?userId=${user.id}`
          );

        if (
          res.data.length > 0
        ) {

          setProfileImg(
            res.data[0]
              .avatar
          );

        }

      }

      catch {

        setProfileImg("");

      }

    };


  useEffect(() => {

    fetchCartCount();

    fetchProfile();

    window.addEventListener(
      "cartUpdated",
      fetchCartCount
    );

    window.addEventListener(
      "profileUpdated",
      fetchProfile
    );

    return () => {

      window.removeEventListener(
        "cartUpdated",
        fetchCartCount
      );

      window.removeEventListener(
        "profileUpdated",
        fetchProfile
      );

    };

  }, [user]);


  // LOGOUT
  const handleLogout =
    () => {

      logout();

      setCartCount(0);

      setProfileImg("");

      navigate(
        "/login"
      );

    };


  return (
    <nav
      className="
        flex
        items-center
        gap-6
        text-white
        font-medium
      "
    >

      {/* Courses */}
      <Link to="/">
        Courses
      </Link>


      {/* ADMIN */}
      {user?.role ===
        "admin" && (

        <Link
          to="/admin"
        >
          Admin Panel
        </Link>

      )}


      {/* NORMAL USER */}
      {user?.role ===
        "user" && (
        <>

          {/* CART */}
          <Link
            to="/cart"
            className="
              relative
            "
          >

            <FaShoppingCart
              size={22}
            />

            {cartCount >
              0 && (
              <span
                className="
                  absolute
                  -top-2
                  -right-3
                  bg-red-500
                  text-white
                  text-xs
                  w-5
                  h-5
                  rounded-full
                  flex
                  items-center
                  justify-center
                "
              >
                {
                  cartCount
                }
              </span>
            )}

          </Link>


          {/* MY LEARNING */}
          <Link
            to="/my-learning"
          >
            My Learning
          </Link>


          {/* PROFILE */}
          <Link
            to="/profile"
          >

            {profileImg ? (

              <img
                src={
                  profileImg
                }
                alt="profile"
                className="
                  w-10
                  h-10
                  rounded-full
                  object-cover
                  border-2
                  border-white
                "
              />

            ) : (

              <FaUserCircle
                size={32}
              />

            )}

          </Link>

        </>
      )}


      {/* GUEST */}
      {!user && (
        <>
          <Link
            to="/login"
          >
            <FaUserCircle
              size={32}
            />
          </Link>

          <Link
            to="/signup"
          >
            SignUp
          </Link>
        </>
      )}


      {/* LOGOUT */}
      {user && (
        <button
          onClick={
            handleLogout
          }
          className="
            bg-red-500
            px-4
            py-1
            rounded-lg
          "
        >
          Logout
        </button>
      )}

    </nav>
  );

};

export default Navbar;