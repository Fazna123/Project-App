import React, { useState } from 'react'

export default function ProjectList() {

    const [projects, setProjects] = useState([])
    return (
        <div>
            <h2 className='text-xl font-bold mb-4'>Your Projects</h2>
            <ul>
                {projects.map(project => (
                    <li>
                        <span>{project.title}</span>
                        <button>View Details</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
