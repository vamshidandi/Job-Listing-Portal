import React, { useActionState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function RegisterPage() {
    const navigate = useNavigate();
    const { register } = useAuth();

    async function registerAction(_, formdata) {
        const username = formdata.get('username');
        const email = formdata.get('email');
        const password = formdata.get('password');
        const password2 = formdata.get('password2');
        const firstName = formdata.get('first_name') || '';
        const lastName = formdata.get('last_name') || '';

        const result = await register(username, email, password, password2, firstName, lastName);

        if (result.success) {
            // Redirect to login on successful registration
            setTimeout(() => {
                navigate('/login');
            }, 1500);
            return result.message || 'Registration successful! Please login.';
        } else {
            // Handle errors
            if (result.errors) {
                const errorMessages = Object.entries(result.errors)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(', ');
                return errorMessages || 'Registration failed. Please try again.';
            }
            return result.message || 'Registration failed. Please try again.';
        }
    }

    const [message, formAction, isPending] = useActionState(registerAction, '')

    return (
        <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
            {/* HEADER */}
            <header className="bg-white border-b">
                <div className="max-w-8xl mx-auto px-4 py-4 lg:px-8 lg:py-6 flex items-center justify-between">
                    <div className="text-2xl lg:text-3xl 2xl:text-4xl font-bold text-blue-700">
                        JobPortal
                    </div>

                    <nav className="hidden md:flex gap-6 lg:gap-10 text-sm lg:text-base font-medium text-gray-700">
                        <NavLink to="/joblist" className="hover:text-blue-700 transition">Jobs</NavLink>
                        <NavLink to="/companies" className="hover:text-blue-700 transition">Companies</NavLink>
                        <NavLink to="/services" className="hover:text-blue-700 transition">Services</NavLink>
                        <NavLink to="/login" className="hover:text-blue-700 transition">Login</NavLink>
                    </nav>
                </div>
            </header>

            {/* MAIN */}
            <main className="max-w-8xl mx-auto w-full px-4 py-12 lg:px-8 lg:py-16 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 flex-1 items-center">
                {/* LEFT INFO */}
                <section className="hidden md:flex flex-col justify-center items-start md:pl-[30%]">
                    <h1 className="text-3xl lg:text-4xl 2xl:text-5xl font-bold leading-snug">
                        Find your dream job now
                    </h1>

                    <p className="mt-6 lg:mt-8 text-base lg:text-lg text-gray-600 max-w-md">
                        Register with JobPortal and get matched with the right opportunities.
                        Build your profile and apply to jobs in top companies.
                    </p>

                    <ul className="mt-8 lg:mt-10 space-y-4 text-sm lg:text-base text-gray-700">
                        <li className="flex items-center gap-3"><span className="text-lg lg:text-xl">✔</span> Trusted by thousands of recruiters</li>
                        <li className="flex items-center gap-3"><span className="text-lg lg:text-xl">✔</span> Personalized job recommendations</li>
                        <li className="flex items-center gap-3"><span className="text-lg lg:text-xl">✔</span> Easy apply & profile visibility</li>
                    </ul>
                </section>

                {/* RIGHT FORM */}
                <section className="flex items-center justify-center w-full">
                    <div className="w-full bg-white border rounded-lg p-8 lg:p-10 max-w-124 shadow-sm">
                        <h2 className="text-2xl lg:text-3xl font-bold text-blue-700 text-center">
                            Create your profile
                        </h2>

                        <p className="text-sm lg:text-base text-gray-500 text-center mt-2">
                            Search & apply to jobs from India's top companies
                        </p>

                        <form action={formAction} className="mt-8 lg:mt-10 space-y-5">
                            {/* Username */}
                            <div>
                                <label
                                    htmlFor="username"
                                    className="block text-sm lg:text-base font-medium text-gray-700 mb-2"
                                >
                                    Username
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    autoComplete="username"
                                    placeholder="Enter username"
                                    className="w-full rounded border border-gray-300 px-4 lg:px-5 py-2.5 lg:py-3 text-sm lg:text-base focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm lg:text-base font-medium text-gray-700 mb-2"
                                >
                                    Email ID
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    placeholder="Enter email"
                                    className="w-full rounded border border-gray-300 px-4 lg:px-5 py-2.5 lg:py-3 text-sm lg:text-base focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm lg:text-base font-medium text-gray-700 mb-2"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    autoComplete="new-password"
                                    placeholder="Minimum 8 characters"
                                    className="w-full rounded border border-gray-300 px-4 lg:px-5 py-2.5 lg:py-3 text-sm lg:text-base focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label
                                    htmlFor="password2"
                                    className="block text-sm lg:text-base font-medium text-gray-700 mb-2"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    id="password2"
                                    type="password"
                                    name="password2"
                                    autoComplete="new-password"
                                    placeholder="Re-enter your password"
                                    className="w-full rounded border border-gray-300 px-4 lg:px-5 py-2.5 lg:py-3 text-sm lg:text-base focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition"
                                />
                            </div>

                            {/* CTA */}
                            <button
                                disabled={isPending}
                                type="submit"
                                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 lg:py-3 text-sm lg:text-base rounded transition duration-200"
                            >
                                {isPending ? 'Registering...' : 'Register Now'}
                            </button>

                            <p className="text-center text-sm lg:text-base text-gray-600 min-h-5">
                                {message}
                            </p>

                            <p className="text-sm lg:text-base text-gray-500 text-center border-t pt-6">
                                By registering, you agree to our
                                <a href="#" className="text-blue-700 hover:text-blue-900 hover:underline transition">
                                    {' '}Terms & Conditions
                                </a>
                            </p>

                            <p className="text-sm lg:text-base text-center text-gray-600">
                                Already registered?
                                <NavLink to="/login/" className="text-blue-700 font-medium hover:text-blue-900 hover:underline transition">
                                    {' '}Login here
                                </NavLink>
                            </p>
                        </form>
                    </div>
                </section>
            </main>

            {/* FOOTER */}
            <footer className="border-t bg-white mt-auto">
                <div className="max-w-8xl mx-auto px-4 py-6 lg:px-8 lg:py-8 text-center text-sm lg:text-base text-gray-500">
                    © 2026 JobPortal.com | All rights reserved
                </div>
            </footer>
        </div>
    )
}