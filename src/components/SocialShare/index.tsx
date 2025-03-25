import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    LinkedinShareButton,
    FacebookIcon,
    XIcon,
    WhatsappIcon,
    LinkedinIcon,
  } from 'react-share';
  import { useState } from 'react';
  
  interface JobDetails {
    share_url?: string;
    // Add other properties if needed
  }
  
  interface ShareButtonsProps {
    jobDetails: JobDetails;
  }
  
  const ShareButtons: React.FC<ShareButtonsProps> = ({ jobDetails }) => {
    const [isCopied, setIsCopied] = useState(false);
    const fullUrl = `${jobDetails?.share_url}`;
    const title = 'Share this opportunity!';
  
    const handleCopy = () => {
      if (!jobDetails?.share_url) return;
      
      navigator.clipboard.writeText(fullUrl)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
          // Fallback for older browsers
          const textarea = document.createElement('textarea');
          textarea.value = fullUrl;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        });
    };
  
    return (
      <div className="block bg-[#f6fbff] rounded p-4 max-w-[300px]">
        <h4 className='font-semibold italic mb-3'>Share this opportunity!</h4>
        <div className="flex gap-3 items-center">
          <FacebookShareButton 
            url={fullUrl} 
            title={title}
            className="hover:opacity-80 transition-opacity"
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
  
          <TwitterShareButton
            url={fullUrl}
            title={title}
            className="hover:opacity-80 transition-opacity"
          >
            <XIcon size={32} round />
          </TwitterShareButton>
  
          <WhatsappShareButton
            url={fullUrl}
            title={title}
            separator=": "
            className="hover:opacity-80 transition-opacity"
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
  
          <LinkedinShareButton
            url={fullUrl}
            title={title}
            className="hover:opacity-80 transition-opacity"
          >
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </div>
        
        <div className="border flex mt-5 bg-[#494b4c] rounded p-3 items-center">
          <p className='w-full text-white text-sm leading-normal overflow-auto truncate'>
            {fullUrl}
          </p>
          <button 
            onClick={handleCopy}
            className={`text-xs ml-2 px-2 py-1 rounded transition-colors whitespace-nowrap`}
            disabled={!jobDetails?.share_url}
          >
            {isCopied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    );
  };
  
  export default ShareButtons;