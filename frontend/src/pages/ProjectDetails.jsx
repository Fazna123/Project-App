import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProjectDetails() {
    const { id } = useParams();
    console.log(id)
    const [project, setProject] = useState({ title: "", user: "", todos: [] });

    const [newTodoDescription, setNewTodoDescription] = useState('');
    const [editingTodo, setEditingTodo] = useState(null);
    const [editedDescription, setEditedDescription] = useState('');
    const [editingTitle, setEditingTitle] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');

    console.log('API URL:', `${import.meta.env.VITE_BASE_URL}/api/project/${id}`);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/project/get-project/${id}`);
                console.log(response)
                console.log(response.data)
                setProject(response.data);
                setEditedTitle(response.data.title)
            } catch (error) {
                console.log
                console.error('Error fetching project details:', error);
            }
        };

        fetchProjectDetails();
    }, []);

    const handleAddTodo = async () => {
        if (newTodoDescription.trim() === '') return;

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/todo/${id}`, {
                description: newTodoDescription,
                project: id,
            }, { withCredentials: true });
            setProject((prevProject) => ({
                ...prevProject,
                todos: [...prevProject.todos, response.data],
            }));
            setNewTodoDescription('');
        } catch (error) {
            console.error('Error adding new todo:', error);
        }
    };

    const handleDelete = async (todoId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/todo/${todoId}`, { withCredentials: true });
            setProject((prevProject) => ({
                ...prevProject,
                todos: prevProject.todos.filter((todo) => todo._id !== todoId),
            }));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const handleEdit = (todo) => {
        setEditingTodo(todo._id);
        setEditedDescription(todo.description);
    };

    const handleSave = async (todoId) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/todo/${todoId}`, {
                description: editedDescription,
            }, { withCredentials: true });
            setProject((prevProject) => ({
                ...prevProject,
                todos: prevProject.todos.map((todo) =>
                    todo._id === todoId ? { ...todo, description: response.data.description } : todo
                ),
            }));
            setEditingTodo(null);
        } catch (error) {
            console.error('Error saving todo:', error);
        }
    };

    const handleToggleStatus = async (todoId, currentStatus) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/todo/${todoId}`, {
                status: currentStatus === 'completed' ? 'pending' : 'completed',
            }, { withCredentials: true });
            setProject((prevProject) => ({
                ...prevProject,
                todos: prevProject.todos.map((todo) =>
                    todo._id === todoId ? { ...todo, status: response.data.status } : todo
                ),
            }));
        } catch (error) {
            console.error('Error updating todo status:', error);
        }
    };

    const handleEditTitle = () => {
        setEditingTitle(true);
    };

    const handleSaveTitle = async () => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/project/update/${id}`, {
                title: editedTitle,
            }, { withCredentials: true });
            setProject((prevProject) => ({
                ...prevProject,
                title: response.data.title,
            }));
            setEditingTitle(false);
        } catch (error) {
            console.error('Error saving project title:', error);
        }
    };



    if (!project) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto p-4 bg-red-50 shadow-lg rounded-lg mt-10">
            {/* <h2 className="text-3xl font-bold text-gray-800 mb-4">{project.title}</h2> */}
            <div className="flex items-center justify-between space-x-2 mb-4">
                {editingTitle ? (
                    <>
                        <input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            className="border border-gray-300 p-2 rounded w-full"
                        />
                        <button
                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                            onClick={handleSaveTitle}
                        >
                            Save
                        </button>
                    </>
                ) : (
                    <>
                        <h2 className="text-3xl font-bold text-red-800">{editedTitle}</h2>
                        <button
                            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                            onClick={handleEditTitle}
                        >
                            Edit Title
                        </button>
                    </>
                )}
            </div>
            <p className="text-gray-600 mb-6">Created on: {new Date(project.createdAt).toLocaleDateString()}</p>

            <ul className="space-y-4 mb-6">

                {project.todos.length == 0 ? (
                    <li className="text-gray-600">No todos available for this project.</li>
                ) : (
                    project.todos.map((todo) => (
                        <li key={todo._id} className="flex items-center justify-between space-x-3">
                            <div className='flex items-center space-x-3 w-2/3'>
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 text-blue-600"
                                    checked={todo.status === 'completed'}
                                    onChange={() => handleToggleStatus(todo._id, todo.status)}
                                />
                                {editingTodo === todo._id ? (
                                    <input
                                        type="text"
                                        value={editedDescription}
                                        onChange={(e) => setEditedDescription(e.target.value)}
                                        className="border border-gray-300 p-1 rounded w-full"
                                    />
                                ) : (
                                    <span className={`text-gray-700 ${todo.status === 'completed' ? 'line-through' : ''}`}>
                                        {todo.description}
                                    </span>
                                )}
                            </div>
                            <div className='justify-start w-1/3'>
                                {editingTodo === todo._id ? (
                                    <button
                                        className="ml-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                        onClick={() => handleSave(todo._id)}
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        className="ml-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                        onClick={() => handleEdit(todo)}
                                    >
                                        Edit
                                    </button>
                                )}
                                <button
                                    className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    onClick={() => handleDelete(todo._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))
                )}
            </ul>

            {/* Form to add a new todo */}
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    value={newTodoDescription}
                    onChange={(e) => setNewTodoDescription(e.target.value)}
                    placeholder="Enter new todo"
                    className="border border-gray-300 p-2 rounded w-full"
                />
                <button
                    onClick={handleAddTodo}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Add Todo
                </button>
            </div>
        </div>
    );
}
