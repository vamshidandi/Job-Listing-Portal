import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function ApplicationsPage() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) return;

        const token = localStorage.getItem('access_token');
        if (!token) return;

        fetch(`http://127.0.0.1:8000/applications/${user.user_id}/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) throw new Error('Failed to fetch applications');
                return response.json();
            })
            .then(data => {
                setApplications(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching applications:', err);
                setError('Failed to load applications. Please try again later.');
                setLoading(false);
            });
    }, [user]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'shortlisted':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'accepted':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'rejected':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return '⏳';
            case 'shortlisted':
                return '📋';
            case 'accepted':
                return '✅';
            case 'rejected':
                return '❌';
            default:
                return '📄';
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <header className="border-b bg-white">
                <div className="mx-auto flex max-w-8xl items-center justify-between px-4 py-4 lg:px-8">
                    <h1 className="text-2xl lg:text-3xl font-bold text-blue-700">JobPortal</h1>

                    <nav className="hidden md:flex gap-6 lg:gap-10 text-sm lg:text-base font-medium text-gray-700">
                        <NavLink to="/joblist" className="hover:text-blue-700 transition">Jobs</NavLink>
                        <NavLink to="/companies" className="hover:text-blue-700 transition">Companies</NavLink>
                        <NavLink to="/applications" className="hover:text-blue-700 transition text-blue-700 font-semibold">Applications</NavLink>
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

            {/* Main Content */}
            <main className="mx-auto w-full max-w-8xl px-4 py-8 lg:px-8 lg:py-12 flex-1">
                <div className="mb-8 lg:mb-10">
                    <h2 className="text-2xl lg:text-4xl font-bold">My Applications</h2>
                    <p className="mt-2 text-sm lg:text-base text-gray-500">
                        Track the status of your job applications
                    </p>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-gray-600 font-medium">Loading applications...</p>
                        </div>
                    </div>
                ) : error ? (
                    <div className="text-center py-20">
                        <p className="text-red-600 font-semibold">{error}</p>
                    </div>
                ) : applications.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-lg border">
                        <div className="text-6xl mb-4">📭</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Applications Yet</h3>
                        <p className="text-gray-500 mb-6">You haven't applied to any jobs yet.</p>
                        <NavLink
                            to="/joblist"
                            className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg transition"
                        >
                            Browse Jobs
                        </NavLink>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {applications.map(application => (
                            <div
                                key={application.id}
                                className="bg-white rounded-lg border p-6 lg:p-7 transition hover:shadow-lg hover:border-blue-300"
                            >
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-start gap-3">
                                            <div className="text-3xl">{getStatusIcon(application.status)}</div>
                                            <div className="flex-1">
                                                <h3 className="text-lg lg:text-xl font-semibold text-blue-700">
                                                    {application.job.title}
                                                </h3>
                                                <p className="mt-1 text-sm lg:text-base text-gray-700 font-medium">
                                                    {application.job.company}
                                                </p>
                                                <p className="mt-2 text-sm lg:text-base text-gray-600 line-clamp-2">
                                                    {application.job.About}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex flex-wrap gap-3 text-xs lg:text-sm text-gray-600">
                                            <span className="rounded bg-gray-100 px-3 py-1.5 lg:px-4 lg:py-2">
                                                📍 {application.job.location}
                                            </span>
                                            <span className="rounded bg-gray-100 px-3 py-1.5 lg:px-4 lg:py-2">
                                                💰 {application.job.salary_range}
                                            </span>
                                            <span className="rounded bg-gray-100 px-3 py-1.5 lg:px-4 lg:py-2">
                                                📅 Applied: {new Date(application.applied_at).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-start md:items-end gap-3">
                                        <span className={`px-4 py-2 rounded-full text-sm font-semibold border capitalize ${getStatusColor(application.status)}`}>
                                            {application.status}
                                        </span>
                                        <NavLink
                                            to={`/apply/${application.job.id}`}
                                            className="text-sm lg:text-base font-medium text-blue-700 hover:text-blue-900 hover:underline transition"
                                        >
                                            View Details →
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="border-t bg-white mt-auto">
                <div className="mx-auto max-w-8xl px-4 py-6 lg:px-8 lg:py-8 text-center text-sm lg:text-base text-gray-500">
                    © 2026 JobPortal.com | All rights reserved
                </div>
            </footer>
        </div>
    );
}