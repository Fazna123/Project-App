import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const CreateProject = () => {
    const [title, setTitle] = useState('');
    const { currentUser } = useSelector(state => state.user)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title.trim() === '') return;

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/project/`, { title, userId: currentUser._id }, { withCredentials: true });
            // Handle the response or update the project list as needed
            setTitle('');
        } catch (error) {
            console.error('Error creating project', error);
        }
    };

    return (
        <div className='w-full items-center'>
            <h2 className="text-xl text-center font-bold mb-4 text-red-900">Create New Project</h2>
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
    );
};

export default CreateProject;
