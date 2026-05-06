import axios from "axios";
import React, {
  useEffect,
  useState,
} from "react";

import CourseCard from "../components/course/CourseCard";

const CourseList = () => {

  const [allCourses, setAllCourses] =
    useState([]);

  const getCourses =
    async () => {

      try {

        const res =
          await axios.get(
            "http://localhost:3000/course"
          );

        setAllCourses(
          res.data
        );

      } catch (err) {

        console.log(
          err
        );
      }
    };

  useEffect(() => {

    getCourses();

  }, []);

  return (
    <>

      {/* Running Offer Line */}
      <div
        className="
          bg-yellow-400
          text-black
          py-2
          overflow-hidden
          font-semibold
        "
      >
        <div className="marquee gap-y-10">

          🎉 Use Coupon:
          RAUSHAN50 →
          Flat ₹500 OFF |

          🚀 FIRSTBUY →
          ₹1200 OFF |

          💳 Buy Courses &
          Start Learning Today |

        </div>
      </div>

      {/* OLD UI SAME */}
      <div
  className="
    min-h-screen
    bg-gradient-to-br
    from-indigo-100
    via-purple-100
    to-pink-100
    pt-12
    px-12
  "
>

  <div
    className="
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      xl:grid-cols-4
      justify-items-center
      gap-8
      px-10
      pt-[20px]
      max-w-[1700px]
      mx-auto
    "
  >

    {allCourses.map(
      (course) => (

        <CourseCard
          key={course.id}
          {...course}
        />

      )
    )}

  </div>

</div>
    </>
  );
};

export default CourseList;