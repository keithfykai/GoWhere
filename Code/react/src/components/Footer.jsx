import React from "react";
import { logo } from '../assets';

function Footer(){
    return (
        <footer className="mt-10 bg-white rounded-lg">
            <div className="w-full max-w-screen-xl mx-auto md:py-8">
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <img src={logo} className="h-8" alt="GoWhere Logo" />
                    </a>
                    <div className="flex flex-wrap items-center mb-6 sm:mb-0">
                    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© GoWhere | Designed By CodeCrafters.</span>
                    </div>
                </div>              
            </div>
        </footer>
    )
}


export default Footer;