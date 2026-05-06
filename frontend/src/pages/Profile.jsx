import axios from "axios";
import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  Auth,
} from "../context/AuthContext";

const Profile = () => {

  const {
    user,
  } = useContext(
    Auth
  );

  const [editMode,
    setEditMode] =
    useState(
      false
    );

  const [profileId,
    setProfileId] =
    useState(
      null
    );

  const [cartCount,
    setCartCount] =
    useState(
      0
    );

  const [profile,
    setProfile] =
    useState({
      name: "",
      email: "",
      phone: "",
      college: "",
      skills: "",
      about: "",
      avatar: "",
    });


  // Load user profile
  useEffect(() => {

    if (!user) return;

    fetchProfile();
    fetchCart();

  }, [user]);


  const fetchCart =
    () => {

    const cart =
      JSON.parse(
        localStorage.getItem(
          `cart_${user.email}`
        )
      ) || [];

    setCartCount(
      cart.length
    );

  };


  const fetchProfile =
    async () => {

    try {

      const res =
        await axios.get(
          `https://course-management-system-zibg.onrender.com/profile?userId=${user.id}`
        );

      if (
        res.data.length >
        0
      ) {

        setProfile(
          res.data[0]
        );

        setProfileId(
          res.data[0].id
        );

      } else {

        // New user → blank profile
        setProfile({
          name: "",
          email: "",
          phone: "",
          college: "",
          skills: "",
          about: "",
          avatar: "",
        });

      }

    } catch {

      toast.error(
        "Profile load failed"
      );

    }

  };


  const handleChange =
    (e) => {

    setProfile(
      (prev) => ({
        ...prev,
        [e.target.name]:
          e.target.value,
      })
    );

  };


  const handleImage =
    (e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onloadend =
      () => {

      setProfile(
        (prev) => ({
          ...prev,
          avatar:
            reader.result,
        })
      );

    };

    reader.readAsDataURL(
      file
    );

  };


  const handleSave =
    async () => {

    try {

      const payload = {
        ...profile,
        userId:
          user.id,
      };

      if (
        profileId
      ) {

        await axios.put(
          `https://course-management-system-zibg.onrender.com/profile/${profileId}`,
          payload
        );

      } else {

        const res =
          await axios.post(
            "https://course-management-system-zibg.onrender.com/profile",
            payload
          );

        setProfileId(
          res.data.id
        );

      }

      setEditMode(
        false
      );

      window.dispatchEvent(
        new Event(
          "profileUpdated"
        )
      );

      toast.success(
        "Profile Saved 🚀"
      );

    } catch {

      toast.error(
        "Save failed"
      );

    }

  };


  const skillCount =
    profile.skills
      ? profile.skills
          .split(",")
          .filter(
            (item) =>
              item.trim()
          ).length
      : 0;


  return (
    <div className="
      min-h-screen
      flex items-center
      justify-center
      bg-gradient-to-br
      from-indigo-700
      via-purple-700
      to-pink-600
      p-5
    ">

      <div className="
        w-full max-w-5xl
        grid md:grid-cols-3
        gap-8
        rounded-3xl
        p-8
        bg-white/10
        border border-white/20
        backdrop-blur-lg
      ">

        {/* LEFT */}
        <div className="
          flex flex-col
          items-center
          text-center
        ">

          <div className="
            relative
          ">

            <img
              src={
                profile.avatar ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="profile"
              className="
                w-40 h-40
                rounded-full
                border-4 border-white
                object-cover
              "
            />

            {editMode && (

              <label className="
                absolute bottom-0 right-0
                bg-pink-500
                text-white
                p-2 rounded-full
                cursor-pointer
              ">

                📷

                <input
                  type="file"
                  hidden
                  onChange={
                    handleImage
                  }
                />

              </label>

            )}

          </div>

          <h2 className="
            mt-4 text-2xl
            font-bold text-white
          ">
            {
              profile.name ||
              "Your Name"
            }
          </h2>

          <p className="
            text-gray-200
          ">
            {
              profile.email ||
              "your@email.com"
            }
          </p>

          <p className="
            text-pink-200 mt-2
          ">
            🚀 Aspiring Developer
          </p>

          {/* Stats */}
          <div className="
            flex gap-4 mt-5
          ">

            <div className="
              bg-white/10
              px-4 py-2
              rounded-xl
            ">
              <h3 className="
                text-white font-bold
              ">
                {skillCount}
              </h3>
              <p className="
                text-sm text-gray-200
              ">
                Skills
              </p>
            </div>

            <div className="
              bg-white/10
              px-4 py-2
              rounded-xl
            ">
              <h3 className="
                text-white font-bold
              ">
                {cartCount}
              </h3>
              <p className="
                text-sm text-gray-200
              ">
                Courses
              </p>
            </div>

          </div>

        </div>


        {/* RIGHT */}
        <div className="
          md:col-span-2
        ">

          <div className="
            flex justify-between mb-6
          ">

            <h1 className="
              text-3xl
              font-bold
              text-white
            ">
              Profile Dashboard
            </h1>

            {!editMode ? (

              <button
                onClick={() =>
                  setEditMode(true)
                }
                className="
                  bg-yellow-400
                  px-4 py-2
                  rounded-lg
                "
              >
                Edit
              </button>

            ) : (

              <button
                onClick={
                  handleSave
                }
                className="
                  bg-green-500
                  px-4 py-2
                  rounded-lg
                  text-white
                "
              >
                Save
              </button>

            )}

          </div>


          <div className="
            grid grid-cols-2
            gap-5
          ">

            {[
              "name",
              "email",
              "phone",
              "college",
            ].map(
              (field) => (

              <div
                key={field}
                className="
                  flex flex-col
                "
              >

                <label className="
                  text-white
                  mb-2
                  capitalize
                ">
                  {field}
                </label>

                <input
                  name={field}
                  value={
                    profile[field]
                  }
                  onChange={
                    handleChange
                  }
                  disabled={
                    !editMode
                  }
                  className="
                    p-4 rounded-xl
                    bg-white/20
                    text-white
                  "
                />

              </div>

            ))}

            <div className="
              col-span-2
              flex flex-col
            ">

              <label className="
                text-white mb-2
              ">
                Skills
              </label>

              <input
                name="skills"
                value={
                  profile.skills
                }
                onChange={
                  handleChange
                }
                disabled={
                  !editMode
                }
                className="
                  p-4 rounded-xl
                  bg-white/20
                  text-white
                "
              />

            </div>


            <div className="
              col-span-2
              flex flex-col
            ">

              <label className="
                text-white mb-2
              ">
                About
              </label>

              <textarea
                name="about"
                value={
                  profile.about
                }
                onChange={
                  handleChange
                }
                disabled={
                  !editMode
                }
                className="
                  h-32
                  p-4 rounded-xl
                  bg-white/20
                  text-white
                  resize-none
                "
              />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;