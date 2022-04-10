import React, {ChangeEvent, FormEvent, useState} from "react";
import {submitUrl} from "../../services";

export default () => {

    const [urls, setUrls] = useState<Array<any>>([]);

    return (
        <>
            <section className="border-b py-10">
                <div className="container">
                    <div className="flex flex-col space-y-2">
                        <h1 className="text-2xl font-bold">Initialize Scraper</h1>
                        <p className='text-gray-500'>Please add your desired website links to start scraping videos and
                            images</p>
                    </div>
                </div>
            </section>
            <section className="py-10">
                <div className="container">
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-4/12">
                            <form onSubmit={(event: FormEvent<HTMLFormElement>) => {
                                event.preventDefault();
                                submitUrl({urls})
                                    .then((response) => {
                                        console.log(response);
                                    })
                                    .catch((error) => {
                                        console.log(error)
                                    })
                            }}>
                                <div className="flex flex-col space-y-2">
                                    {urls.map((url, index) => (
                                            <input
                                                key={index}
                                                name="url"
                                                type="url"
                                                value={url}
                                                className="h-14 bg-white border border-light-500 text-dark-500 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder:font-light placeholder:text-tiny placeholder:text-dark-100"
                                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                    urls[index] = event.target.value
                                                    setUrls([...urls])
                                                }}
                                                placeholder="Example: https://google.com"/>
                                        )
                                    )}

                                    {urls.length < 5 && (
                                        <button type="button"
                                                onClick={() => {
                                                    setUrls(prevState => [...prevState, ''])
                                                }}
                                                className="bg-green-500 rounded font-bold text-white px-4 py-3 transition duration-300 ease-in-out hover:bg-green-600">Add
                                            Link
                                        </button>
                                    )}


                                    <button type="submit"
                                            className="bg-green-500 rounded font-bold text-white px-4 py-3 transition duration-300 ease-in-out hover:bg-green-600">Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}