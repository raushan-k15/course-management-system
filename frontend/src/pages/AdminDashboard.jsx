import axios from "axios";

import React, {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

const AdminDashboard = () => {

  const [courses,
    setCourses] =
    useState([]);

  const [editId,
    setEditId] =
    useState(
      null
    );



  const [form,
    setForm] =
    useState({

      c_name: "",

      c_duration: "",

      c_tutor: "",

      c_fee: "",

      c_image: "",

      rating: "",

    });




  // LOAD COURSES
  useEffect(() => {

    fetchCourses();

  }, []);




  const fetchCourses =
    async () => {

    const res =
      await axios.get(
        "http://localhost:3000/course"
      );



    setCourses(
      res.data
    );

  };




  const handleChange =
    (e) => {

    setForm({
      ...form,

      [e.target.name]:
        e.target.value,

    });

  };




  // ADD / UPDATE
  const handleSubmit =
    async () => {

    try {

      if (
        editId
      ) {

        await axios.put(
          `http://localhost:3000/course/${editId}`,
          form
        );



        toast.success(
          "Course Updated ✅"
        );

      }

      else {

        await axios.post(
          "http://localhost:3000/course",
          form
        );



        toast.success(
          "Course Added ✅"
        );

      }



      setForm({

        c_name: "",

        c_duration: "",

        c_tutor: "",

        c_fee: "",

        c_image: "",

        rating: "",

      });



      setEditId(
        null
      );



      fetchCourses();

    }

    catch {

      toast.error(
        "Failed"
      );

    }

  };




  // EDIT
  const handleEdit =
    (
      course
    ) => {

    setForm(
      course
    );

    setEditId(
      course.id
    );

  };




  // DELETE
  const handleDelete =
    async (
      id
    ) => {

    await axios.delete(
      `http://localhost:3000/course/${id}`
    );



    toast.success(
      "Deleted ❌"
    );



    fetchCourses();

  };




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
        Admin Dashboard 👨‍💻
      </h1>



      {/* FORM */}
      <div className="
        grid md:grid-cols-3
        gap-4
        mb-8
      ">

        {Object.keys(
          form
        ).map(
          (field) => (

          <input
            key={
              field
            }
            name={
              field
            }
            value={
              form[
                field
              ]
            }
            onChange={
              handleChange
            }
            placeholder={
              field
            }
            className="
              border
              p-3
              rounded-lg
            "
          />

        ))}



        <button
          onClick={
            handleSubmit
          }
          className="
            bg-indigo-600
            text-white
            rounded-lg
            py-3
          "
        >
          {editId
            ? "Update"
            : "Add"} Course
        </button>

      </div>




      {/* COURSE LIST */}
      <div className="
        grid md:grid-cols-3
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
              rounded-2xl
              p-5
              shadow-lg
            "
          >

            <img
              src={
                course.c_image
              }
              className="
                h-24
                mx-auto
              "
            />



            <h2 className="
              font-bold
              mt-3
            ">
              {
                course.c_name
              }
            </h2>



            <p>
              ₹{
                course.c_fee
              }
            </p>



            <div className="
              flex gap-3
              mt-4
            ">

              <button
                onClick={() =>
                  handleEdit(
                    course
                  )
                }
                className="
                  bg-yellow-400
                  px-4 py-2
                  rounded
                "
              >
                Edit
              </button>



              <button
                onClick={() =>
                  handleDelete(
                    course.id
                  )
                }
                className="
                  bg-red-500
                  text-white
                  px-4 py-2
                  rounded
                "
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );

};

export default AdminDashboard;