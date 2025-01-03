const Button = ({ children, className = "", ...props }) => {
  return (
    <button {...props} className={`rounded-full px-3 py-2 ${className}`}>
      {children}
    </button>
  );
};

export default Button;
