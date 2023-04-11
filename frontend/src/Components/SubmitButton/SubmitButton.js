import "./SubmitButton.css";

function SubmitButton(props) {
  return (
    <button
      id={props.buttonId}
      className="submitButton"
      onClick={props.onClick}
    >
      {props.buttonText}
    </button>
  );
}
SubmitButton.defaultProps = {
  id: "signUp",
};

export default SubmitButton;
