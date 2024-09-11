import React, { useState } from "react";
import { Navbar, Container, Button, Modal, Form, Col, Row } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const Index = () => {
  const [show, setShow] = useState(false);
  const [segments, setSegments] = useState([]);
  const [values, setValues] = useState({ schema: [] });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = () => {
    const newSegment = {
      id: uuidv4(),
      value: "",   
    };

    setSegments((prevSegments) => [...prevSegments, newSegment]);
  };


  const handleChange = (event, segmentId) => {
    const selectedValue = event.target.value;

    setValues((prevValues) => ({
      schema: [
        ...(prevValues.schema || []),
        { [segmentId]: selectedValue },
      ],
    }));
  };


  const handleDelete = (segmentId) => {
    setSegments((prevSegments) =>
      prevSegments.filter((segment) => segment.id !== segmentId)
    );
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <Button variant="light" onClick={handleShow}>
              Save segment
            </Button>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="18"
              fill="currentColor"
              className="bi bi-chevron-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
              />
            </svg>{" "}
            Saving Segment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter the Name of the Segment</Form.Label>
              <Form.Control
                type="email"
                placeholder="Name of the segment"
                onChange={(event) => {
                  const newSegmentName = event.target.value;

                  setValues((prevValues) => ({
                    ...prevValues,
                    segment_name: newSegmentName,
                  }));
                }}
              />
              <Form.Text className="text-muted">
                To save your segment, you need to add the schemas to build the
                query
              </Form.Text>
            </Form.Group>

            {segments.map((segment) => (
              <Container key={segment.id}>
                <Row style={{ marginTop: "20px", alignItems: "flex-start" }}>
                  <Col xs={1} style={{ padding: "0px" }}>
                    <svg
                      className="input-icon-grey"
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                    >
                      <circle cx="8" cy="8" r="8" />
                    </svg>
                  </Col>
                  <Col xs={10} style={{ padding: "0px" }}>
                    <div className="form-group segment">
                      <select
                        className="form-control segment-dropdown"
                        style={{ width: "100%", height: "6vh" }}
                        onChange={(event) => handleChange(event, segment.id)}
                      >
                        <option>Add schema to segment</option>
                        <option value="first_name">First Name</option>
                        <option value="last_name">Last Name</option>
                        <option value="gender">Gender</option>
                        <option value="age">Age</option>
                        <option value="account_name">Account Name</option>
                        <option value="city">City</option>
                        <option value="state">State</option>
                      </select>
                    </div>
                  </Col>
                  <Col xs={1}>
                    <button
                      className="button-13"
                      role="button"
                      onClick={() => handleDelete(segment.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-dash-lg"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8z"
                        />
                      </svg>
                    </button>
                  </Col>
                </Row>
              </Container>
            ))}

            <div className="row" style={{ marginTop: "10px" }}>
              <div className="col-sm-12">
                <a className="add-sch" href="#" onClick={handleClick}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-plus"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                  </svg>
                  Add new schema
                </a>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            style={{ backgroundColor: "#5dbea3" }}
            onClick={handleClose}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Index;
