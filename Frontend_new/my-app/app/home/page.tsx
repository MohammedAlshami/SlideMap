'use client';
import Image from 'next/image'
import { Accordion, } from 'react-daisyui'

import Navbar from '@/components/navbar';
export default function Home() {
  const args = {
    // Add your desired props here
    // For example: prop1: value1, prop2: value2, ...
    defaultChecked: true,
  };

  return (
    <>

      <div className='h-screen flex flex-col justify-between'>

      <Navbar></Navbar>


        <section>
          <div className="dark:bg-violet-400">
            <div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 dark:text-gray-900">
              <h1 className="text-5xl font-bold leadi sm:text-6xl xl:max-w-3xl dark:text-gray-900">Landslide Detection Like No Before</h1>
              <p className="mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl dark:text-gray-900">Cupiditate minima voluptate temporibus quia? Architecto beatae esse ab amet vero eaque explicabo!</p>
              <div className="flex flex-wrap justify-center">
                <button type="button" className="px-8 py-3 m-2 text-lg font-semibold rounded dark:bg-gray-800 dark:text-gray-50">Get started</button>
                <button type="button" className="px-8 py-3 m-2 text-lg border rounded dark:border-gray-700 dark:text-gray-900">Learn more</button>
              </div>
            </div>
          </div>

          <div className='w-8/12 mx-auto mb-12 -mt-20 rounded-lg shadow-md lg:-mt-40 dark:bg-gray-500'>
            <div className="diff aspect-[16/9]">
              <div className="diff-item-1">
                <img alt="daisy" src="https://media.licdn.com/dms/image/D4D12AQEMHhdfnoWnJA/article-cover_image-shrink_720_1280/0/1680375976698?e=2147483647&v=beta&t=v-KxaqI8c33TXF5UsZ_s6fxsSsR_1PjHb3PktyHKPUA" />
              </div>
              <div className="diff-item-2">
                <img alt="daisy" src="images/landslide_segmented.png" />
              </div>
              <div className="diff-resizer"></div>
            </div>
          </div>
        </section>

      <section>
        <Statistic></Statistic>
      </section>

        <section>
          <div className="hero min-h-screen ">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <img src="https://source.unsplash.com/random/480x320" className="max-w-sm rounded-lg shadow-2xl ml-44" />
              <div>
                <h1 className="text-5xl font-bold">Box Office News!</h1>
                <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                <button className="btn btn-primary">Get Started</button>
              </div>
            </div>
          </div>
        </section>

        <section className='pt-20 pb-20'>
          <Feature></Feature>
        </section>

        <section>
          <Blog></Blog>
        </section>

        <div className='bg-gray-800 pt-20 pb-20'>
          <div className='flex justify-center'>
            <h2 className='text-white text-4xl pb-20'> Features Implementation</h2>
          </div>
          <div className="max-w-xl p-8 mx-auto  text-gray-100">
            <ul className="space-y-12">
              <li className="flex items-start space-x-3">
                <a rel="noopener noreferrer" href="#" className="flex items-center h-8 text-sm hover:underline">v3.2.0</a>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between space-x-4 text-gray-400">
                    <a rel="noopener noreferrer" href="#" className="inline-flex items-center px-3 py-1 my-1 space-x-2 text-sm border rounded-full group border-gray-700">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-violet-400"></span>
                      <span className="group-hover:underline text-gray-100">Feature</span>
                    </a>
                    <span className="text-xs whitespace-nowrap">10h ago</span>
                  </div>
                  <div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. Scelerisque amet elit non sit ut tincidunt condimentum. Nisl ultrices eu venenatis diam.</p>
                  </div>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <a rel="noopener noreferrer" href="#" className="flex items-center h-8 text-sm hover:underline">v3.1.9</a>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between space-x-4 text-gray-400">
                    <a rel="noopener noreferrer" href="#" className="inline-flex items-center px-3 py-1 my-1 space-x-2 text-sm border rounded-full group border-gray-700">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-violet-400"></span>
                      <span className="group-hover:underline text-gray-100">Bugfix</span>
                    </a>
                    <span className="text-xs whitespace-nowrap">2 weeks ago</span>
                  </div>
                  <div className="space-y-2">
                    <p>Scelerisque amet elit non sit ut tincidunt condimentum. Nisi ultrices eu venenatis diam.</p>
                    <p>Illum quaerat ab inventore, eveniet repudiandae saepe, iste sed molestias laborum atque, quos reprehenderit fugit cumo!</p>
                  </div>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <a rel="noopener noreferrer" href="#" className="flex items-center h-8 text-sm hover:underline">v3.1.9</a>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between space-x-4 text-gray-400">
                    <a rel="noopener noreferrer" href="#" className="inline-flex items-center px-3 py-1 my-1 space-x-2 text-sm border rounded-full group border-gray-700">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-violet-400"></span>
                      <span className="group-hover:underline text-gray-100">Bugfix</span>
                    </a>
                    <span className="text-xs whitespace-nowrap">2 weeks ago</span>
                  </div>
                  <div className="space-y-2">
                    <p>Scelerisque amet elit non sit ut tincidunt condimentum. Nisi ultrices eu venenatis diam.</p>
                    <p>Illum quaerat ab inventore, eveniet repudiandae saepe, iste sed molestias laborum atque, quos reprehenderit fugit cumo!</p>
                  </div>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <a rel="noopener noreferrer" href="#" className="flex items-center h-8 text-sm hover:underline">v3.1.9</a>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between space-x-4 text-gray-400">
                    <a rel="noopener noreferrer" href="#" className="inline-flex items-center px-3 py-1 my-1 space-x-2 text-sm border rounded-full group border-gray-700">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-violet-400"></span>
                      <span className="group-hover:underline text-gray-100">Bugfix</span>
                    </a>
                    <span className="text-xs whitespace-nowrap">2 weeks ago</span>
                  </div>
                  <div className="space-y-2">
                    <p>Scelerisque amet elit non sit ut tincidunt condimentum. Nisi ultrices eu venenatis diam.</p>
                    <p>Illum quaerat ab inventore, eveniet repudiandae saepe, iste sed molestias laborum atque, quos reprehenderit fugit cumo!</p>
                  </div>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <a rel="noopener noreferrer" href="#" className="flex items-center h-8 text-sm hover:underline">v3.1.9</a>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between space-x-4 text-gray-400">
                    <a rel="noopener noreferrer" href="#" className="inline-flex items-center px-3 py-1 my-1 space-x-2 text-sm border rounded-full group border-gray-700">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-violet-400"></span>
                      <span className="group-hover:underline text-gray-100">Bugfix</span>
                    </a>
                    <span className="text-xs whitespace-nowrap">2 weeks ago</span>
                  </div>
                  <div className="space-y-2">
                    <p>Scelerisque amet elit non sit ut tincidunt condimentum. Nisi ultrices eu venenatis diam.</p>
                    <p>Illum quaerat ab inventore, eveniet repudiandae saepe, iste sed molestias laborum atque, quos reprehenderit fugit cumo!</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <footer className="footer footer-center p-10 bg-primary text-primary-content">
          <aside>
            <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className="inline-block fill-current"><path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path></svg>
            <p className="font-bold">
              ACME Industries Ltd. <br />Providing reliable tech since 1992
            </p>
            <p>Copyright © 2023 - All right reserved</p>
          </aside>
          <nav>
            <div className="grid grid-flow-col gap-4">
              <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
              <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
              <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
            </div>
          </nav>
        </footer>
      </div>



    </>

  )
}

