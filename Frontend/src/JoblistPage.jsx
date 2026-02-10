import React from 'react'
import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function JoblistPage() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/jobs/', {
            credentials: 'include' // Important: send cookies with request
        })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setJobs(data);
                } else if (Array.isArray(data.results)) {
                    setJobs(data.results);
                } else if (Array.isArray(data.data)) {
                    setJobs(data.data);
                } else {
                    setJobs([]);
                    console.error('Unexpected API response:', data);
                }
            })
            .catch(error => console.error('Error fetching jobs:', error));
    }, [])


    return (
        <div className="min-h-screen flex flex-col">
            <header className="border-b bg-white">
                <div className="mx-auto flex max-w-8xl items-center justify-between px-4 py-4 lg:px-8">
                    <h1 className="text-2xl lg:text-3xl font-bold text-blue-700">JobPortal</h1>

                    <nav className="hidden md:flex gap-6 lg:gap-10 text-sm lg:text-base font-medium text-gray-700">
                        <NavLink to="/joblist" className="hover:text-blue-700 transition">Jobs</NavLink>
                        <NavLink to="/companies" className="hover:text-blue-700 transition">Companies</NavLink>
                        <NavLink to="/applications" className="hover:text-blue-700 transition">Applications</NavLink>
                    </nav>

                    <div className="flex items-center gap-4 lg:gap-6">
                        <span className="text-sm lg:text-base text-gray-600">Hello, {user?.username || 'User'}</span>
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 lg:h-10 lg:w-10 items-center justify-center rounded-full bg-blue-700 text-sm font-semibold text-white">
                                {(user?.username || 'U').charAt(0).toUpperCase()}
                            </div>
                            <button
                                onClick={async () => {
                                    await logout();
                                    navigate('/');
                                }}
                                className="px-4 py-2 text-sm lg:text-base font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg transition shadow-md hover:shadow-lg"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>


            <main className="mx-auto w-full max-w-8xl px-4 py-8 lg:px-8 lg:py-12 flex-1">
                <div className="mb-8 lg:mb-10">
                    <h2 className="text-2xl lg:text-4xl font-bold">Recommended Jobs (6+)</h2>
                    <p className="mt-2 text-sm lg:text-base text-gray-500">Jobs based on your profile and preferences</p>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 lg:gap-8">
                    {/* Jobs List Card */}
                    {jobs.length === 0 ? (
                        <p className='text-gray-500 col-span-full text-center py-8'>Loading jobs...</p>) :
                        jobs.map(job => (
                            <div key={job.id} className="rounded-lg border bg-white p-6 lg:p-7 transition hover:shadow-lg hover:border-blue-300">
                                <h3 className="text-lg lg:text-xl font-semibold text-blue-700">{job.title}</h3>
                                <p className="mt-2 text-sm lg:text-base text-gray-700 font-medium">{job.company}</p>
                                <p className="mt-3 text-sm lg:text-base text-gray-600 line-clamp-2">{job.About}</p>
                                <p className="mt-3 text-xs lg:text-sm"><span className="text-blue-700 font-medium">Posted on:</span> <span className="text-gray-600">{new Date(job.posted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span></p>
                                <div className="mt-4 flex flex-wrap gap-3 text-xs lg:text-sm text-gray-600">
                                    <span className="rounded bg-gray-100 px-3 py-1.5 lg:px-4 lg:py-2">📍 {job.location}</span>
                                    <span className="rounded bg-gray-100 px-3 py-1.5 lg:px-4 lg:py-2">💰 {job.salary_range}</span>
                                    <span className="rounded bg-gray-100 px-3 py-1.5 lg:px-4 lg:py-2">🕒 Full Time</span>
                                </div>
                                <div className="mt-5 flex justify-end">
                                    <NavLink to={`/apply/${job.id}`} className="text-sm lg:text-base font-medium text-blue-700 hover:text-blue-900 hover:underline transition">View Details →</NavLink>
                                </div>
                            </div>
                        ))}
                </div>
            </main>


            <footer className="border-t bg-white mt-auto">
                <div className="mx-auto max-w-8xl px-4 py-6 lg:px-8 lg:py-8 text-center text-sm lg:text-base text-gray-500">
                    © 2026 JobPortal.com | All rights reserved
                </div>
            </footer>
        </div >
    )
}