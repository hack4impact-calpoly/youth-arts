import "./ActionButton.css";

function ActionButton(props) {
    return <button className={props.actionType} onClick={props.onClick}>
        {props.img == null ? <span className="text">{props.action}</span> : 
            <span className="text"><p>{props.action}</p><img src={props.img} alt="money" /></span>}
    </button>
}

export default ActionButton;