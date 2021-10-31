import { useState } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

AddPlant.title = 'Add Plant'

export default function AddPlant() {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const [selectedFile, setSelectedFile] = useState()
  
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  
  const handleSubmit = async event => {
    event.preventDefault()
    setLoading(true)
    setErrors(null)
  
    const data = new FormData()
    data.append('name', event.target.name.value)
    data.append('species', event.target.species.value)
    data.append('watering_instructions', event.target.watering_instructions.value)
    data.append('photo', selectedFile);
  
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/plants`,
      {
        body: data,
        method: 'POST',
        headers: {
          Accept: 'application/json'
        }
      }
    )
    
    if (res.status === 200){
      await Router.push('/')
      return;
    }
    
    const result = await res.json()
    setErrors(result.errors)
    setLoading(false)
  }
  
  return (
    <div className="bg-white rounded shadow w-full p-6">
      <Head>
        <title>Add Plant</title>
      </Head>
      <form encType="multipart/form-data" className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit}>
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
            <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Plant Name
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                  {errors?.name && <span className="text-xs text-red-500">{errors.name[0]}</span>}
                </div>
                
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="species" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Plant Species
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="species"
                    id="species"
                    className="block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                  {errors?.species && <span className="text-xs text-red-500">{errors.species[0]}</span>}
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="watering_instructions" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Watering Instructions
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <textarea
                    id="watering_instructions"
                    name="watering_instructions"
                    rows="6"
                    className="w-full shadow-sm block w-full focus:ring-green-500 focus:border-green-500 sm:text-sm border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Photo
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="w-full flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <div className="flex text-sm text-gray-600 justify-center">
                        <label htmlFor="file" className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                          <span>Upload a file</span>
                          <input
                            id="file"
                            name="file"
                            type="file"
                            className="sr-only"
                            onChange={changeHandler}
                          />
                        </label>
                      </div>
                      <p className="text-sm text-gray-500">
                        {selectedFile?.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-5">
          <div className="flex justify-end">
            <Link href="/">
              <button type="button" className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Cancel
              </button>
            </Link>
            <button type="submit" className="ml-3 inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              {loading && <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="spinner" className="svg-inline--fa fa-spinner w-4 h-4 mr-2 animate-spin" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <g className="fa-group">
                  <path className="fa-secondary" fill="currentColor" d="M108.92 355.08a48 48 0 1 0 48 48 48 48 0 0 0-48-48zM256 416a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm208-208a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm-60.92 147.08a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0-198.16a48 48 0 1 0-48-48 48 48 0 0 0 48 48z" opacity="0.4"/>
                  <path className="fa-primary" fill="currentColor" d="M108.92 60.92a48 48 0 1 0 48 48 48 48 0 0 0-48-48zM48 208a48 48 0 1 0 48 48 48 48 0 0 0-48-48zM256 0a48 48 0 1 0 48 48 48 48 0 0 0-48-48z"/>
                </g>
              </svg>}
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
