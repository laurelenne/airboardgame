import React from "react";
import { useTranslation } from "react-i18next";

import { useDropzone } from "react-dropzone";

const LoadGame = ({ onLoad = () => {} }) => {
  const { t } = useTranslation();

  const onDrop = React.useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          try {
            const result = JSON.parse(reader.result);
            onLoad(result);
          } catch (e) {
            console.log("File parsing failed", e);
          }
        };
        reader.readAsText(file);
      });
    },
    [onLoad]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={{ border: "2px dashed black", margin: "0.5em", padding: "0.5em" }}
    >
      <input {...getInputProps()} />
      <p>{t("Dragn drop file here")}</p>
    </div>
  );
};

export default LoadGame;
