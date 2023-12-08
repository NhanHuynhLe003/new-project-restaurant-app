import { Input } from "antd";
import * as React from "react";

export interface UploadFileProps {
  handleChangFile: any;
}

export default function UploadFile({ handleChangFile }: UploadFileProps) {
  return (
    <>
      <input
        type="file"
        onChange={(e) => handleChangFile(e.target.files?.[0])}
      />
    </>
  );
}
