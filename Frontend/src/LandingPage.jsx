import React from 'react';
import { NavLink } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col bg-linear-to-br from-blue-50 via-white to-indigo-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
                <div className="max-w-8xl mx-auto px-4 py-4 lg:px-8 lg:py-5 flex items-center justify-between">
                    <div className="text-2xl lg:text-3xl 2xl:text-4xl font-bold bg-linear-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                        JobPortal
                    </div>

                    <nav className="hidden md:flex gap-6 lg:gap-10 text-sm lg:text-base font-medium text-gray-700">
                        <a href="#features" className="hover:text-blue-700 transition">Features</a>
                        <a href="#how-it-works" className="hover:text-blue-700 transition">How It Works</a>
                        <a href="#stats" className="hover:text-blue-700 transition">About</a>
                    </nav>

                    <div className="flex items-center gap-3 lg:gap-4">
                        <NavLink
                            to="/login"
                            className="px-4 lg:px-6 py-2 lg:py-2.5 text-sm lg:text-base font-semibold text-blue-700 hover:text-blue-900 transition"
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/register"
                            className="px-4 lg:px-6 py-2 lg:py-2.5 text-sm lg:text-base font-semibold bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition shadow-md hover:shadow-lg"
                        >
                            Sign Up
                        </NavLink>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="flex-1 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-40 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

                <div className="max-w-8xl mx-auto px-4 py-16 lg:px-8 lg:py-24 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Left Content */}
                        <div className="text-center lg:text-left">
                            <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                                🚀 Your Career Starts Here
                            </div>

                            <h1 className="text-4xl lg:text-5xl 2xl:text-6xl font-bold leading-tight mb-6">
                                Find Your <span className="bg-linear-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">Dream Job</span> Today
                            </h1>

                            <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                                Connect with top companies, discover exciting opportunities, and take the next step in your career journey with JobPortal.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <NavLink
                                    to="/register"
                                    className="px-8 py-4 text-base lg:text-lg font-bold bg-linear-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                                >
                                    Get Started Free
                                </NavLink>
                                <NavLink
                                    to="/joblist"
                                    className="px-8 py-4 text-base lg:text-lg font-bold bg-white hover:bg-gray-50 text-blue-700 rounded-xl transition-all border-2 border-blue-700 shadow-md hover:shadow-lg"
                                >
                                    Browse Jobs
                                </NavLink>
                            </div>

                            {/* Quick Stats */}
                            <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0">
                                <div className="text-center lg:text-left">
                                    <div className="text-3xl lg:text-4xl font-bold text-blue-700">10K+</div>
                                    <div className="text-sm text-gray-600 mt-1">Active Jobs</div>
                                </div>
                                <div className="text-center lg:text-left">
                                    <div className="text-3xl lg:text-4xl font-bold text-blue-700">500+</div>
                                    <div className="text-sm text-gray-600 mt-1">Companies</div>
                                </div>
                                <div className="text-center lg:text-left">
                                    <div className="text-3xl lg:text-4xl font-bold text-blue-700">50K+</div>
                                    <div className="text-sm text-gray-600 mt-1">Job Seekers</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Content - Illustration/Image Placeholder */}
                        <div className="relative hidden lg:block">
                            <div className="relative bg-linear-to-br from-blue-600 to-indigo-600 rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                                <div className="bg-white rounded-2xl p-6 space-y-4">
                                    {/* Mock Job Card */}
                                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                                            G
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900">Senior Developer</h3>
                                            <p className="text-sm text-gray-600">Google Inc.</p>
                                            <div className="flex gap-2 mt-2">
                                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Remote</span>
                                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Full-time</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                        <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                                            M
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900">Product Manager</h3>
                                            <p className="text-sm text-gray-600">Microsoft</p>
                                            <div className="flex gap-2 mt-2">
                                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Hybrid</span>
                                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Full-time</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                        <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                                            A
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900">UX Designer</h3>
                                            <p className="text-sm text-gray-600">Apple</p>
                                            <div className="flex gap-2 mt-2">
                                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">On-site</span>
                                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Full-time</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-16 lg:py-24 bg-white">
                <div className="max-w-8xl mx-auto px-4 lg:px-8">
                    <div className="text-center mb-12 lg:mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Choose JobPortal?</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Everything you need to find your perfect job in one place
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="p-8 bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 hover:shadow-xl transition-shadow">
                            <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center text-white text-2xl mb-4">
                                🎯
                            </div>
                            <h3 className="text-xl font-bold mb-3">Smart Job Matching</h3>
                            <p className="text-gray-600">
                                Our AI-powered algorithm matches you with jobs that fit your skills, experience, and career goals.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-8 bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 hover:shadow-xl transition-shadow">
                            <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center text-white text-2xl mb-4">
                                ⚡
                            </div>
                            <h3 className="text-xl font-bold mb-3">Quick Apply</h3>
                            <p className="text-gray-600">
                                Apply to multiple jobs with just one click. Save time and increase your chances of landing your dream job.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-8 bg-linear-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 hover:shadow-xl transition-shadow">
                            <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center text-white text-2xl mb-4">
                                🏢
                            </div>
                            <h3 className="text-xl font-bold mb-3">Top Companies</h3>
                            <p className="text-gray-600">
                                Connect with leading companies across industries. Get access to exclusive job opportunities.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="p-8 bg-linear-to-br from-orange-50 to-red-50 rounded-2xl border border-orange-100 hover:shadow-xl transition-shadow">
                            <div className="w-14 h-14 bg-orange-600 rounded-xl flex items-center justify-center text-white text-2xl mb-4">
                                📊
                            </div>
                            <h3 className="text-xl font-bold mb-3">Track Applications</h3>
                            <p className="text-gray-600">
                                Monitor your application status in real-time. Stay updated on every step of the hiring process.
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="p-8 bg-linear-to-br from-cyan-50 to-blue-50 rounded-2xl border border-cyan-100 hover:shadow-xl transition-shadow">
                            <div className="w-14 h-14 bg-cyan-600 rounded-xl flex items-center justify-center text-white text-2xl mb-4">
                                💼
                            </div>
                            <h3 className="text-xl font-bold mb-3">Career Resources</h3>
                            <p className="text-gray-600">
                                Access resume tips, interview guides, and career advice from industry experts.
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="p-8 bg-linear-to-br from-yellow-50 to-amber-50 rounded-2xl border border-yellow-100 hover:shadow-xl transition-shadow">
                            <div className="w-14 h-14 bg-yellow-600 rounded-xl flex items-center justify-center text-white text-2xl mb-4">
                                🔔
                            </div>
                            <h3 className="text-xl font-bold mb-3">Job Alerts</h3>
                            <p className="text-gray-600">
                                Get notified instantly when new jobs matching your preferences are posted.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-16 lg:py-24 bg-linear-to-br from-gray-50 to-blue-50">
                <div className="max-w-8xl mx-auto px-4 lg:px-8">
                    <div className="text-center mb-12 lg:mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">How It Works</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Get started in just 3 simple steps
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                        {/* Step 1 */}
                        <div className="relative text-center">
                            <div className="w-20 h-20 bg-linear-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-lg">
                                1
                            </div>
                            <h3 className="text-xl font-bold mb-3">Create Your Profile</h3>
                            <p className="text-gray-600">
                                Sign up and build your professional profile in minutes. Highlight your skills and experience.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="relative text-center">
                            <div className="w-20 h-20 bg-linear-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-lg">
                                2
                            </div>
                            <h3 className="text-xl font-bold mb-3">Search & Apply</h3>
                            <p className="text-gray-600">
                                Browse thousands of jobs and apply to positions that match your career goals.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="relative text-center">
                            <div className="w-20 h-20 bg-linear-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-lg">
                                3
                            </div>
                            <h3 className="text-xl font-bold mb-3">Get Hired</h3>
                            <p className="text-gray-600">
                                Connect with employers, ace your interviews, and land your dream job.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 lg:py-24 bg-linear-to-r from-blue-700 to-indigo-700 text-white">
                <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
                    <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                        Ready to Start Your Journey?
                    </h2>
                    <p className="text-lg lg:text-xl mb-8 text-blue-100">
                        Join thousands of job seekers who found their dream careers through JobPortal
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <NavLink
                            to="/register"
                            className="px-8 py-4 text-base lg:text-lg font-bold bg-white hover:bg-gray-100 text-blue-700 rounded-xl transition-all transform hover:scale-105 shadow-lg"
                        >
                            Create Free Account
                        </NavLink>
                        <NavLink
                            to="/joblist"
                            className="px-8 py-4 text-base lg:text-lg font-bold bg-transparent hover:bg-white/10 text-white rounded-xl transition-all border-2 border-white"
                        >
                            Explore Jobs
                        </NavLink>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t bg-white">
                <div className="max-w-8xl mx-auto px-4 py-8 lg:px-8 lg:py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-blue-700 mb-4">JobPortal</h3>
                            <p className="text-gray-600 text-sm">
                                Your trusted partner in finding the perfect career opportunity.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">For Job Seekers</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><NavLink to="/joblist" className="hover:text-blue-700">Browse Jobs</NavLink></li>
                                <li><NavLink to="/register" className="hover:text-blue-700">Create Profile</NavLink></li>
                                <li><a href="#" className="hover:text-blue-700">Career Advice</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><a href="#" className="hover:text-blue-700">About Us</a></li>
                                <li><a href="#" className="hover:text-blue-700">Contact</a></li>
                                <li><a href="#" className="hover:text-blue-700">Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Connect</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><a href="#" className="hover:text-blue-700">LinkedIn</a></li>
                                <li><a href="#" className="hover:text-blue-700">Twitter</a></li>
                                <li><a href="#" className="hover:text-blue-700">Facebook</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t pt-6 text-center text-sm text-gray-500">
                        © 2026 JobPortal.com | All rights reserved
                    </div>
                </div>
            </footer>

            <style jsx>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
}