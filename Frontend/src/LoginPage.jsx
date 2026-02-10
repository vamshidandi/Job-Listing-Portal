import React from 'react'
import { useActionState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    async function LoginAction(_, formdata) {
        const username = formdata.get('username');
        const password = formdata.get('password');

        const result = await login(username, password);

        if (result.success) {
            // Redirect to job list on successful login
            setTimeout(() => {
                navigate('/joblist');
            }, 1000);
            return result.message || 'Login successful';
        } else {
            return result.message || 'Login failed. Please try again.';
        }
    }

    const [message, formAction, isPending] = useActionState(LoginAction, '')
    return (
        <div>
            <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">

                <header className="bg-white border-b">
                    <div className="max-w-8xl mx-auto px-4 py-4 lg:px-8 lg:py-6 flex items-center justify-between">
                        <div className="text-2xl lg:text-3xl 2xl:text-4xl font-bold text-blue-700">
                            JobPortal
                        </div>

                        <nav className="hidden md:flex gap-6 lg:gap-10 text-sm lg:text-base font-medium text-gray-700">
                            <NavLink to="/joblist" className="hover:text-blue-700 transition">Jobs</NavLink>
                            <NavLink to="/companies" className="hover:text-blue-700 transition">Companies</NavLink>
                            <NavLink to="/services" className="hover:text-blue-700 transition">Services</NavLink>
                            <NavLink to="/register" className="hover:text-blue-700 transition">Register</NavLink>
                        </nav>
                    </div>
                </header>

                <main className="max-w-8xl mx-auto w-full px-4 py-12 lg:px-8 lg:py-16 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 flex-1 items-center">

                    <section className="hidden md:flex flex-col justify-center items-start md:pl-[30%]">
                        <h1 className="text-3xl lg:text-4xl 2xl:text-5xl font-bold leading-snug">
                            Find your dream job now
                        </h1>

                        <p className="mt-6 lg:mt-8 text-base lg:text-lg text-gray-600 max-w-md">
                            Login to JobPortal and get matched with the right opportunities.
                            Build your profile and apply to jobs in top companies.
                        </p>

                        <ul className="mt-8 lg:mt-10 space-y-4 text-sm lg:text-base text-gray-700">
                            <li className="flex items-center gap-3"><span className="text-lg lg:text-xl">✔</span> Trusted by thousands of recruiters</li>
                            <li className="flex items-center gap-3"><span className="text-lg lg:text-xl">✔</span> Personalized job recommendations</li>
                            <li className="flex items-center gap-3"><span className="text-lg lg:text-xl">✔</span> Easy apply & profile visibility</li>
                        </ul>
                    </section>

                    <section className="flex items-center justify-center w-full">
                        <div className="w-full bg-white border rounded-lg p-8 lg:p-10 max-w-124 shadow-sm">
                            <h1 className="text-2xl lg:text-3xl font-bold text-blue-700 text-center">
                                JobPortal
                            </h1>
                            <p className="text-sm lg:text-base text-gray-500 text-center mt-2">
                                Login to your account
                            </p>

                            <form action={formAction} className="mt-8 lg:mt-10 space-y-6">

                                <div>
                                    <label className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
                                        Username
                                    </label>
                                    <input type="text" name="username" placeholder="Enter your username" className="w-full rounded border border-gray-300 px-4 lg:px-5 py-2.5 lg:py-3 text-sm lg:text-base
                                            focus:border-blue-600 focus:ring-2 focus:ring-blue-200
                                            outline-none transition" />
                                </div>

                                <div>
                                    <label className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <input type="password" name="password" placeholder="Enter your password" className="w-full rounded border border-gray-300 px-4 lg:px-5 py-2.5 lg:py-3 text-sm lg:text-base
                                            focus:border-blue-600 focus:ring-2 focus:ring-blue-200
                                            outline-none transition" />
                                </div>

                                <div className="text-right">
                                    <a href="#" className="text-sm lg:text-base text-blue-700 hover:text-blue-900 hover:underline transition">
                                        Forgot Password?
                                    </a>
                                </div>

                                <button disabled={isPending} type="submit" className="w-full bg-blue-700 hover:bg-blue-800
                                            text-white font-semibold py-2.5 lg:py-3 text-sm lg:text-base rounded transition duration-200">
                                    {isPending ? 'Logging in...' : 'Login Now'}
                                </button>

                                <p className="text-center text-sm lg:text-base text-gray-600 min-h-5">
                                    {message}
                                </p>

                                <p className="text-sm lg:text-base text-center text-gray-600 border-t pt-6">
                                    New to JobPortal?
                                    <NavLink to="/register" className="text-blue-700 font-medium hover:text-blue-900 hover:underline transition">
                                        {' '}Register here
                                    </NavLink>
                                </p>
                            </form>
                        </div>
                    </section>

                </main>

                <footer className="border-t bg-white mt-auto">
                    <div className="max-w-8xl mx-auto px-4 py-6 lg:px-8 lg:py-8 text-center text-sm lg:text-base text-gray-500">
                        © 2026 JobPortal.com | All rights reserved
                    </div>
                </footer>
            </div>
        </div>
    )
}