export const Header = () => {
  return (
    <div className="relative px-4 pt-16 mx-auto lg:py-32 md:px-8 xl:px-20 sm:max-w-xl md:max-w-full">
      <div className="max-w-xl mx-auto lg:max-w-screen-xl">
        <div className="mb-16 lg:max-w-lg lg:mb-0">
          <div className="max-w-xl mb-6">
            <div>
              <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                Brand new
              </p>
            </div>
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
              The quick, brown fox
              <br className="hidden md:block" />
              jumps over{' '}
              <span className="inline-block text-deep-purple-accent-400">
                a lazy dog
              </span>
            </h2>
            <p className="text-base text-gray-700 md:text-lg">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae. explicabo.
            </p>
          </div>
          <div className="flex items-center">
            <a
              href="/"
              className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
            >
              Get started
            </a>
            <a
              href="/"
              aria-label=""
              className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
      <div className="flex justify-center h-full overflow-hidden lg:w-2/3 xl:w-1/2 lg:absolute lg:justify-start lg:bottom-0 lg:right-0 lg:items-end">

        <div className="diff aspect-[16/9]">
          <div className="diff-item-1">
            <img alt="daisy" src="https://media.licdn.com/dms/image/D4D12AQEMHhdfnoWnJA/article-cover_image-shrink_720_1280/0/1680375976698?e=2147483647&v=beta&t=v-KxaqI8c33TXF5UsZ_s6fxsSsR_1PjHb3PktyHKPUA" />
          </div>
          <div className="diff-item-2">
            <img alt="daisy" src="images/landslide_segmented.png" />
          </div>
          <div className="diff-resizer"></div>
        </div>
      </div>
    </div>
  );
};


