import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import swal from 'sweetalert'

export default function ProjectList() {
    const navigate = useNavigate()
    const [projects, setProjects] = useState([]);
    const { currentUser } = useSelector(state => state.user)
    const [title, setTitle] = useState('');
    //const { currentUser } = useSelector(state => state.user)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title.trim() === '') return;

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/project/`, { title, userId: currentUser._id }, { withCredentials: true });
            setProjects([...projects, response.data]);
            setTitle('');
        } catch (error) {
            console.error('Error creating project', error);
        }
    };

    const id = currentUser._id

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/project/${id}`, {
                    withCredentials: true,
                });
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
                swal(error.message)
            }
        };

        fetchProjects();
    }, []);

    const handleViewDetails = (projectId) => {
        console.log(`View details for project ID: ${projectId}`);
        navigate(`/project/${projectId}`)
    };

    const generateMarkdown = (project) => {
        const completedTodos = project.todos.filter(todo => todo.status === 'completed');
        const pendingTodos = project.todos.filter(todo => todo.status === 'Pending');
        return `
# ${project.title}

**Summary:** ${completedTodos.length} / ${project.todos.length} completed.

## Pending Todos
${pendingTodos.map(todo => `- [ ] ${todo.description}`).join('\n')}

## Completed Todos
${completedTodos.map(todo => `- [x] ${todo.description}`).join('\n')}
    `;
    };

    const handleExportGist = async (projectId) => {
        try {
            const projectResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/project/get-project/${projectId} `, {
                withCredentials: true,
            });
            const project = projectResponse.data;


            const markdown = generateMarkdown(project);


            const blob = new Blob([markdown], { type: 'text/markdown' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${project.title}.md`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);


            const gistData = {
                description: `Project Summary: ${project.title} `,
                public: false,
                files: {
                    [`${project.title}.md`]: {
                        content: markdown,
                    },
                },
            };

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/project/create-gist`, { gistData });

            const gistUrl = response.data.html_url;
            await navigator.clipboard.writeText(gistUrl);
            console.log('Gist created:', gistUrl);
            swal("Success", `Gist created and saved locally:${gistUrl}. This url is available in your clipboard. Do paste in your browser to check `, 'success');
        } catch (error) {
            console.error('Error creating gist or saving file:', error);
            swal('Error', 'Error creating gist or saving file', 'error');
        }
    };



    return (
        <div>
            <div className='w-full items-center mb-12 mt-10'>
                {/* <h2 className="text-xl text-center font-bold mb-4 text-red-900">Create New Project</h2> */}
                <form onSubmit={handleSubmit} className="space-y-4 flex flex-row m-auto justify-center">
                    <div className='flex flex-col w-2/3'>
                        <label className="block text-sm font-medium text-gray-700">Project Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter project title"
                        />

                    </div>
                    <button
                        type="submit"
                        className="px-3 ml-3 justify-center align-middle border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-red-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Create Project
                    </button>
                </form>
            </div>
            <h2 className="text-xl text-center text-red-900 font-bold mb-4 mt-6">MY PROJECTS</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                    <div
                        key={project._id}
                        className="bg-red-50 p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200"
                    >
                        <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Created on: {new Date(project.createdAt).toLocaleDateString()}
                        </p>
                        <div className="flex justify-between">
                            <button
                                onClick={() => handleViewDetails(project._id)}
                                className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition-colors duration-200"
                            >
                                Manage
                            </button>
                            <button
                                onClick={() => handleExportGist(project._id)}
                                className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition-colors duration-200"
                            >
                                Export Gist
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
