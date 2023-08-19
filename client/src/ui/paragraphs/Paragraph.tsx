import type { ParagraphModel } from "../../models/uiModel";

import style from "./Paragraph.module.scss";

export default function Paragraph({
  children,
  color = "message",
  size = "s",
}: ParagraphModel) {
  return (
    <p className={style.Paragraph} data-color={color} data-size={size}>
      {children}
    </p>
  );
}
