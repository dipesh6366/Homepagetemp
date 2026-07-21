"use client";

import React, { useState } from 'react';
import { OpinionPoll } from '../types';
import { mockPoll } from '../data';

interface OpinionPollCardProps {
  poll?: OpinionPoll;
}

export const OpinionPollCard: React.FC<OpinionPollCardProps> = ({ poll: initialPoll = mockPoll }) => {
  const [poll, setPoll] = useState<OpinionPoll>(initialPoll);
  const [voted, setVoted] = useState(false);

  if (!poll) return null;

  const handleVote = (optionId: string) => {
    if (voted) return;
    setPoll((prev) => ({
      ...prev,
      options: prev.options.map((opt) =>
        opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
      )
    }));
    setVoted(true);
  };

  const total = poll.options.reduce((acc, opt) => acc + opt.votes, 0);

  return (
    <div className="bg-white border border-gray-250 rounded-xl p-5 shadow-sm space-y-4">
      <h4 className="font-serif font-bold text-gray-900 border-b border-gray-150 pb-2">
        वाचकांचा कौल (Opinion Poll)
      </h4>
      <p className="text-sm text-gray-700 font-serif font-medium">
        {poll.question}
      </p>

      {!voted ? (
        <div className="flex gap-3 pt-2">
          {poll.options.map(opt => (
            <button
              key={opt.id}
              onClick={() => handleVote(opt.id)}
              className="flex-1 bg-gray-50 hover:bg-slate-50 border border-gray-200 hover:border-slate-300 text-gray-700 hover:text-slate-700 font-bold py-2 rounded-lg transition-colors cursor-pointer"
            >
              {opt.text}
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-3 pt-2">
          {poll.options.map((opt, i) => {
             const percent = total > 0 ? Math.round((opt.votes / total) * 100) : 0;
             const color = i === 0 ? 'bg-red-700' : 'bg-slate-400';
             return (
              <div key={opt.id} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-gray-600">
                  <span>{opt.text}</span>
                  <span>{percent}%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${color} transition-all duration-1000 ease-out`}
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
              </div>
             );
          })}

          <p className="text-xs text-center text-gray-400 font-medium py-1 mt-2">
            तुमचा कौल नोंदवल्याबद्दल धन्यवाद!
          </p>
        </div>
      )}
    </div>
  );
};
