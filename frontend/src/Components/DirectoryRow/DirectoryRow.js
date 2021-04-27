import "./DirectoryRow.css";
import {Row, Col} from "react-bootstrap";

function DirectoryRow(props) {
    return (
        <Row id="directoryRow">
            <Col id="directoryCol">{props.firstName}</Col>
            <Col id="directoryCol">{props.lastName}</Col>
            <Col id="directoryCol">{props.phoneNum}</Col>
            <Col id="directoryCol">{props.email}</Col>
            <Col id="directoryCol">{props.address}</Col>
        </Row>
    );
}

export default DirectoryRow;