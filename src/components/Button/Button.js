import styles from "./Button.module.scss";

function Button({ children, className, ...rest }) {
  let buttonClassName = styles.button;

  //if we're passed className, include that in the Button styles
  if (className) {
    buttonClassName = `${buttonClassName} ${className}`;
  }

  let { disabled } = rest;
  if (disabled) {
    buttonClassName = `${buttonClassName} ${styles.disabled}`;
  }
  console.log("is this button disabled: ", disabled);

  return (
    <button className={buttonClassName} {...rest}>
      {children}
    </button>
  );
}

export default Button;
