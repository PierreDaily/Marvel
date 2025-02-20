type BtnProps = React.ComponentProps<"button">;

export function Button({
  active,
  children,
  className,
  ...rest
}: BtnProps & { active?: boolean }) {
  return (
    <button
      {...rest}
      className={`${className} disabled:border-gray-400 disabled:text-gray-400 disabled:hover:bg-white flex justify-center items-center  border-2 border-red-600 hover:text-white w-16 h-16  hover:bg-red-600   font-noto -skew-x-12 font-bold ${
        active ? "bg-red-600 text-white" : "bg-white text-red-600"
      }`}
    >
      {children}
    </button>
  );
}
