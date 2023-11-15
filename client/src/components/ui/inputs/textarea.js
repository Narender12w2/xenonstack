import { useRef } from "react";

const TextArea = ({
  placeholder,
  isValid,
  className,
  value,
  id,
  onChangeHandler,
  label,
  error,
}) => {
  const TextAreaRef = useRef(null);
  return (
    <div
      className={`group relative my-3 mb-6 w-full border-[1px] border-grey focus-within:border-primary ${
        isValid === false && "border-2 border-red-500 focus:border-red-500"
      } `}
    >
      {label && (
        <label
          htmlFor={id ?? placeholder}
          className={`bg-black pl-3
        text-xs font-light capitalize text-grey group-focus-within:text-primary ${
          isValid === false && "text-red-500 group-focus-within:text-red-500"
        }`}
        >
          {label}
        </label>
      )}
      <textarea
        name={id ?? placeholder}
        id={id ?? placeholder}
        placeholder={placeholder}
        value={value}
        onChange={onChangeHandler}
        ref={TextAreaRef}
        className={`my-3 h-max w-full p-3 text-white
              placeholder:font-light placeholder:text-white focus:outline-none 
              focus:placeholder:text-primary  ${
                isValid === false &&
                "focus:placeholder:test-red-500 placeholder:text-red-500"
              } ${className} ${label && "!my-0 !py-0 placeholder:opacity-0"}`}
        style={{ resize: "none" }}
      />
      {!isValid && error && (
        <p
          className={`absolute -bottom-1 left-3 text-xs font-light text-red-500`}
        >
          {error}
        </p>
      )}
    </div>
  );
};
export default TextArea;
