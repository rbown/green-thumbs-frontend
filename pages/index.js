import Head from 'next/head'

Plants.title = 'Plants'

function Plants({plants}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <Head>
        <title>Plants</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center w-full flex-1 text-center">
        <div className="bg-white shadow overflow-hidden sm:rounded-md w-full">
          <ul role="list" className="divide-y divide-gray-200">
            {plants?.length ? plants.map((plant) => (
              <li key={plant.id}>
                <a href="#" className="block hover:bg-gray-50">
                  <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="min-w-0 flex-1 flex items-center">
                      <div className="flex-shrink-0">
                        <img className="h-12 w-12 rounded-full" src={plant.photo} alt="" />
                      </div>
                      <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                        <div>
                          <p className="text-lg font-bold text-green-600 truncate text-left">
                            {plant.name}
                          </p>
                          <p className="flex items-center text-md text-gray-500">
                            <span className="truncate">Species: {plant.species}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                </a>
              </li>
            )) : <div className="py-4">No plants available, click here to add one</div>}
          </ul>
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/plants`)
  const plants = await res.json()
  
  return {
    props: {
      plants: plants.data
    },
  }
}

export default Plants
