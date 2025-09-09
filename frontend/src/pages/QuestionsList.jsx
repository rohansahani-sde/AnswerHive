import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import parse from "html-react-parser";

const QuestionsList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await api.get("/questions");
      setQuestions(res.data.results);
      console.log(res.data.results);
    };
    fetchQuestions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Filters */}
      <div className="flex gap-4 px-6 py-4 border-b border-gray-800 bg-gray-900 sticky top-0 z-40">
        <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium shadow hover:bg-blue-500">
          Newest
        </button>
        <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium">
          Unanswered
        </button>
        <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium">
          Most Voted
        </button>
        <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium">
          Trending
        </button>
      </div>

      {/* Questions List */}
      <main className="px-6 py-6 max-w-5xl mx-auto space-y-6">
        {questions?.map((q) => (
          <Link
            key={q._id}
            to={`/questions/${q._id}`}
            state={q}
            className="block bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl hover:border-blue-500 transition transform hover:-translate-y-1"
          >
            {/* Title */}
            <h2 className="text-xl font-semibold text-blue-400 mb-2 hover:underline">
              {q.title}
            </h2>

            {/* Description */}
            <div className="text-gray-300 text-sm line-clamp-3 mb-3 leading-relaxed">
              {parse(q.description)}
            </div>

            {/* Tags */}
            {q.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {q.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-900/40 text-blue-300 text-xs font-medium px-3 py-1 rounded-full border border-blue-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Footer */}
            <div className="flex justify-between items-center text-xs text-gray-400 border-t border-gray-800 pt-3">
              <p>
                Asked by{" "}
                <span className="text-gray-200 font-medium">{q.askedBy}</span>
              </p>

              <div className="flex gap-4 text-gray-400">
                <span>👍 {q.upvotes}</span>
                <span>👎 {q.downvotes}</span>
                <span>💬 {q.answersCount}</span>
                <span>👀 {q.views}</span>
              </div>
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
};

export default QuestionsList;
