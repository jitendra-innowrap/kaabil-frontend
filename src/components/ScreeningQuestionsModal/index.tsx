"use client"

import { useAppSelector } from "@/redux/hooks"
import api from "@/Services/Apiservice";
import { useFormik } from "formik";
import { useState, useCallback } from "react"
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import * as Yup from "yup";
import { showToast } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "@/redux/userSlice";
import { setProgress } from "@/redux/progressSlice";
import { clearSessionData } from "../utils/deviceId";
import { RootState } from "@/redux/store";

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
  setIsApplied: (value: boolean) => void;
  jobId: string;
  isApplied: boolean;
}

export default function ScreeningQuesModal({ 
  onClose = () => {}, 
  questions: propQuestions,
  setIsApplied = () => {},
  jobId,
  isApplied
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
  
  const {token} = useSelector((state: RootState) => state.user);
  const questions = propQuestions || defaultQuestions;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const dispatch = useDispatch();
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
    }
  }, [currentQuestionIndex, questions.length]);

  const validationSchema = Yup.object().shape({
    answer: Yup.string().required("Answer is required"),
  });

  const handleApply = async () => {
    try {
      const formData = new FormData();
      formData.append("job_id", jobId);
      formData.append("token", token);
      
      //  Format answers as required
      const jobQuestions = Object.entries(answers).map(([questionId, answer]) => ({
        questions_id: questionId,
        question_answers: answer
      }));

    formData.append("job_question", JSON.stringify(jobQuestions));

      const response = await api.post(`/Company/applyJob?job_id=${jobId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      if(response.data?.code === 1) {
        showToast('Applied Successfully!');
        setIsApplied(true);
      }
      if(response.data?.message === "Invalid Hash Request") {
        showToast("Session Expired Please login!", true);
        dispatch(signOut());
        dispatch(setProgress(1));
        clearSessionData();
      }
    } catch (error) {
      console.error('Error applying for job:', error);
      showToast("Error applying for job", true);
    }
  };

  const formik = useFormik({
    initialValues: { answer: answers[currentQuestion.id] || "" },
    validationSchema,
    onSubmit: async (values) => {
      // Update answers with current question's answer
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: values.answer,
      }));

      // Reset form for next question
      formik.resetForm();
      
      if (isLastQuestion) {
        await handleApply();
      } else {
        handleNext();
      }
    },
    enableReinitialize: true, // To update initialValues when currentQuestion changes
  });

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="relative sign-up-modal mx-auto py-5 md:py-8 xl:py-10 w-[90%] rounded-2xl">
      <div onClick={onClose}>
        <IoClose className="absolute z-30 cursor-pointer top-4 -right-4 size-8 font-bold stroke-[1.9]" />
      </div>
      {!isApplied ?<div>
        <h2 className="text-center font-semibold text-lg md:text-2xl 2xl:text-[28px] 2xl:leading-[36px]">
          <span className="text-red">Hi {user?.name}</span> <br /><span className="">Thank you for showing interest.</span>
        </h2>
        {/* ✅ Formik Form */}
        <form onSubmit={formik.handleSubmit} className="block mt-12 3xl:mt-16">
          <label htmlFor="answer" className="text-[#231F20] font-semibold">
            {currentQuestion.question}
          </label>
          <textarea
            id="answer"
            name="answer"
            rows={5}
            placeholder="Your answer here..."
            value={formik.values.answer}
            onChange={(e) => {
              formik.handleChange(e);
              handleInputChange(e);
            }}
            onBlur={formik.handleBlur}
            className={`border p-2 w-full bg-[#f2f3f3] outline-none rounded-md 3xl:rounded-lg ${
              formik.errors.answer && formik.touched.answer
                ? "border-red-500"
                : "border-gray-300"
            } ${formik.values.answer ? "font-semibold" : "font-normal"}`}
          />
          {/* ✅ Display Validation Error */}
          <div>
            {formik.errors.answer && formik.touched.answer && (
              <p className="text-red-500 text-red text-sm">{formik.errors.answer}</p>
            )}
          </div>
          <div className="flex w-full justify-between items-end mt-4">
            <div className="whitespace-nowrap">
              <span className="text-red">{currentQuestionIndex + 1}</span> - <span>{questions.length}</span> 
            </div>
            <button
              type="submit"
              className={`max-w-[100px] sm:max-w-[250px] px-4 py-2 rounded-md ${
                formik.isValid
                  ? "bg-red text-white"
                  : "bg-red text-white !opacity-60 cursor-not-allowed"
              }`}
              disabled={!formik.isValid || formik.isSubmitting}
            >
              {isLastQuestion ? "Submit" : "Next"}
            </button>
          </div>
        </form>
      </div>:
      <div className="flex flex-col items-center">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="white" stroke="#75D1A6" stroke-width="4"/>
          <path d="M25.4971 38.4167L25.497 38.4167L17.1022 31.1326L17.1022 31.1326C16.3698 30.497 16.298 29.4242 16.9279 28.6985C17.6019 27.922 18.8343 27.8186 19.633 28.4807L19.633 28.4807L26.1463 33.8805L26.1463 33.8805C26.5147 34.1859 27.0917 34.1545 27.4172 33.8219L39.8955 21.0703C39.8955 21.0703 39.8955 21.0702 39.8955 21.0702C40.5834 20.3672 41.7354 20.3088 42.5001 20.9255M25.4971 38.4167L40.2529 21.4199C40.7577 20.9039 41.6189 20.8571 42.1862 21.3147C42.7656 21.782 42.8182 22.596 42.3028 23.1232L42.6604 23.4727C43.3856 22.7308 43.3049 21.5746 42.5001 20.9255M25.4971 38.4167C26.2582 39.0771 27.4482 39.035 28.1532 38.3138L27.7957 37.9643M25.4971 38.4167L27.7957 37.9643M42.5001 20.9255L42.1864 21.3145L42.5001 20.9255C42.5001 20.9255 42.5001 20.9255 42.5001 20.9255ZM27.7957 37.9643L28.1532 38.3138L42.6604 23.4727L27.7957 37.9643Z" fill="#75D1A6" stroke="#75D1A6"/>
        </svg>

        <h2 className="text-center max-w-[350px] 2xl:max-w-[500px] font-semibold my-4 xl:my-5 3xl:my-6 text-lg md:text-2xl 2xl:text-[28px] 2xl:leading-[36px]">
          Your application has been submitted successfully!
        </h2>
        <h3 className="text-center max-w-[300px] 2xl:max-w-[340px] text-base 3xl:text-lg font-normal">You can track your application status in the 'Applied Jobs' section.</h3>
      </div>}

    </div>
  )
}