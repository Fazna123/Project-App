import React from 'react'
import ProjectList from '../components/ProjectList'
import CreateProject from '../components/CreateProject'

export default function Home() {
    return (
        <div className='flex flex-col md:flex-row gap-6 p-4'>
            <div className='md:w-2/4'><ProjectList /></div>
            <div className='md:w-2/4'><CreateProject /></div>
        </div>
    )
}
