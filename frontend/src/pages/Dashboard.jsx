import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import QuestionItem from "./QuestionItem";
// import QuestionItem from "../components/QuestionItem";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState([]);

  const token = localStorage.getItem("token");

  const fetchQuestions = async () => {
    try {
      const res = await api.get("/questions", { headers: { Authorization: `Bearer ${token}` } });
      console.log(res.data)
      setQuestions(res.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    // Decode JWT
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser({ id: payload.id, name: payload.username || payload.email });
    } catch (err) {
      localStorage.removeItem("token");
      navigate("/login");
    }

    fetchQuestions();
  }, [navigate, token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 p-2 rounded">Logout</button>
      </div>

      <button onClick={() => navigate("/ask")} className="bg-green-500 hover:bg-green-600 p-2 rounded mb-4">
        Ask a Question
      </button>

      <h2 className="text-2xl font-semibold mb-4">Questions</h2>
      <div className="space-y-4">
        {questions.length === 0 && <p>No questions found.</p>}
        {questions.map((q) => (
          <QuestionItem key={q._id} question={q} token={token} refreshQuestions={fetchQuestions} />
        ))}
      </div>
    </div>
  );
}
