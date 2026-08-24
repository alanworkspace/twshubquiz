// src/App.jsx
import React, { useState } from 'react';
import quizData from './data/quizData';

export default function App() {
  const [started, setStarted] = useState(false);
  const { landing } = quizData;

   if (started) {
    return (
      <div className="min-h-screen bg-[#FFFDF8] flex items-center justify-center p-4">
        <h2 className="text-2xl font-bold">進入測驗題目頁面...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF8] flex items-center justify-center p-4 md:p-8 text-[#2D3748]">
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-8 md:gap-12">
        

        <div className="flex-1 space-y-6 text-left">
          <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-medium">
            <span className="bg-[#FFEAD2] text-[#D97706] px-3 py-1 rounded-full border border-[#F59E0B]">
              {landing.categoryTag}
            </span>
            <span className="bg-[#E0F2FE] text-[#0284C7] px-3 py-1 rounded-full">
              {landing.badgeText}
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1A202C] leading-tight">
              {landing.title}
            </h1>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              {landing.subtitle}
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setStarted(true)}
              className="w-full md:w-auto px-8 py-4 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold text-lg rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
            >
              {landing.startButtonText}
            </button>
            <p className="text-xs text-gray-400 mt-2 pl-1">
              {landing.subHint} · {landing.noticeText}
            </p>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-400 mb-2 font-medium">可能測出的性格角色：</p>
            <div className="flex flex-wrap gap-3">
              {landing.characters?.map((char) => (
                <div
                  key={char.id}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border border-black/10 ${char.color}`}
                >
                  <span className="text-sm font-bold">{char.name}</span>
                  <span className="text-xs opacity-75">({char.tag})</span>
                </div>
              ))}
            </div>
          </div>
        </div>


        <div className="flex-1 w-full max-w-md md:max-w-none flex justify-center">
          <div className="bg-white p-4 md:p-6 rounded-3xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] w-full">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-[#FFFDF8]">
              <img
                src={landing.heroImage}
                alt="Quiz Hero Illustration"
                className="w-full h-auto object-cover max-h-[420px]"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}