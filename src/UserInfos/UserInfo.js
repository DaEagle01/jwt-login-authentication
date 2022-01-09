import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";

const UserInfo = () => {
  const [infos, setInfos] = useState([]);
  const [item, setInfo] = useState(null);

  useEffect(() => {
    fetch("https://gentle-depths-81066.herokuapp.com/userinfo")
      .then((res) => res.json())
      .then((data) => setInfos(data));
  }, [item]);

  const handleDelete = (_id) => {
    console.log(_id);
    if (window.confirm("Are you confirm you want to delete?")) {
      fetch(`https://gentle-depths-81066.herokuapp.com/userinfo/${_id}`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.acknowledged) {
            setInfo(true);
            console.log("product delelted");
          }
        });
    }
  };

  return (
    <div className=" py-2 overflow-auto sm:-mx-6 sm:px-6 lg:-mx-8 px-10 lg:px-8 bg-gray-900 h-screen pt-8 ">
      <div className=" bg-gray- 700">
        <div className="grid justify-items-center align-items-center  shadow px-8 pt-3 pb-6 rounded-bl-lg rounded-br-lg w-full">
          <table className=" transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-700 ">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-white tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left   leading-4 text-white tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left   leading-4 text-white tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left   leading-4 text-white tracking-wider">
                  Phone
                </th>

                <th className="px-6 py-3 border-b-2 border-gray-300 text-left   leading-4 text-white tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left   leading-4 text-white tracking-wider">
                  Action
                </th>
                {/* <th className="px-6 py-3 border-b-2 border-gray-300"></th> */}
              </tr>
            </thead>
            <tbody className="bg-white">
              {infos.map((info, index) => (
                <tr className="font-semibold text-md transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-700 ">
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="flex items-center">
                      <div>
                        <div className="  leading-5 text-gray-800">{index}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="  leading-5 text-blue-900">
                      {info?.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500   leading-5">
                    {info?.email}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500   leading-5">
                    {info?.mobile}
                  </td>

                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900   leading-5">
                    {info?.address}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500   leading-5">
                    <button
                      onClick={() => handleDelete(info?._id)}
                      className="px-5 py-2 border-gray-500 border text-gray-800 rounded transition duration-300 hover:bg-gray-700 hover:text-white focus:outline-none"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
