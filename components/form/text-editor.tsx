import dynamic from "next/dynamic";
import React, { LegacyRef, useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import styles from "../../styles/form/text-editor.module.css";
import ReactQuill, { ReactQuillProps } from "react-quill";
import { Control, FieldValues, Path, useController } from "react-hook-form";

export type ReactQuillWrapperProps = ReactQuillProps & {
  forwardRef: LegacyRef<ReactQuill>;
};
//ReactQuillWrapper is retry component of nextjs not ReactQuill, ReactQuill just be called after
//render. if I want to set ref for ReactQuill I have to forward it to ReactQuillMain(React Quill)
const ReactQuillWrapper = dynamic(
  async () => {
    const { default: ReactQuillMain } = await import("react-quill");
    const Component = ({ forwardRef, ...props }: ReactQuillWrapperProps) => {
      return <ReactQuillMain ref={forwardRef} {...props}></ReactQuillMain>;
    };
    return Component;
  },
  { ssr: false }
);
const modules = {
  toolbar: {
    container: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
    ], // Selector for toolbar container
  },
};

//
export type TextEditorProps<T extends FieldValues> = ReactQuillProps & {
  name: Path<T>;
  control: Control<T>;
};

//prevent SSR on React Quill because lib not support

export default function TextEditor<T extends FieldValues>({
  name,
  control,
  onChange: extenalChangeInput,
  onBlur: externalBlurInput,
  value: externalValueInput,
  ...rest
}: TextEditorProps<T>) {
  const {
    field: { value, onChange, ref },
    fieldState,
  } = useController({
    name,
    control,
  });

  return (
    <ReactQuillWrapper
      forwardRef={ref}
      className={styles.EditorText}
      theme="snow"
      modules={modules}
      onChange={(value) => onChange(value)}
      value={value}
      {...rest}
    ></ReactQuillWrapper>
  );
}
