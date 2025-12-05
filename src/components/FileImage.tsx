import { useState, useEffect, type HtmlHTMLAttributes } from "react";
import type { ImgHTMLAttributes } from "react";
import { supabase } from "../supabaseClient";
import { Loader } from "./Loader";
import styles from "../utils.module.css";

type FileImagePros = {
  filePath: string;
} & ImgHTMLAttributes<HTMLImageElement>;

export const FileImage = ({ filePath, ...props }: FileImagePros) => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const downloadImage = async (filePath: string) => {
      setLoading(true);
      const { data } = await supabase.storage.from("images").download(filePath);
      if (data) {
        const url = URL.createObjectURL(data);
        setImage(url);
        setLoading(false);
      }
    };
    if (filePath && filePath.length) {
      downloadImage(filePath);
    }
  }, [filePath]);

  if (loading) {
    return (
      <div className={styles.centeredFlex}>
        <Loader />
      </div>
    );
  }

  return <img src={image} alt={filePath} {...props} />;
};
