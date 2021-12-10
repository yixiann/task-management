import React from "react";
import { Tooltip } from "antd";

export const tooltipEllipse = (
  text = "",
  width = "-webkit-fill-available",
  textLength = 40
) => {
  if (typeof text === "number") {
    text = text.toString();
  } else if (typeof text !== "string") {
    text = "";
  }

  return (
    <>
      {text.length > textLength && (
        <Tooltip placement="topLeft" title={text}>
          <p
            id="pOverflow"
            style={{
              textOverflow: "ellipsis",
              display: "block",
              width: width,
              overflow: "hidden",
              whiteSpace: " nowrap",
              margin: "0px",
            }}
          >
            {text}
          </p>
        </Tooltip>
      )}
      {text.length <= textLength && <>{text}</>}
    </>
  );
};