export const Feature = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <div>
          <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
            Brand new
          </p>
        </div>
        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          <span className="relative inline-block">
            <svg
              viewBox="0 0 52 24"
              fill="currentColor"
              className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
            >
              <defs>
                <pattern
                  id="ea469ae8-e6ec-4aca-8875-fc402da4d16e"
                  x="0"
                  y="0"
                  width=".135"
                  height=".30"
                >
                  <circle cx="1" cy="1" r=".7" />
                </pattern>
              </defs>
              <rect
                fill="url(#ea469ae8-e6ec-4aca-8875-fc402da4d16e)"
                width="52"
                height="24"
              />
            </svg>
            <span className="relative">The</span>
          </span>{' '}
          What makes SlideMap different than other landslide mapping?
        </h2>
        <p className="text-base text-gray-700 md:text-lg">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque rem aperiam, eaque ipsa quae.
        </p>
      </div>
      <div className="grid gap-8 row-gap-10 lg:grid-cols-2">
        <div className="max-w-md sm:mx-auto sm:text-center">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
            <svg
              className="w-12 h-12 text-deep-purple-accent-400 sm:w-16 sm:h-16"
              stroke="currentColor"
              viewBox="0 0 52 52"
            >
              <polygon
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                points="29 13 14 29 25 29 23 39 38 23 27 23"
              />
            </svg>
          </div>
          <h6 className="mb-3 text-xl font-bold leading-5">The deep ocean</h6>
          <p className="mb-3 text-sm text-gray-900">
            A flower in my garden, a mystery in my panties. Heart attack never
            stopped old Big Bear. I didn't even know we were calling him Big
            Bear. We never had the chance to.
          </p>
          <a
            href="/"
            aria-label=""
            className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
          >
            Learn more
          </a>
        </div>
        <div className="max-w-md sm:mx-auto sm:text-center">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
            <svg
              className="w-12 h-12 text-deep-purple-accent-400 sm:w-16 sm:h-16"
              stroke="currentColor"
              viewBox="0 0 52 52"
            >
              <polygon
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                points="29 13 14 29 25 29 23 39 38 23 27 23"
              />
            </svg>
          </div>
          <h6 className="mb-3 text-xl font-bold leading-5">When has justice</h6>
          <p className="mb-3 text-sm text-gray-900">
            Rough pomfret lemon shark plownose chimaera southern sandfish
            kokanee northern sea robin Antarctic cod. Yellow-and-black triplefin
            gulper South American Lungfish mahi-mahi, butterflyfish glass
            catfish soapfish ling gray mullet!
          </p>
          <a
            href="/"
            aria-label=""
            className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
          >
            Learn more
          </a>
        </div>
        <div className="max-w-md sm:mx-auto sm:text-center">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
            <svg
              className="w-12 h-12 text-deep-purple-accent-400 sm:w-16 sm:h-16"
              stroke="currentColor"
              viewBox="0 0 52 52"
            >
              <polygon
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                points="29 13 14 29 25 29 23 39 38 23 27 23"
              />
            </svg>
          </div>
          <h6 className="mb-3 text-xl font-bold leading-5">Organically grow</h6>
          <p className="mb-3 text-sm text-gray-900">
            A slice of heaven. O for awesome, this chocka full cuzzie is as
            rip-off as a cracker. Meanwhile, in behind the bicycle shed,
            Hercules Morse, as big as a horse and Mrs Falani were up to no good
            with a bunch of crook pikelets.
          </p>
          <a
            href="/"
            aria-label=""
            className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
          >
            Learn more
          </a>
        </div>
        <div className="max-w-md sm:mx-auto sm:text-center">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
            <svg
              className="w-12 h-12 text-deep-purple-accent-400 sm:w-16 sm:h-16"
              stroke="currentColor"
              viewBox="0 0 52 52"
            >
              <polygon
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                points="29 13 14 29 25 29 23 39 38 23 27 23"
              />
            </svg>
          </div>
          <h6 className="mb-3 text-xl font-bold leading-5">
            A slice of heaven
          </h6>
          <p className="mb-3 text-sm text-gray-900">
            Disrupt inspire and think tank, social entrepreneur but preliminary
            thinking think tank compelling. Inspiring, invest synergy capacity
            building, white paper; silo, unprecedented challenge B-corp
            problem-solvers.
          </p>
          <a
            href="/"
            aria-label=""
            className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
          >
            Learn more
          </a>
        </div>
      </div>
    </div>
  );
};

