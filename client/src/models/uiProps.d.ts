type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  image?: string | undefined;
  color?: 'red' | 'blue';
  tabIndex?: number;
};

type HeadingsProps = Omit<ParagraphProps, 'size'> & {
  size: 's' | 'm' | 'l';
};

type ParagraphProps = {
  children: React.ReactNode;
  color?: 'green' | 'user' | 'message';
  size?: 'xs' | 's' | 'm' | 'l';
};

type InputProps = {
  placeholder: string;
  type: 'number' | 'text' | 'password';
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type BtnInputProps = InputProps & {
  children?: React.ReactNode;
  onClick: (event?: React.MouseEvent<HTMLParagraphElement>) => void;
  position: 'left' | 'right';
  color?: 'first' | 'second';
};

type LinkProps = {
  children: React.ReactNode;
  to: string;
};

export type {
  ButtonProps,
  HeadingsProps,
  ParagraphProps,
  InputProps,
  BtnInputProps,
  LinkProps,
};
