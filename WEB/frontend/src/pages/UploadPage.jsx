import React from "react";
import UploadTemplate from "../components/upload/UploadTemplate";
import UploadForm from "../components/upload/UploadForm";

const UploadPage = () => {
  const time={startTime: "00:00:00", endTime: "00:00:00"}
  return (
    <>
      <UploadTemplate>
        <UploadForm time={time}/>
      </UploadTemplate>
    </>
  );
}
export default UploadPage;