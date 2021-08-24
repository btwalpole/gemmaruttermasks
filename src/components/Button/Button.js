import styles from "./Button.module.scss";

function Button({ children, className, ...rest }) {
  let buttonClassName = styles.button;

  //if we're passed className, include that in the Button styles
  if (className) {
    buttonClassName = `${buttonClassName} ${className}`;
  }
  return (
    <div className={buttonClassName} {...rest}>
      {children}
    </div>
  );
}

export default Button;
