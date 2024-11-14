import React from "react";

const PresentationList = () => {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h3 className="text-xl font-semibold">My Presentation List</h3>
      <table className="min-w-full mt-4">
        <thead>
          <tr>
            <th className="py-2">Order</th>
            <th className="py-2">ID</th>
            <th className="py-2">Code</th>
            <th className="py-2">Subject</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2">01</td>
            <td className="py-2">EC/2021</td>
            <td className="py-2">BECS 112233</td>
            <td className="py-2">Electronics 1AB</td>
          </tr>
          {/* Add more rows as necessary */}
        </tbody>
      </table>
    </div>
  );
};

export default PresentationList;
