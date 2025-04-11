import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  XIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";
import { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";
import useDialogSize from "@/hooks/useDialogSize";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setOpenShare } from "@/redux/jobsFilterSlice";

interface JobDetails {
  share_url?: string;
  // Add other properties if needed
}

interface ShareButtonsProps {
  jobDetails: JobDetails;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ jobDetails }: any) => {
  const { openShare, shareUrl } = useAppSelector(
    (state) => state.jobFiltersMaster
  );

  const size = useDialogSize();
  const dispatch = useAppDispatch();
  const [isCopied, setIsCopied] = useState(false);
  const fullUrl = `${shareUrl?.url}`;

  // Build the share message dynamically
  const baseTitle = `${jobDetails?.company_name} is hiring for ${jobDetails?.job_title} on Kaabil app. Quickly apply for this and 1000's of other jobs on the Kaabil app.`;
  const locationText = jobDetails?.job_location
    ? ` at ${jobDetails.job_location}`
    : "";
  const title = `${baseTitle}${locationText}.`;

  const closePopup = () => {
    dispatch(setOpenShare(false));
  };

  const handleCopy = () => {
    if (!jobDetails?.share_url) return;
    navigator.clipboard
      .writeText(fullUrl)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        const textarea = document.createElement("textarea");
        textarea.value = fullUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
  };

  return (
    // @ts-ignore
    <Dialog
      open={openShare}
      // @ts-ignore
      size={size}
      handler={closePopup}
      className={`${
        size === "xxl"
          ? "mx-auto fixed   sm-dailog"
          : "fixed top-10 -translate-x-1/2 custom-dialog"
      }`}
      // className="fixed top-10 -translate-x-1/2 custom-dialog bg-white shadow-lg rounded-xl p-6"
    >
      {/* @ts-ignore */}
      <DialogHeader>
        <div className="relative w-full">
          <IoClose
            className="absolute top-0 right-0 cursor-pointer"
            size={size === "md" ? 36 : 28}
            onClick={closePopup}
          />
          <div
            className={`flex items-center ${
              size === "xxl"
                ? "justify-start text-md mt-16"
                : "justify-center text-3xl mt-6"
            }`}
          >
            <h2 className="text-center text-[#231F20] font-semibold">
              Share <span className="text-red">this opportunity!</span>
            </h2>
          </div>
        </div>
      </DialogHeader>
      {/* @ts-ignore */}
      <DialogBody>
        <div className="">
          {/* Social Media Buttons */}
          <div
            className={`flex gap-4 items-center ${
              size === "xxl" ? "justify-start" : "justify-center"
            } mb-5`}
          >
            <FacebookShareButton
              url={fullUrl}
              title={title}
              className="hover:opacity-90 transition-transform transform hover:scale-105"
            >
              <FacebookIcon size={size === "md" ? 40 : 30} round />
            </FacebookShareButton>

            <TwitterShareButton
              url={fullUrl}
              title={title}
              className="hover:opacity-90 transition-transform transform hover:scale-105"
            >
              <XIcon size={size === "md" ? 40 : 30} round />
            </TwitterShareButton>

            <WhatsappShareButton
              url={fullUrl}
              title={title}
              separator=": "
              className="hover:opacity-90 transition-transform transform hover:scale-105"
            >
              <WhatsappIcon size={size === "md" ? 40 : 30} round />
            </WhatsappShareButton>

            <LinkedinShareButton
              url={fullUrl}
              title={title}
              className="hover:opacity-90 transition-transform transform hover:scale-105"
            >
              <LinkedinIcon size={size === "md" ? 40 : 30} round />
            </LinkedinShareButton>
          </div>

          {/* Copy URL Section */}
          <div
            className={`border flex items-center bg-[#494b4c] rounded-lg ${
              size === "xxl" ? "p-2" : "p-3"
            }`}
          >
            <p className="w-full text-white text-sm leading-normal overflow-auto truncate">
              {fullUrl}
            </p>
            <button
              onClick={handleCopy}
              className={`text-md  ml-2 px-6 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap ${
                !jobDetails?.share_url ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!jobDetails?.share_url}
            >
              {isCopied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default ShareButtons;
