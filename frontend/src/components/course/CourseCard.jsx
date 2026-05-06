import axios from "axios";

import React, {
  useContext,
} from "react";

import toast from "react-hot-toast";

import {
  Auth,
} from "../../context/AuthContext";

const CourseCard = ({
  id,
  c_image,
  c_name,
  c_tutor,
  c_fee,
  c_duration,
  rating,
}) => {

  const {
    user,
  } = useContext(
    Auth
  );




  const handleAddToCart =
    async () => {

    if (
      !user
    ) {

      toast.error(
        "Login first 🔐"
      );

      return;

    }



    try {

      // Existing course check
      const res =
        await axios.get(
          `http://localhost:3000/cart?userId=${user.id}&courseId=${id}`
        );



      // Already exists
      if (
        res.data.length >
        0
      ) {

        const existing =
          res.data[0];



        await axios.patch(
          `http://localhost:3000/cart/${existing.id}`,
          {

            quantity:
              Number(
                existing.quantity
              ) + 1,

          }
        );

      }

      // New course
      else {

        await axios.post(
          "http://localhost:3000/cart",
          {

            userId:
              user.id,

            courseId:
              id,

            quantity: 1,

            c_name,

            c_image,

            c_tutor,

            c_fee,

            c_duration,

            rating,

          }
        );

      }



      window.dispatchEvent(
        new Event(
          "cartUpdated"
        )
      );



      toast.success(
        "Added to cart ✅"
      );

    }

    catch (
      error
    ) {

      console.log(
        error
      );

      toast.error(
        "Cart failed"
      );

    }

  };




  return (
    <div className="
    bg-gradient-to-br
    from-white
    to-indigo-50
    border
    border-indigo-500
    rounded-2xl
    shadow-lg
    w-[280px]
    h-[320px]
    p-5
    m-5
    flex
    flex-col
    justify-between
    hover:scale-105
    hover:shadow-2xl
    duration-300
  ">

  {/* Image */}
  <div className="
    h-[150px]
    flex
    items-center
    justify-center
  ">

    <img
      src={c_image}
      className="
        max-h-[130px]
        object-contain
      "
    />

  </div>


  {/* Content */}
  <div>

    <h2 className="
      font-bold
      text-xl
      mt-3
      line-clamp-2
    ">
      {c_name}
    </h2>



    <p className="
      text-gray-600
      mt-2
    ">
      👨‍🏫 {c_tutor}
    </p>



    <p className="
      text-green-600
      font-bold
      text-xl
      mt-2
    ">
      ₹ {c_fee}
    </p>

  </div>



  {/* Button */}
  {
  user?.role ===
  "user" && (

    <button
      onClick={
        handleAddToCart
      }
      className="
        w-full
        mt-4
        bg-indigo-600
        hover:bg-indigo-700
        text-white
        py-3
        rounded-xl
        font-semibold
      "
    >
      Add To Cart
    </button>

    )}

</div>
  );
};

export default CourseCard;