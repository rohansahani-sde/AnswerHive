import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import parse from "html-react-parser";
import { toast } from "react-toastify";

const QuestionDetails = () => {
  const { id } = useParams();
  const location = useLocation();

  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [question, setQuestion] = useState({});
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId"); // 👈 saved at login

  // 🔹 Fetch question + answers
  const fetchAnswers = async () => {
    try {
      const que = await api.get(`/questions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const res = await api.get(`/questions/${id}/answers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnswers(res.data || []);
      setQuestion(que.data);
    } catch (err) {
      console.log("Error fetching answers:", err);
    }
  };

  useEffect(() => {
    if (id) fetchAnswers();
  }, [id]);

  // 🔹 Post a new answer
  const handlePostAnswer = async (e) => {
    e.preventDefault();
    if (!newAnswer.trim()) return;

    try {
      await api.post(
        `/questions/${question._id}/answers`,
        { content: newAnswer },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewAnswer("");
      fetchAnswers();
      toast.success("Answer post successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 Accept answer
  const handleAccept = async (answerId) => {
    try {
      await api.post(
        `/questions/${question._id}/accept`,
        { answerId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAnswers();
    } catch (err) {
      console.log("Error accepting answer:", err);
    }
  };

  // 🔹 Vote answer
  const handleVote = async (answerId, type) => {
    try {
      await api.post(
        `/questions/vote/${answerId}`,
        { type },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAnswers();
    } catch (err) {
      console.log("Error voting:", err);
    }
  };

  return (
    <div className="bg-[#0f1117] min-h-screen text-gray-200 p-6">
      {/* Question Header */}
      <div className="bg-gradient-to-br from-[#1c1f2b] to-[#232736] rounded-2xl p-6 shadow-lg mb-6 border border-gray-700">
        <h2 className="text-3xl font-bold mb-3 text-white">{question?.title}</h2>
        <div className="flex items-center text-sm text-gray-400 mb-4 space-x-6">
          <span>👤 {question?.askby || question?.author?.username}</span>
          <span>👁 {question?.views || 0}</span>
          <span>
            ⏰ {question?.createdAt ? new Date(question.createdAt).toDateString() : ""}
          </span>
        </div>
        <p className="text-lg text-gray-300 leading-relaxed">
          {parse(typeof question?.description === "string" ? question?.description : "")}
        </p>
      </div>

      {/* Answers Section */}
      <div className="bg-[#1c1f2b] rounded-2xl p-6 shadow-lg mb-6 border border-gray-700">
        <h3 className="text-xl font-semibold mb-5 text-white">
          Answers ({answers.length})
        </h3>
        {answers.length > 0 ? (
          <div className="space-y-5">
            {answers.map((a) => (
              <div
                key={a._id}
                className={`p-5 rounded-xl border ${
                  a.accepted
                    ? "bg-gradient-to-r from-green-800 to-green-600 border-green-400"
                    : "bg-[#252a3b] border-gray-600"
                }`}
              >
                <div className="flex">
                  {/* Voting Section */}
                  <div className="flex flex-col items-center mr-4">
                    <button
                      onClick={() => handleVote(a._id, "up")}
                      className="text-gray-300 hover:text-blue-400 transition"
                    >
                      ⬆
                    </button>
                    <span className="font-bold text-lg text-gray-200">
                      {(a.upvotes?.length || 0) - (a.downvotes?.length || 0)}
                    </span>
                    <button
                      onClick={() => handleVote(a._id, "down")}
                      className="text-gray-300 hover:text-red-400 transition"
                    >
                      ⬇
                    </button>
                  </div>

                  {/* Answer Content */}
                  <div className="flex-1">
                    <div className="prose prose-invert max-w-none text-gray-200 [&_img]:w-1/2 [&_img]:h-1/2 [&_img]:rounded-lg ">
                      {parse(a.content)}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      By: {a.author?.username || a.author?.email || "Unknown"}
                    </p>

                    {/* Accept Button - only for question owner */}
                    {String(question.author?._id) === String(userId) && !a.accepted && (
                      <button
                      onClick={() => handleAccept(a._id)}
                      className="mt-3 bg-yellow-500 hover:bg-yellow-600 px-4 py-1 rounded-lg text-black font-medium"
                      >
                        ✅ Mark as Accepted
                      </button>
                    )}

                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No answers yet. Be the first one!</p>
        )}
      </div>

      {/* Add Answer */}
      <div className="bg-[#1c1f2b] rounded-2xl p-6 shadow-lg border border-gray-700">
        <h3 className="text-lg font-semibold mb-3 text-white">Post Your Answer</h3>
        <form onSubmit={handlePostAnswer}>
          <ReactQuill
            theme="snow"
            value={newAnswer}
            onChange={setNewAnswer}
            className="bg-white text-black rounded-lg"
            placeholder="Write your answer..."
          />
          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl text-white font-semibold transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuestionDetails;