export const Statistic = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-indigo-50 sm:w-12 sm:h-12">
            <svg
              className="w-8 h-8 text-deep-purple-accent-400 sm:w-10 sm:h-10"
              stroke="currentColor"
              viewBox="0 0 52 52"
            >
              <polygon
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                points="29 13 14 29 25 29 23 39 38 23 27 23"
              />
            </svg>
          </div>
          <h6 className="text-4xl font-bold text-deep-purple-accent-400">
            819
          </h6>
          <p className="mb-2 font-bold text-md">Downloads</p>
         
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-indigo-50 sm:w-12 sm:h-12">
            <svg
              className="w-8 h-8 text-deep-purple-accent-400 sm:w-10 sm:h-10"
              stroke="currentColor"
              viewBox="0 0 52 52"
            >
              <polygon
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                points="29 13 14 29 25 29 23 39 38 23 27 23"
              />
            </svg>
          </div>
          <h6 className="text-4xl font-bold text-deep-purple-accent-400">
            1.3K
          </h6>
          <p className="mb-2 font-bold text-md">Users</p>
         
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-indigo-50 sm:w-12 sm:h-12">
            <svg
              className="w-8 h-8 text-deep-purple-accent-400 sm:w-10 sm:h-10"
              stroke="currentColor"
              viewBox="0 0 52 52"
            >
              <polygon
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                points="29 13 14 29 25 29 23 39 38 23 27 23"
              />
            </svg>
          </div>
          <h6 className="text-4xl font-bold text-deep-purple-accent-400">91</h6>
          <p className="mb-2 font-bold text-md">Subscribers</p>
       
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-indigo-50 sm:w-12 sm:h-12">
            <svg
              className="w-8 h-8 text-deep-purple-accent-400 sm:w-10 sm:h-10"
              stroke="currentColor"
              viewBox="0 0 52 52"
            >
              <polygon
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                points="29 13 14 29 25 29 23 39 38 23 27 23"
              />
            </svg>
          </div>
          <h6 className="text-4xl font-bold text-deep-purple-accent-400">52</h6>
          <p className="mb-2 font-bold text-md">Products</p>
     
        </div>
      </div>
    </div>
  );
};


