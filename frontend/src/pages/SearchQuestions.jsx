import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../api";
import parse from "html-react-parser";

export default function SearchQuestions() {
  const [questions, setQuestions] = useState([]);
  const location = useLocation();

  // Extract ?search= from URL
  const params = new URLSearchParams(location.search);
  const query = params.get("search") || "";

  useEffect(() => {
    fetchQuestions(query);
  }, [query]); // runs whenever query changes

  const fetchQuestions = async (q = "") => {
    try {
      const res = await api.get(`/questions/search/?search=${q}`);
      setQuestions(res.data);
      console.log("Search", res.data);
    } catch (err) {
      console.error(err);
    }
  };

// const fetchQuestions = async (q = "") => {
//   try {
//     const res = await api.get(`/questions?search=${q}`);
//     console.log("API response:", res.data);

//     // Agar backend array bhej raha hai to direct set karo
//     // Agar object bhej raha hai { questions: [...] } to usme se nikaalo
//     setQuestions(res.data.results);
//     if (Array.isArray(res.data)) {
//     } else if (Array.isArray(res.data.questions)) {
//       setQuestions(res.data.questions);
//     } else {
//       setQuestions([]); // safety
//     }
//   } catch (err) {
//     console.error(err);
//     setQuestions([]);
//   }
// };


  return (
    <div className="min-h-screen bg-[#111827] text-white pt-24 px-6">
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6 text-blue-400 border-b border-gray-700 pb-2">
        {query ? `Results for "${query}"` : "All Questions"}
      </h2>

      {/* Results */}
      <div>
        {questions.length === 0 ? (
          <p className="text-gray-400 text-center mt-20 text-lg">
            ❌ No questions found
          </p>
        ) : (
          <ul className="space-y-5">
            {questions.map((q) => (
              <li
                key={q._id}
                className="bg-gray-800 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.01] transform transition-all duration-200 p-5"
              >
                <Link to={`/questions/${q._id}`}>
                  <h3 className="font-semibold text-xl text-blue-300 mb-2 hover:underline">
                    {q.title}
                  </h3>
                </Link>
                <p className="text-sm text-gray-400 line-clamp-2">
                  {parse(q.description) || "No description provided."}
                </p>

                <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                  <span>📅 {new Date(q.createdAt).toLocaleDateString()}</span>
                  <span>👤 {q.author?.username || "Anonymous"}</span>
                  <span>🗨️ {q.views || "Anonymous"}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
