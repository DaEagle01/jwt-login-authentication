import { ErrorMessage } from "@hookform/error-message";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const UserInfoForm = () => {
  const [product, setProduct] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    fetch("https://gentle-depths-81066.herokuapp.com/userinfo", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          alert("Congrats, user added successfully!");
          reset();
        }
      });
  };
  return (
    <div className=" grid justify-items-center content-center bg-gray-700  h-screen">
      <div className="bg-gray-800 px-16 py-8">
        <h2 className="text-center text-white m-4 font-bold text-2xl">
          {" "}
          Provide Information
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <input
            {...register("name", {
              required: "Required",
              pattern: {
                value: /^[A-Za-z]+$/,
                message: "Space not allowed",
              },
            })}
            required
            placeholder="Your Full Name"
            className=" rounded-1 p-2 shadow-md "
          />
          <ErrorMessage errors={errors} name="name" />
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please enter a valid email",
              },
            })}
            type="email"
            required
            placeholder="Your Email"
            className=" rounded-1 p-2 shadow-md"
          />
          <ErrorMessage errors={errors} name="email" />
          <input
            {...register("address")}
            placeholder="Address"
            className=" rounded-1 p-2 shadow-md"
          />
          <input
            type="number"
            {...register("mobile", {
              maxLength: 10,
              message: "Only 10 digit allowed",
            })}
            required
            placeholder="Your Phone Number"
            className=" rounded-1 p-2 shadow-md"
          />{" "}
          <ErrorMessage errors={errors} name="mobile" />
          <input
            className="bg-gray-700 text-white fw-bold rounded-pill py-2 fs-5"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default UserInfoForm;
