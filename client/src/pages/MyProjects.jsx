 
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { GlobalContext } from "../context/context.jsx";

const MyProjects = () => {
  const { state } = useContext(GlobalContext);

  const [projects, setProjects] = useState([]);

  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    developerName: "",
    description: "",
    hostedUrl: ""
  });

  // =========================
  // GET ALL PROJECTS
  // =========================

  const getProjects = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/allprojects"
      );

      console.log("MY PROJECTS:", response.data);

      if (response.data?.success) {
        setProjects(response.data.data);
      }

    } catch (error) {
      console.log(
        "GET PROJECT ERROR:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  // =========================
  // INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // =========================
  // ADD PROJECT
  // =========================

  const handleAddProject = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/addproject",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("ADD RESPONSE:", response.data);

      if (response.data?.success) {
        toast.success("Project added successfully");

        setFormData({
          title: "",
          developerName: "",
          description: "",
          hostedUrl: ""
        });

        getProjects();
      }

    } catch (error) {
      console.log(
        "ADD ERROR:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
        "Project add nahi hua"
      );
    }
  };

  // =========================
  // DELETE PROJECT
  // =========================

  const handleDeleteProject = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `http://localhost:5000/api/deleteproject/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("DELETE RESPONSE:", response.data);

      if (response.data?.success) {
        toast.success("Project deleted successfully");

        setProjects(
          projects.filter((project) => project._id !== id)
        );
      }

    } catch (error) {
      console.log(
        "DELETE ERROR:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
        "Project delete nahi hua"
      );
    }
  };

  // =========================
  // EDIT BUTTON
  // =========================

  const handleEdit = (project) => {
    setEditId(project._id);

    setFormData({
      title: project.title,
      developerName: project.developerName,
      description: project.description,
      hostedUrl: project.hostedUrl
    });
  };

  // =========================
  // UPDATE PROJECT
  // =========================

  const handleUpdateProject = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:5000/api/updateproject/${editId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("UPDATE RESPONSE:", response.data);

      if (response.data?.success) {
        toast.success("Project updated successfully");

        setEditId(null);

        setFormData({
          title: "",
          developerName: "",
          description: "",
          hostedUrl: ""
        });

        getProjects();
      }

    } catch (error) {
      console.log(
        "UPDATE ERROR:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
        "Project update nahi hua"
      );
    }
  };

  return (
    <div className="container mt-5">

      {/* ================= FORM ================= */}

      <h2 className="mb-4">
        {editId ? "Update Project" : "Add Project"}
      </h2>

      <Form>

        <Form.Group className="mb-3">
          <Form.Label>Developer Name</Form.Label>

          <Form.Control
            type="text"
            name="developerName"
            value={formData.developerName}
            onChange={handleChange}
            placeholder="Enter developer name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>

          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter project title"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>

          <Form.Control
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Hosted URL</Form.Label>

          <Form.Control
            type="text"
            name="hostedUrl"
            value={formData.hostedUrl}
            onChange={handleChange}
            placeholder="Enter hosted URL"
          />
        </Form.Group>

        <Button
          variant={editId ? "warning" : "primary"}
          onClick={
            editId
              ? handleUpdateProject
              : handleAddProject
          }
        >
          {editId ? "Update Project" : "Add Project"}
        </Button>

        {editId && (
          <Button
            variant="secondary"
            className="ms-2"
            onClick={() => {
              setEditId(null);

              setFormData({
                title: "",
                developerName: "",
                description: "",
                hostedUrl: ""
              });
            }}
          >
            Cancel
          </Button>
        )}

      </Form>

      {/* ================= PROJECTS ================= */}

      <h2 className="mt-5 mb-4">
        My Projects
      </h2>

      <div className="row">

        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (

          projects.map((project) => (

            <div
              className="col-md-4 mb-4"
              key={project._id}
            >

              <Card>

                <Card.Body>

                  <Card.Title>
                    {project.title}
                  </Card.Title>

                  <Card.Subtitle className="mb-2 text-muted">
                    {project.developerName}
                  </Card.Subtitle>

                  <Card.Text>
                    {project.description}
                  </Card.Text>

                  <a
                    href={project.hostedUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Project
                  </a>

                  <div className="mt-3">

                    <Button
                      variant="warning"
                      className="me-2"
                      onClick={() => handleEdit(project)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() =>
                        handleDeleteProject(project._id)
                      }
                    >
                      Delete
                    </Button>

                  </div>

                </Card.Body>

              </Card>

            </div>

          ))
        )}

      </div>

    </div>
  );
};

export default MyProjects;