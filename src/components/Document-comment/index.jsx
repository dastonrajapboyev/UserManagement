import React, { useEffect, useState } from "react";
import instance from "../Service";

const DocumentComment = () => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await instance.get("/document-comments");
      setComments(response.data);
    } catch (error) {
      console.error("Ma'lumotlarni olishda xatolik yuz berdi:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="overflow-x-auto p-6">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
              ID
            </th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
              Izoh
            </th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
              Muallif
            </th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
              Amallar
            </th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr
              key={comment.id}
              className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-2 px-4 text-sm text-gray-700">{comment.id}</td>
              <td className="py-2 px-4 text-sm text-gray-700">
                {comment.text}
              </td>
              <td className="py-2 px-4 text-sm text-gray-700">
                {comment.author}
              </td>
              <td className="py-2 px-4 text-sm text-gray-700">
                {/* Tahrirlash va o'chirish tugmalari */}
                <button
                  className="mr-2 px-2 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600"
                  onClick={() => console.log("Tahrirlash:", comment.id)}>
                  Tahrirlash
                </button>
                <button
                  className="px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600"
                  onClick={() => console.log("O'chirish:", comment.id)}>
                  O'chirish
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentComment;
