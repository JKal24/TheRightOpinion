import * as React from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';

const Result = () => {
  return (
    <Container className="Result">
        <Row>Title</Row>
        <Row>
            <div>Views to Likes Ratio</div>
            <button>Downvote</button>
        </Row>
        <Row>
            <button>Sentiment Analysis</button>
        </Row>
    </Container>
  );
};

export default Result;
