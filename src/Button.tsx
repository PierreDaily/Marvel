type BtnProps = React.ComponentProps<"button">;

export function Button({ children, className, ...rest }: BtnProps) {
  return (
    <button
      {...rest}
      className={`${className}  disabled:bg-gray-500 flex justify-center items-center text-white w-16 h-16  hover:bg-red-600  bg-red-500 font-noto -skew-x-12 font-bold`}
    >
      {children}
    </button>
  );
}
