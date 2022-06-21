interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isLoading?: Boolean;
}

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  buttonProps?: ButtonProps & { text: String };
}

interface SpinnerProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  classes?: { root?: string; spinner?: string };
}

export type { ButtonProps, InputProps, SpinnerProps };
