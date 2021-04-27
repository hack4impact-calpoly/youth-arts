import "./DirectoryRow.css";
import {Row, Col} from "react-bootstrap";

function DirectoryRow(props) {
    return (
        <Row id="directoryRow">
            <Col>{props.firstName}</Col>
            <Col>{props.lastName}</Col>
            <Col>{props.phoneNum}</Col>
            <Col>{props.email}</Col>
            <Col>{props.address}</Col>
        </Row>
    );
}

export default DirectoryRow;