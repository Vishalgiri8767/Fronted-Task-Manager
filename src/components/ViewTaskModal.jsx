import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import toast from "react-hot-toast";

const ViewTaskModal = ({ showViewModal, handleViewModalClose, id }) => {
  const [task, setTask] = useState([]);
//Assuming your task object is stored in a variable named 'task'
const createdAtDate = new Date(task.createdAt);
const formattedDate = createdAtDate.toDateString(); // Format: Mon May 08 2024




  useEffect(() => {

    const getSingleTask = async () => {
      await axios
        .get(`http://localhost:4000/api/v1/task/single/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setTask(res.data.task);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    };
    if (id) {
      getSingleTask();
    }
  }, [id]);

  return (
    <>
      <Modal show={showViewModal} onHide={handleViewModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>View Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack>
            <p className="fw-bold mb-0">Title</p>
            <p>{task && task.title}</p>
          </Stack>
          <Stack>
            <p className="fw-bold mb-0">Description</p>
            <p>{task && task.description}</p>
          </Stack>
          <Stack>
            <p className="fw-bold mb-0">createdAt</p>
            <p>{task && formattedDate}</p>
          </Stack>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleViewModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewTaskModal;
