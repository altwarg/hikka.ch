type Props = {
  symbol: string;
  label?: string;
  hidden?: boolean;
};

export function Emoji({ symbol, label, hidden }: Props) {
  return (
    <span
      role="img"
      aria-label={label ? label : ''}
      aria-hidden={hidden ? true : false}
    >
      {symbol}
    </span>
  );
}
