import { useState, useEffect } from "react";
import api from "../api";

export default function QuestionItem({ question, token, refreshQuestions }) {
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");

  // Fetch answers for this question
  const fetchAnswers = async () => {
    try {
      const res = await api.get(`/questions/${question._id}/answers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnswers(res.data || []);
    //   console.log(res.data)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAnswers();
  }, [question]);

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    if (!newAnswer) return;

    try {
      const res = await api.post(`/questions/${question._id}/answers`,
        { content: newAnswer },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewAnswer("");
      fetchAnswers(); // refresh answers list
      refreshQuestions(); // refresh question list
    } catch (err) {
      console.log(err);
    }
  };

  const handleVote = async (answerId, type) => {
    try {
      const res = await api.post(
        `/questions/vote/${answerId}`,
        { type },
        { headers: { Authorization: `Bearer ${token}` } }
        );
      setAnswers(answers.map((a) => (a._id === answerId ? res.data : a)));
      console.log("vote", res.data)
    } catch (err) {
      console.log(err);
    }
  };

  const handleAccept = async (answerId) => {
    try {
      await api.post(
        `/questions/${question._id}/accept`,
        { answerId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAnswers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded shadow-md mb-4">
      <h3 className="text-xl font-bold">{question.title}</h3>
      <p className="mt-2">{question.description}</p>
      <p className="mt-1 text-sm text-gray-400">
        Asked by: {question.author?.username || "Unknown"}
      </p>

      {/* Answers */}
      <div className="mt-4 space-y-2">
        {answers.length === 0 && (
          <p className="text-gray-400">No answers yet. Be the first!</p>
        )}
        {answers.map((a) => (
          <div
            key={a._id}
            className={`p-2 rounded ${a.accepted ? "bg-green-700" : "bg-gray-700"}`}
          >
            <p>{a.content}</p>
            <p className="text-sm text-gray-300">
              By: {a.author?.username || a.user?.email || "Unknown"}
            </p>
            <div className="flex space-x-2 mt-1">
              <button
                onClick={() => handleVote(a._id, "up")}
                className="bg-blue-500 px-2 rounded"
              >
                👍 {a.upvotes?.length || 0}
              </button>
              <button
                onClick={() => handleVote(a._id, "down")}
                className="bg-red-500 px-2 rounded"
              >
                👎 {a.downvotes.length || 0}
              </button>
              {question.author?._id === a.user?._id && !a.accepted && (
                <button
                  onClick={() => handleAccept(a._id)}
                  className="bg-yellow-500 px-2 rounded"
                >
                  Accept
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Post new answer */}
      <form onSubmit={handleAnswerSubmit} className="mt-4">
        <textarea
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          placeholder="Write your answer..."
          className="w-full p-2 mb-2 rounded bg-gray-700"
          rows={2}
          required
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 p-2 rounded"
        >
          Post Answer
        </button>
      </form>
    </div>
  );
}
