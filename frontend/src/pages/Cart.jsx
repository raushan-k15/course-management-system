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

const Cart = () => {

  const {
    user,
  } = useContext(
    Auth
  );

  const [cart,
    setCart] =
    useState([]);

  const [coupon,
    setCoupon] =
    useState("");

  const [discount,
    setDiscount] =
    useState(0);




  // LOAD CART
  useEffect(() => {

    if (!user) return;

    fetchCart();

  }, [user]);




  const fetchCart =
    async () => {

    try {

      const res =
        await axios.get(
          `https://course-management-system-zibg.onrender.com/cart?userId=${user.id}`
        );



      setCart(
        res.data
      );

    }

    catch (
      error
    ) {

      console.log(
        error
      );

      setCart([]);

    }

  };




  // INCREASE
  const increase =
    async (
      item
    ) => {

    await axios.patch(
      `https://course-management-system-zibg.onrender.com/cart/${item.id}`,
      {

        quantity:
          Number(
            item.quantity
          ) + 1,

      }
    );



    fetchCart();

    window.dispatchEvent(
      new Event(
        "cartUpdated"
      )
    );

  };




  // DECREASE
  const decrease =
    async (
      item
    ) => {

    if (
      Number(
        item.quantity
      ) <= 1
    ) return;



    await axios.patch(
      `https://course-management-system-zibg.onrender.com/cart/${item.id}`,
      {

        quantity:
          Number(
            item.quantity
          ) - 1,

      }
    );



    fetchCart();

    window.dispatchEvent(
      new Event(
        "cartUpdated"
      )
    );

  };




  // REMOVE
  const removeCourse =
    async (
      id
    ) => {

    await axios.delete(
      `https://course-management-system-zibg.onrender.com/cart/${id}`
    );



    fetchCart();

    window.dispatchEvent(
      new Event(
        "cartUpdated"
      )
    );



    toast.success(
      "Removed"
    );

  };




  // TOTAL
  const total =
    cart.reduce(
      (
        sum,
        item
      ) => {

        return (
          sum +
          Number(
            item.c_fee
          ) *
            Number(
              item.quantity
            )
        );

      },
      0
    );




  // APPLY COUPON
  const applyCoupon =
    () => {

    if (
      coupon ===
      "RAUSHAN50"
    ) {

      setDiscount(
        500
      );

      toast.success(
        "₹500 OFF Applied 🎉"
      );

    }

    else if (
      coupon ===
      "FIRSTBUY"
    ) {

      setDiscount(
        1200
      );

      toast.success(
        "₹1200 OFF Applied 🎉"
      );

    }

    else {

      setDiscount(
        0
      );

      toast.error(
        "Invalid Coupon"
      );

    }

  };




  const finalAmount =
    Math.max(
      total -
        discount,
      0
    );




  // RAZORPAY PAYMENT
  const handlePayment =
    async () => {

    if (
      cart.length ===
      0
    ) {

      toast.error(
        "Cart empty 🛒"
      );

      return;

    }



    const options = {

      key:
        "rzp_test_SmDRom8heil0Nu",

      amount:
        finalAmount *
        100,

      currency:
        "INR",

      name:
        "EduSpider",

      description:
        "Course Purchase",



      image:
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",



      prefill: {

        name:
          user.username,

        email:
          user.email,

      },



      theme: {

        color:
          "#6366f1",

      },



      handler:
        async (
          response
        ) => {

          try {

            // Save to orders
            for (
              let item of cart
            ) {

              await axios.post(
                "https://course-management-system-zibg.onrender.com/orders",
                {

                  userId:
                    user.id,

                  paymentId:
                    response.razorpay_payment_id,

                  paymentStatus:
                    "paid",

                  discount,

                  finalAmount,

                  ...item,

                }
              );

            }



            // Clear cart
            for (
              let item of cart
            ) {

              await axios.delete(
                `https://course-management-system-zibg.onrender.com/cart/${item.id}`
              );

            }



            setCart([]);

            setCoupon("");

            setDiscount(
              0
            );



            window.dispatchEvent(
              new Event(
                "cartUpdated"
              )
            );



            toast.success(
              "Payment Successful 🎉"
            );

          }

          catch (
            error
          ) {

            console.log(
              error
            );

            toast.error(
              "Order save failed"
            );

          }

        },



      modal: {

        ondismiss:
          () => {

          toast(
            "Payment cancelled"
          );

        },

      },

    };



    const razorpay =
      new window.Razorpay(
        options
      );



    razorpay.open();

  };




  if (
    cart.length ===
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
          Cart Empty 🛒
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
        My Cart 🛒
      </h1>



      <div className="
        grid md:grid-cols-3
        gap-10
        
      ">

        {/* LEFT */}
        <div className="
          md:col-span-2
          space-y-10
          gap-y-10
        ">

          {cart.map(
            (item) => (

            <div
              key={
                item.id
              }
              className="
                bg-white
                p-5
                rounded-2xl
                shadow-lg
                flex
                justify-between
              "
            >

              <div className="
                flex gap-10
              ">

                <img
                  src={
                    item.c_image
                  }
                  className="
                    w-20 h-20
                  "
                />

                <div>

                  <h2 className="
                    text-xl
                    font-bold
                  ">
                    {
                      item.c_name
                    }
                  </h2>

                  <p>
                    ₹
                    {
                      item.c_fee
                    }
                  </p>

                </div>

              </div>



              <div className="
                flex gap-3
                items-center
              ">

                <button
                  onClick={() =>
                    decrease(
                      item
                    )
                  }
                >
                  -
                </button>

                <span>
                  {
                    item.quantity
                  }
                </span>

                <button
                  onClick={() =>
                    increase(
                      item
                    )
                  }
                >
                  +
                </button>

                <button
                  onClick={() =>
                    removeCourse(
                      item.id
                    )
                  }
                  className="
                    text-red-500
                  "
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

        </div>
        
        {/* RIGHT */}
        <div className="
          bg-white
          p-6
          rounded-2xl
          shadow-lg
          h-fit
        ">

          <h2 className="
            text-2xl
            font-bold
            mb-5
          ">
            Order Summary
          </h2>



          <input
            value={
              coupon
            }
            onChange={(
              e
            ) =>
              setCoupon(
                e.target.value
              )
            }
            placeholder="Coupon Code"
            className="
              w-full
              border
              p-3
              rounded-lg
              mb-3
            "
          />



          <button
            onClick={
              applyCoupon
            }
            className="
              w-full
              bg-blue-500
              text-white
              py-2
              rounded-lg
              mb-4
            "
          >
            Apply Coupon
          </button>



          <p>
            Total: ₹
            {
              total
            }
          </p>

          <p>
            Discount: ₹
            {
              discount
            }
          </p>

          <p className="
            text-xl
            font-bold
            mt-3
          ">
            Final: ₹
            {
              finalAmount
            }
          </p>



          <button
            onClick={
              handlePayment
            }
            className="
              w-full
              bg-green-500
              text-white
              py-3
              rounded-xl
              mt-5
            "
          >
            Pay Now 💳
          </button>

        </div>

      </div>

    </div>
  );

};

export default Cart;