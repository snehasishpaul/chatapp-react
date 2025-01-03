const Input = ({ type = "text", className = "", ...props }) => {
  return (
    <input
      type={type}
      className={`w-full px-4 py-2 border bg-gray-600 rounded-full border-none ${className}`}
      {...props}
    />
  );
};

export default Input;
