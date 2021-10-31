import Link from 'next/link'

export default function Layout({ children, title = null }) {
  return (
    <div className="min-h-full">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-row">
          {title &&
          <h1 className="text-3xl font-bold text-gray-900">
            {title}
          </h1>}
          <div className="flex flex-grow justify-end items-center">
            <Link href="/add-plant">
              <a className="bg-green-600 text-white px-4 py-1 rounded">Add Plant</a>
            </Link>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
