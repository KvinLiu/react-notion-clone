import { useRef } from "react";
import type { ChangeEventHandler } from "react";
import styles from "./Cover.module.css";
import { FileImage } from "../components/FileImage";
import { uploadImage } from "../utils/uploadImage";

type CoverProps = {
  filePath?: string;
  changePageCover: (filePath: string) => void;
};

export const Cover = ({ filePath, changePageCover }: CoverProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const onChangeCoverImage = () => {
    fileInputRef.current?.click();
  };
  const onCoverImageUpload: ChangeEventHandler<HTMLInputElement> = async (
    e,
  ) => {
    const target = e.target;
    const result = await uploadImage(target?.files?.[0]);
    if (result?.filePath) {
      changePageCover(result?.filePath);
    }
  };
  return (
    <div className={styles.cover}>
      {filePath && filePath.length ? (
        <FileImage className={styles.image} filePath={filePath} />
      ) : (
        <img src="/ztm-notes.png" alt="Cover" className={styles.image} />
      )}
      <button className={styles.button} onClick={onChangeCoverImage}>
        Change cover
      </button>
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: "none" }}
        onChange={onCoverImageUpload}
      />
    </div>
  );
};
