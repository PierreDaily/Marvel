type BtnProps = React.ComponentProps<"button">;

export function Button({ children, className, ...rest }: BtnProps) {
  return (
    <button
      {...rest}
      className={`${className}   disabled:border-gray-400 disabled:text-gray-400 disabled:hover:bg-white flex justify-center items-center text-red-600 border-2 border-red-600 hover:text-white w-16 h-16  hover:bg-red-600  bg-white font-noto -skew-x-12 font-bold`}
    >
      {children}
    </button>
  );
}
