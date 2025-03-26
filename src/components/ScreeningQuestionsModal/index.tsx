"use client"

import type React from "react"
import { useState } from "react"

interface Prop {
  onClose?: () => void
  userName?: string
}

interface Question {
  id: number
  question: string
  placeholder: string
}

export default function ScreeningQuesModal({ onClose = () => {}, userName = "Shweta" }: Prop) {
  // Questions data
  const questions: Question[] = [
    {
      id: 1,
      question: "Can you provide a brief introduction about yourself ?",
      placeholder: "Example about your role and experience",
    },
    {
      id: 2,
      question: "What are your key skills and expertise?",
      placeholder: "List your technical skills, soft skills, etc.",
    },
    {
      id: 3,
      question: "What are your salary expectations?",
      placeholder: "You can provide a range or specific amount",
    },
  ]

  // State for current question and answers
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: string }>({})

  // Current question
  const currentQuestion = questions[currentQuestionIndex]

  // Handle text input change
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: e.target.value,
    })
  }

  // Handle next button click
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // Submit all answers
      console.log("All answers:", answers)
      if (typeof onClose === "function") {
        onClose()
      }
    }
  }

  return (
    <div className="fixed  inset-0 w-full h-full bg-black/50 flex items-center justify-center z-[100]">
      <div className="bg-white rounded-lg w-full max-w-[530px] mx-4 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute bg-white right-0 top-2 text-gray-800 hover:text-white  text-lg font-bold"
          aria-label="Close"
        >
          <img src="/new-assets/icons/close.png" alt="" className="w-4 h-4" />
        </button>

        {/* Modal content */}
        <div className="p-8 px-12 pt-5">
          {/* Greeting */}
          <h2 className="text-center">
            <span className="text-red  font-bold text-xl">Hi {userName}!</span>
            <div className="text-xl font-semibold mt-1">Thank you for showing interest.</div>
          </h2>

          {/* Question - reduced margin from mt-6 to mt-3 */}
            <div className="mt-10">
            <p className="text-gray-800 text-sm truncate">{currentQuestion.question}</p>
            <textarea
              className="w-full h-32 mt-2 p-2 bg-gray-100 rounded-md resize-none text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
              placeholder={currentQuestion.placeholder}
              value={answers[currentQuestion.id] || ""}
              onChange={handleInputChange}
            />
            </div>

          {/* Pagination and Next button */}
          <div className="flex items-center justify-between mt-6">
  {/* Pagination */}
  <div className="text-gray-600 text-base font-light ">
    <span className="text-red font-semibold">{currentQuestionIndex + 1}</span> — {questions.length}
  </div>

  {/* Next/Submit Button */}
  <button
    onClick={handleNext}
    className="px-20 py-2 bg-red text-white rounded-xl hover:bg-red transition-colors"
  >
    {currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}
  </button>
</div>

        </div>
      </div>
    </div>
  )
}

