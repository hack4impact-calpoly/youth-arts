import styles from "./SubmitButton.css";

function SubmitButton(props) {
    return (
        <button id="signUp" onClick={props.onClick}>{props.buttonText}</button>
    );
}

export default SubmitButton;