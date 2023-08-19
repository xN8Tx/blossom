import type { HeadingModel } from "../../../models/uiModel";

import style from "./HeadingOne.module.scss";

export default function HeadingOne({ children }: HeadingModel) {
  return <h1 className={style.HeadingOne}>{children}</h1>;
}
