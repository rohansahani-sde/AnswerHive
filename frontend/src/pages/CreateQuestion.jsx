import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateQuestion = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  // 🔹 Add tag
  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  // 🔹 Remove tag
  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  // 🔹 Submit question
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    try {
      await api.post(
        "/questions",
        { title, description, tags },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/questions"); // Redirect after success
    } catch (err) {
      console.log("Error posting question:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="max-w-3xl mx-auto bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-800">
        {/* Title */}
        <h2 className="text-3xl font-bold text-blue-400 mb-8">Ask a Question</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. How to center a div in CSS?"
              className="w-full p-3 rounded-xl bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description Editor */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Description <span className="text-red-500">*</span>
            </label>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              className="bg-white text-black rounded-lg"
              placeholder="Provide details about your question..."
            />
          </div>

          {/* Tags Input */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Tags
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Enter a tag"
                className="flex-1 p-3 rounded-xl bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAddTag}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl text-white font-medium transition"
              >
                Add
              </button>
            </div>

            {/* Tags List */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-white hover:text-red-300"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white font-semibold transition"
          >
            🚀 Post Question
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuestion;
