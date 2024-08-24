import React from 'react'
import ProjectList from '../components/ProjectList'
import CreateProject from '../components/CreateProject'

export default function Home() {
    return (
        <div className='flex flex-col gap-10 p-10 m-auto items-center'>
            {/* <div className='pt-3 w-3/4'><CreateProject /></div> */}
            <div className='pt-3 w-3/4'><ProjectList /></div>

        </div>
    )
}
