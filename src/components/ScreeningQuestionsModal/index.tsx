"use client"

import { useAppSelector } from "@/redux/hooks"
import api from "@/Services/Apiservice";
import { useFormik } from "formik";
import { useState, useCallback } from "react"
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import * as Yup from "yup";

interface JobQuestion {
  id: string;
  company_job_id: string;
  question: string;
  question_type: string;
  is_custom: string;
  status: string;
  show_job_question: string;
  created_date: string;
  created_by: string;
}

interface ScreeningQuesModalProps {
  onClose?: () => void;
  questions?: JobQuestion[];
}

export default function ScreeningQuesModal({ 
  onClose = () => {}, 
  questions: propQuestions 
}: ScreeningQuesModalProps) {
  const user = useAppSelector((state) => state.user);
  
  // Default questions if none provided
  const defaultQuestions: JobQuestion[] = [
    {
      id: "1",
      company_job_id: "",
      question: "Can you provide a brief introduction about yourself?",
      question_type: "text",
      is_custom: "1",
      status: "1",
      show_job_question: "1",
      created_date: "",
      created_by: "",
    },
    {
      id: "2",
      company_job_id: "",
      question: "What are your key skills and expertise?",
      question_type: "text",
      is_custom: "1",
      status: "1",
      show_job_question: "1",
      created_date: "",
      created_by: "",
    },
    {
      id: "3",
      company_job_id: "",
      question: "What are your salary expectations?",
      question_type: "text",
      is_custom: "1",
      status: "1",
      show_job_question: "1",
      created_date: "",
      created_by: "",
    },
  ];

  const questions = propQuestions || defaultQuestions;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = questions[currentQuestionIndex];

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: e.target.value,
    }));
  }, [currentQuestion.id]);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      console.log("All answers:", answers);
      onClose();
    }
  }, [currentQuestionIndex, questions.length, answers, onClose]);

    // ✅ Yup Validation Schema
    const validationSchema = Yup.object().shape({
      name: Yup.string()
        .trim()
        .matches(/^[a-zA-Z\s]+$/, "Only alphabets and spaces are allowed")
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name must be at most 50 characters")
        .required("Full name is required"),
    });
  
    // ✅ Formik hook
    const formik = useFormik({
      initialValues: { name: "" },
      validationSchema,
      onSubmit: async (values:any) => {
        
      },
    });

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  return (
    <div className="relative sign-up-modal mx-auto py-5 md:py-8 xl:py-10 w-[90%] rounded-2xl">
          <div onClick={onClose}>
            <IoClose className="absolute z-30 cursor-pointer top-4 -right-4 size-8 font-bold stroke-[1.9]" />
          </div>
          <div>
          <h2 className="text-center font-semibold text-lg md:text-2xl 2xl:text-[28px] 2xl:leading-[36px]">
            <span className="text-red">Hi {user?.name}</span> <br /><span className="">Thank you for showing interest.</span>
          </h2>
          {/* ✅ Formik Form */}
          <form onSubmit={formik.handleSubmit} className="block mt-12 3xl:mt-16">
            <label htmlFor="name" className="text-[#231F20] font-semibold">
            {currentQuestion.question}
            </label>
            <textarea
              id="name"
              name="name"
              rows={5}
              placeholder="Enter your full name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border p-2 w-full bg-[#f2f3f3] outline-none rounded-md 3xl:rounded-lg ${
                formik.errors.name && formik.touched.name
                  ? "border-red-500"
                  : "border-gray-300"
              } ${formik.values.name ? "font-semibold" : "font-normal"}`}
            />
            {/* ✅ Display Validation Error */}
            <div>
              {/* {formik.errors.name && formik.touched.name && (
                <p className="text-red-500 text-sm">{formik.errors.question}</p>
              )} */}
            </div>
            <div className="flex w-full justify-between items-end">
              <div className="whitespace-nowrap">
                <span className="text-red">{currentQuestionIndex + 1}</span> - {questions.length}
              </div>
              <button
                type="submit"
                className={`max-w-[100px] sm:max-w-[250px] ${
                  formik.isValid
                    ? "bg-red text-white"
                    : "!opacity-50 !cursor-default"
                }`}
                disabled={formik.isSubmitting}
              >
                {/* {formik.isSubmitting ? "Submitting..." : "Next"} */}
                Next
              </button>
            </div>
          </form>
        </div>
        </div>
  )
}