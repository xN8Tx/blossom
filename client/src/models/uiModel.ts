type HeadingModel = {
  children: React.ReactNode;
};

type ButtonModel = {
  children: React.ReactNode;
  onClick: () => void;
  image?: string | undefined;
  color?: "red" | "blue";
};

type ParagraphModel = {
  children: React.ReactNode;
  color?: "green" | "user" | "message";
  size?: "xs" | "s" | "m" | "l" | "xl";
};

export type { HeadingModel, ButtonModel, ParagraphModel };