export const Blog = () => {
  return (
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="mb-10 border-t border-b divide-y">
              <div className="grid py-8 sm:grid-cols-4">
                  <div className="mb-4 sm:mb-0">
                      <div className="space-y-1 text-xs font-semibold tracking-wide uppercase">
                          <a
                              href="/"
                              className="transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                              aria-label="Category"
                          >
                              Books
                          </a>
                          <p className="text-gray-600">5 Jan 2020</p>
                      </div>
                  </div>
                  <div className="sm:col-span-3 lg:col-span-2">
                      <div className="mb-3">
                          <a
                              href="/"
                              aria-label="Article"
                              className="inline-block text-black transition-colors duration-200 hover:text-deep-purple-accent-700"
                          >
                              <p className="text-3xl font-extrabold leading-none sm:text-4xl xl:text-4xl">
                                  Tell them I hate them
                              </p>
                          </a>
                      </div>
                      <p className="text-gray-700">
                          Well, the way they make shows is, they make one show. That show's
                          called a pilot. Then they show that show to the people who make
                          shows.
                      </p>
                  </div>
              </div>
              <div className="grid py-8 sm:grid-cols-4">
                  <div className="mb-4 sm:mb-0">
                      <div className="space-y-1 text-xs font-semibold tracking-wide uppercase">
                          <a
                              href="/"
                              className="transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                              aria-label="Category"
                          >
                              Inspiration
                          </a>
                          <p className="text-gray-600">15 Sep 2020</p>
                      </div>
                  </div>
                  <div className="sm:col-span-3 lg:col-span-2">
                      <div className="mb-3">
                          <a
                              href="/"
                              aria-label="Article"
                              className="inline-block text-black transition-colors duration-200 hover:text-deep-purple-accent-700"
                          >
                              <p className="text-3xl font-extrabold leading-none sm:text-4xl xl:text-4xl">
                                  A flower in my green garden
                              </p>
                          </a>
                      </div>
                      <p className="text-gray-700">
                          Chase ball of string eat plants, meow, and throw up because I ate
                          plants going to catch the red dot today going.
                      </p>
                  </div>
              </div>
              <div className="grid py-8 sm:grid-cols-4">
                  <div className="mb-4 sm:mb-0">
                      <div className="space-y-1 text-xs font-semibold tracking-wide uppercase">
                          <a
                              href="/"
                              className="transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                              aria-label="Category"
                          >
                              Detective
                          </a>
                          <p className="text-gray-600">28 Dec 2020</p>
                      </div>
                  </div>
                  <div className="sm:col-span-3 lg:col-span-2">
                      <div className="mb-3">
                          <a
                              href="/"
                              aria-label="Article"
                              className="inline-block text-black transition-colors duration-200 hover:text-deep-purple-accent-700"
                          >
                              <p className="text-3xl font-extrabold leading-none sm:text-4xl xl:text-4xl">
                                  We never had the love we deserve
                              </p>
                          </a>
                      </div>
                      <p className="text-gray-700">
                          Sportacus andrew weatherall goose Refined gentlemen super mario
                          des lynam alpha trion zap.
                      </p>
                  </div>
              </div>
          </div>
          <div className="text-center">
              <a
                  href="/"
                  aria-label=""
                  className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
              >
                  See all articles
                  <svg
                      className="inline-block w-3 ml-2"
                      fill="currentColor"
                      viewBox="0 0 12 12"
                  >
                      <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                  </svg>
              </a>
          </div>
      </div>
  );
};