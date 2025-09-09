import React, { useEffect, useState } from "react";
import api from "../api";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

const Myquestions = ({ token }) => {
  const [questions, setQuestions] = useState([]);

  const getQuestions = async () => {
    try {
      const res = await api.get(`questions/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestions(res.data.questions);
      console.log(res.data.questions);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    getQuestions(token);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-100 mb-6">
          My Questions ({questions.length})
        </h1>

        {questions.length === 0 ? (
          <div className="text-center text-gray-400 mt-20">
            <p className="text-lg">😶 No questions asked yet!</p>
            <p className="text-sm">Start by posting your first question.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {questions.map((q) => (
              <div
                key={q._id}
                className="bg-gray-800 border border-gray-700 shadow-md rounded-2xl p-6 hover:shadow-xl hover:border-blue-500 transition transform hover:-translate-y-1"
              >
                {/* Title */}
                <Link
                  to={`/questions/${q._id}`}
                  className="text-xl font-semibold text-blue-400 hover:underline cursor-pointer"
                >
                  {q.title}
                </Link>

                {/* Description */}
                <div className="text-gray-300 mt-2 mb-4 leading-relaxed">
                  {parse(q.description)}
                </div>

                {/* Tags */}
                {q.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {q.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-blue-900/40 text-blue-300 px-3 py-1 text-sm rounded-full border border-blue-700"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between text-sm text-gray-400 border-t border-gray-700 pt-3">
                  <p>
                    <span className="font-medium text-gray-300">Views:</span>{" "}
                    {q.views}
                    <span className="ml-2 font-medium text-gray-300">answers:</span>{" "}
                    {q.answersCount}
                  {/* </p>
                  <p> */}
                  </p>
                  
                  <p>
                    <span className="font-medium text-gray-300">Updated:</span>{" "}
                    {new Date(q.createdAt).toLocaleTimeString()}{" "}
                    {new Date(q.createdAt).toLocaleDateString()}
                  </p>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Myquestions;
