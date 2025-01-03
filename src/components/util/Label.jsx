/* eslint-disable react/prop-types */
const Label = ({ children, className = "", ...props }) => {
  return (
    <label
      {...props}
      className={`block my-3 text-sm font-semibold ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
