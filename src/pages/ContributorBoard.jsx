import React, { useState } from "react";
import { contributors as initialContributors } from "../data/contributors";

const ContributorBoard = () => {
  const [sortBy, setSortBy] = useState("commits");
  const [order, setOrder] = useState("desc");

  // Sorting logic
  const sortedContributors = [...initialContributors].sort((a, b) => {
    if (order === "asc") return a[sortBy] - b[sortBy];
    else return b[sortBy] - a[sortBy];
  });

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">🏆 Top Contributors</h2>

      {/* Sort Controls */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <label className="flex items-center gap-2">
          <span className="font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border px-3 py-1 rounded-md shadow-sm"
          >
            <option value="commits">Commits</option>
            <option value="content">Content</option>
            <option value="quizPoints">Quiz Points</option>
          </select>
        </label>

        <label className="flex items-center gap-2">
          <span className="font-medium">Order:</span>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="border px-3 py-1 rounded-md shadow-sm"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </label>
      </div>

      {/* Leaderboard Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden shadow">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-center">Commits</th>
              <th className="border px-4 py-2 text-center">Content</th>
              <th className="border px-4 py-2 text-center">Quiz Points</th>
            </tr>
          </thead>
          <tbody>
            {sortedContributors.map((c, index) => (
              <tr
                key={c.id}
                className={`${
                  index < 3 ? "bg-yellow-100 font-semibold" : index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="border px-4 py-2">{c.name}</td>
                <td className="border px-4 py-2 text-center">{c.commits}</td>
                <td className="border px-4 py-2 text-center">{c.content}</td>
                <td className="border px-4 py-2 text-center">{c.quizPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContributorBoard;
