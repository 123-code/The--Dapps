import Image from 'next/image'
import { Inter } from 'next/font/google'
import Connector from '../Components/connector'
import  Navbar  from '../Components/Navbar';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
<Navbar/>




      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
      
<h1> CONT MKT </h1>
<h2> Tokenize Real World Assets </h2>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Enter App{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Start Adding assets to your inventory.
          </p>
        </a>
      </div>
    </main>
  )
}
