import React from "react";

function Features(){
    return (
        <section class="bg-gray-900 grid place-items-center">
            <div class="py-8 px-4 mx-14 max-w-screen-xl sm:py-16 lg:px-6">
                <div class="mb-8 lg:mb-16">
                    <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 text-white">The Best Singaporean Location Suggestion Tool 
✨</h2>
                    <p class="text-gray-500 sm:text-xl dark:text-gray-400">GoWhere uses your Current Location to help you suggest a Location based on a short quiz to determine your preference of activity.</p>
                </div>
                <div class="space-y-8 space-x-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                    <div>
                        <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                            <svg class="w-6 h-6 text-gray-800 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 17.3a5 5 0 0 0 2.6 1.7c2.2.6 4.5-.5 5-2.3.4-2-1.3-4-3.6-4.5-2.3-.6-4-2.7-3.5-4.5.5-1.9 2.7-3 5-2.3 1 .2 1.8.8 2.5 1.6m-3.9 12v2m0-18v2.2"/>
  </svg>
                        </div>
                        <h3 class="mb-2 text-xl font-bold text-white">Free and Easy to Use</h3>
                        <p class="text-gray-500 text-gray-400">GoWhere is completely free to use with no ads, all you need is an account.</p>
                    </div>
                    <div>
                        <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                        <svg class="w-6 h-6 text-gray-800 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 0v6M9.5 9A2.5 2.5 0 0 1 12 6.5"/>
  </svg>
                        </div>
                        <h3 class="mb-2 text-xl font-bold text-white">Bird's Eye View</h3>
                        <p class="text-gray-500 text-gray-400">Built using Mapbox's gorgeous and intuitive Map, used by professional companies worldwide.</p>
                    </div>
                    <div>
                        <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                        <svg class="w-6 h-6 text-gray-800 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path fill-rule="evenodd" d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7c0-1.1.9-2 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6c.6 0 1 .4 1 1v3a1 1 0 1 1-2 0v-3c0-.6.4-1 1-1Z" clip-rule="evenodd"/>
  </svg>
                        </div>
                        <h3 class="mb-2 text-xl font-bold text-white">Trustworthy</h3>
                        <p class="text-gray-500 text-gray-400">Reviews and Ratings are pulled from Google Places API and use the input from millions of users all around the globe.</p>
                    </div>
                    <div>
                        <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                        <svg class="w-6 h-6 text-gray-800 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="m12.7 20.7 6.2-7.1c2.7-3 2.6-6.5.8-8.7A5 5 0 0 0 16 3c-1.3 0-2.7.4-4 1.4A6.3 6.3 0 0 0 8 3a5 5 0 0 0-3.7 1.9c-1.8 2.2-2 5.8.8 8.7l6.2 7a1 1 0 0 0 1.4 0Z"/>
  </svg>
                        </div>
                        <h3 class="mb-2 text-xl font-bold text-white">Tailored to your Needs</h3>
                        <p class="text-gray-500 text-gray-400">GoWhere uses your location along with your proximity preference to find places of interests near you.</p>
                    </div>
                    <div>
                        <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                        <svg class="w-6 h-6 text-gray-800 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M10.8 5a3 3 0 0 0-5.6 0H4a1 1 0 1 0 0 2h1.2a3 3 0 0 0 5.6 0H20a1 1 0 1 0 0-2h-9.2ZM4 11h9.2a3 3 0 0 1 5.6 0H20a1 1 0 1 1 0 2h-1.2a3 3 0 0 1-5.6 0H4a1 1 0 1 1 0-2Zm1.2 6H4a1 1 0 1 0 0 2h1.2a3 3 0 0 0 5.6 0H20a1 1 0 1 0 0-2h-9.2a3 3 0 0 0-5.6 0Z"/>
  </svg>
                        </div>
                        <h3 class="mb-2 text-xl font-bold text-white">Vast Search</h3>
                        <p class="text-gray-500 text-gray-400">Narrow down your search by Category, Budget and Proximity.</p>
                    </div>
                    <div>
                        <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                        <svg class="w-6 h-6 text-gray-800 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M11 21V2.4a3.5 3.5 0 0 0-4.8 1.8A3.5 3.5 0 0 0 4 8l-.7 1.1-.1.4-.1.3a3.5 3.5 0 0 0 0 1.5A3.9 3.9 0 0 0 2 14v.9l.2.6a3.8 3.8 0 0 0 1 1.4 4 4 0 0 0 .6.5v.1A3.5 3.5 0 0 0 7 21a3.4 3.4 0 0 0 4.2.5 1 1 0 0 1-.2-.5Zm11-7.7v-.1a4 4 0 0 0-1-2 3.4 3.4 0 0 0-.2-1.7V9c-.3-.4-.5-.8-.8-1a3.4 3.4 0 0 0-.6-2.6 4 4 0 0 0-1.6-1.3A3.5 3.5 0 0 0 13 2.4V21c0 .2 0 .4-.2.5A3.4 3.4 0 0 0 17 21a3.5 3.5 0 0 0 3-3.5 5.4 5.4 0 0 0 .7-.5 4.2 4.2 0 0 0 .7-.9l.3-.5.2-.7v-.2a4 4 0 0 0 0-1.4Z"/>
  </svg>
                        </div>
                        <h3 class="mb-2 text-xl font-bold text-white">Powered by Google and the Government</h3>
                        <p class="text-gray-500 text-gray-400">GoWhere utilises Google's Places API for Trustworthy and Real reviews pulled right from Google Maps and the weather right from Gov API for reliable weather updates.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features;