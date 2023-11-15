const Button = ({
    text,
    onClickHandler,
    className
}) => {
    return (
        <button
            className={`rounded-xl bg-slate-900 text-white px-4 py-2 m-1 ${className}`}
            onClick={onClickHandler}
        >
            <p>{text}</p>
        </button>
    );
};
export default Button;
