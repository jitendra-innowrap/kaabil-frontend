import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setResumeModal } from "@/redux/profileSlice";
import React, { useState } from "react";

const Resume = () => {
  const dispatch = useAppDispatch();
  const { profileData } = useAppSelector((state) => state.profile);

  const handleFilePreview = (fileUrl: string, fileName: string) => {
    // Get file extension
    const extension = fileName.split('.').pop()?.toLowerCase() || '';
    
    const imageFormats = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    const videoFormats = ['mp4', 'webm', 'ogg', 'mov', 'avi'];
    const docFormats = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'txt'];

    if (imageFormats.includes(extension) || videoFormats.includes(extension)) {
      // Create a new window with iframe
      const previewWindow = window.open('', '_blank');
      if (!previewWindow) return;
      // Create HTML content with iframe
      previewWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Preview: ${fileName}</title>
            <style>
              body { margin: 0; padding: 0; overflow: hidden; }
              iframe { width: 100%; height: 100vh; border: none; }
              .toolbar {
                padding: 0px 15px;
                background: #f5f5f5;
                display: flex;
                justify-content: space-between;
                align-items: center;
              }
              .download-btn {
                padding: 5px 10px;
                background: #E31837;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
              }
            </style>
          </head>
          <body>
            <div class="toolbar">
              <h3>${fileName}</h3>
              <button class="download-btn" onclick="window.location.href='${fileUrl}'">
                Download
              </button>
            </div>
            <div style="
                height: calc(100vh - 50px);
                margin: auto;
                display: flex;
                align-items: center;
            ">
            ${
              ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)
                ? `<img src="${fileUrl}" style="max-width: 100%; max-height: calc(100vh - 150px); display: block; margin: 0 auto;" />`
                : ['mp4', 'webm', 'ogg', 'mov', 'avi'].includes(extension)
                ? `<video controls autoplay style="width: 100%; height: calc(100vh - 50px);">
                     <source src="${fileUrl}" type="video/${extension === 'mov' ? 'mp4' : extension}">
                     Your browser does not support the video tag.
                   </video>`
                : `<iframe src="${
                    ['pdf', 'txt'].includes(extension) 
                      ? fileUrl 
                      : `https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`
                  }" style="width: 100%; height: calc(100vh - 50px);"></iframe>`
            }
            </div>
          </body>
        </html>
      `);
      previewWindow.document.close();
    } else if (docFormats.includes(extension)) {
      // Open document files directly in Google Docs Viewer
      window.open(`https://docs.google.com/viewerng/viewer?url=${encodeURIComponent(fileUrl)}`, '_blank');
    } else {
      // Create a new window with iframe
      const previewWindow = window.open('', '_blank');
      if (!previewWindow) return;
      // Fallback to download for unsupported formats
      const link = document.createElement('a');
      link.href = fileUrl;
      link.setAttribute('download', fileName || 'file');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      previewWindow.close();
    }
  };

  return (
    <div className="profile-card bg-white shadow-sm sm:shadow-default rounded-xl sm:rounded-lg mt-3 p-[16px] sm:p-[20px] lg:px-12 py-6">
      <div className="grid grid-cols-12">
        <div className="col-span-12 flex justify-between">
          <div className="flex gap-3 items-center">
            <img src="/new-assets/icons/resume.svg" alt="Resume Icon" />
            <h1 className="text-[#231F20] font-semibold text-[14px] sm:text-md">
              Resume
            </h1>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => dispatch(setResumeModal(true))}
          >
            <img
              src="/new-assets/icons/ink_marker.svg"
              className="h-3"
              alt=""
            />
            <span className="text-[13px] sm:text-sm font-bold text-red">
              Edit
            </span>
          </div>
        </div>
        <div className="col-span-12 mt-4">
          <div className="flex flex-col gap-4">
            {profileData?.user_portfolio &&
            profileData.user_portfolio.length > 0 ? (
              profileData.user_portfolio.map((item: any, index: number) => (
                <div
                  key={index}
                  className="relative flex items-center w-full p-2 bg-white border border-[#4D4D4F66] rounded-lg cursor-pointer"
                  onClick={() => handleFilePreview(item.file, item.file_name)}
                >
                  {/* File Name Display */}
                  <div className="flex-grow text-[12px] sm:text-sm text-gray-700 px-3 truncate max-w-[70%]">
                    {item?.file_name
                      ? decodeURIComponent(item.file_name)
                      : "No file chosen"}
                  </div>

                  {/* Icon */}
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-blue-500">
                    <img
                      src="/new-assets/icons/attach_file.svg"
                      alt="Attach File Icon"
                    />
                  </div>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
