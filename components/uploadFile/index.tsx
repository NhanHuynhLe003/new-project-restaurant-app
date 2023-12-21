import { Input } from "antd";
import * as React from "react";

export interface UploadFileProps {
  handleChangFile: any;
  disabled: boolean;
}

export default function UploadFile({
  handleChangFile,
  disabled,
}: UploadFileProps) {
  return (
    <>
      <input
        disabled={disabled}
        type="file"
        onChange={(e) => handleChangFile(e.target.files?.[0])}
      />
    </>
  );
}
