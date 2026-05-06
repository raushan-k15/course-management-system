import React, {
  createContext,
  useEffect,
  useState,
} from "react";

export const Auth =
  createContext();

const AuthContext = ({
  children,
}) => {

  const [user,
    setUser] =
    useState(
      null
    );

  const [loading,
    setLoading] =
    useState(
      true
    );


  // Page refresh login restore
  useEffect(() => {

    const savedUser =
      JSON.parse(
        localStorage.getItem(
          "loggedInUser"
        )
      );

    if (savedUser) {

      setUser(
        savedUser
      );

    }

    setLoading(
      false
    );

  }, []);



  // LOGIN
  const login =
    (userData) => {

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(
        userData
      )
    );

    setUser(
      userData
    );

    // Notify all components
    window.dispatchEvent(
      new Event(
        "userChanged"
      )
    );

  };



  // LOGOUT
  const logout =
    () => {

    localStorage.removeItem(
      "loggedInUser"
    );

    setUser(
      null
    );

    // Reset UI everywhere
    window.dispatchEvent(
      new Event(
        "userChanged"
      )
    );

  };



  return (
    <Auth.Provider
      value={{
        user,
        login,
        logout,
        loading,
      }}
    >

      {children}

    </Auth.Provider>
  );

};

export default AuthContext;