import { useState, useEffect } from "react";

const BaseAPI = () => {
  const [text, setText] = useState<string>("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/Test`)
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
        setText(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setText("Error fetching data");
      });
  }, []);

  console.log(text);

  return (
    <div>
      <p style={{ textAlign: "center" }}>{text}</p>
    </div>
  );
};

export default BaseAPI;
