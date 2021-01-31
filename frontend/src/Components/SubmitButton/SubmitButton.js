import "./SubmitButton.css";

function SubmitButton(props) {
    return (
        <button id="signUp" className="submitButton" onClick={props.onClick}>{props.buttonText}</button>
    );
}

export default SubmitButton;