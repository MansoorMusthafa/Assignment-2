import React, { useState } from "react";
import { Navbar, Container, Button, Modal, Form } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';

const Index = () => {
  const [show, setShow] = useState(false);
  const [segments, setSegments] = useState([]);
  const [values, setValues] = useState({ schema: [] });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = () => {
    const newSegment = (
      <div className="row" style={{ marginTop: "20px" }} key={uuidv4()}>
        <div className="col-sm-1">
          <svg
            className="input-icon-grey"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 16 16"
          >
            <circle cx="8" cy="8" r="8" />
          </svg>
          &nbsp; &nbsp;&nbsp;
        </div>

        <div className="col-sm-10 segment-div">
          <div className="form-group segment">
            <select
              className="form-control segment-dropdown"
              id="exampleFormControlSelect1"
              style={{ width: "100%", height: "6vh" }}
              onChange={(event) => handleChange(event)}
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
        </div>

        <div className="col-sm-1">
          <button
            className="button-13"
            role="button"
            onClick={() => handleDelete(newSegment.key)}
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
        </div>
      </div>
    );

    setSegments((prevSegments) => [...prevSegments, newSegment]);
  };

  const handleChange = async (event) => {
    const selectedValue = event.target.value;

    const selectedOption = event.target.options[event.target.selectedIndex];
    const selectedLabel = selectedOption.label;

    console.log(selectedValue, "mmmmmmm", selectedLabel);

    setValues(prevValues => ({
      schema: [...(prevValues.schema || []), { [selectedValue]: selectedLabel }]
    }));
  };

  console.log(values, "................")

  const handleDelete = (key) => {
    setSegments((prevSegments) =>
      prevSegments.filter((segment) => segment.key !== key)
    );
  };

  const handleSortByKey = () => {
    const sortedSchema = values.schema.reduce((acc, curr) => {
      // Extract the key from the current object
      const key = Object.keys(curr)[0];

      // Insert the current object into the correct position in the accumulator
      const index = acc.findIndex(item => {
        const itemKey = Object.keys(item)[0];
        return key > itemKey;
      });

      // If a position is found, insert the item
      if (index === -1) {
        acc.push(curr);
      } else {
        acc.splice(index, 0, curr);
      }

      return acc;
    }, []);

    // Update the state with the sorted schema
    setValues(prevValues => ({
      ...prevValues,
      schema: sortedSchema
    }));
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

                  handleSortByKey()

                  // Update the state with the new segment name
                  setValues(prevValues => ({
                    ...prevValues,
                    segment_name: newSegmentName
                  }));
                }}
              />

              <Form.Text className="text-muted">
                To save your segment, you need to add the schemas to build the
                query
              </Form.Text>
            </Form.Group>

            <div className="dot_div">
              <label>
                <svg
                  className="bi bi-circle-fill icon-green"
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                >
                  <circle cx="8" cy="8" r="8" />
                </svg>{" "}
                &nbsp; User Tracks &nbsp;&nbsp;
                <svg
                  className="bi bi-circle-fill icon-pink"
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                >
                  <circle cx="8" cy="8" r="8" />
                </svg>{" "}
                &nbsp; Group Tracks
              </label>
            </div>
            <br />
            {segments.map((element) => (
              <div key={element.key}>{element}</div>
            ))}

            <br />
            <div className="row">
              <div className="col-sm-1"></div>
              <div className="col-sm-10">
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
              <div className="col-sm-1"></div>
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
