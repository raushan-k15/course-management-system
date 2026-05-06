import axios from "axios";

import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  Auth,
} from "../context/AuthContext";

const MyLearning = () => {

  const {
    user,
  } = useContext(
    Auth
  );

  const [courses,
    setCourses] =
    useState([]);




  // USER SWITCH RESET
  useEffect(() => {

    const resetLearning =
      () => {

      setCourses([]);

    };



    window.addEventListener(
      "userChanged",
      resetLearning
    );



    return () => {

      window.removeEventListener(
        "userChanged",
        resetLearning
      );

    };

  }, []);




  // LOAD USER COURSES
  useEffect(() => {

    if (!user) {

      setCourses([]);

      return;

    }



    fetchCourses();

  }, [user]);




  const fetchCourses =
    async () => {

    try {

      const res =
        await axios.get(
          `https://course-management-system-zibg.onrender.com/orders?userId=${user.id}`
        );



      setCourses(
        res.data
      );

    }

    catch {

      setCourses([]);

    }

  };




  if (
    courses.length ===
    0
  ) {

    return (
      <div className="
        min-h-screen
        flex
        items-center
        justify-center
      ">
        <h1 className="
          text-4xl
          font-bold
        ">
          No Courses Yet 📚
        </h1>
      </div>
    );

  }




  return (
    <div className="
      min-h-screen
      bg-slate-100
      p-8
    ">

      <h1 className="
        text-4xl
        font-bold
        mb-8
      ">
        My Learning 📚
      </h1>



      <div className="
        grid md:grid-cols-4
        gap-6
      ">

        {courses.map(
          (course) => (

          <div
            key={
              course.id
            }
            className="
              bg-white
              p-5
              rounded-2xl
              shadow-lg
            "
          >

            <img
              src={
                course.c_image
              }
              className="
                h-32
                mx-auto
              "
            />

            <h2 className="
              font-bold
              mt-4
            ">
              {
                course.c_name
              }
            </h2>

            <button
              className="
                w-full
                mt-4
                bg-indigo-600
                text-white
                py-2
                rounded-lg
              "
            >
              Start Learning
            </button>

          </div>

        ))}

      </div>

    </div>
  );

};

export default MyLearning;