import React, {useEffect, useState} from 'react';
import {getContentTypes, fetchFeed} from "../../services";
import {Input, Media, Select, Modal} from "../../components/";
import {FeedItem} from "../../types";
import  useDebounce from '../../hooks/useDebounce'

const initialStates = {
    feed: [],
    type: '',
    title: '',
    showModal: false,
    selectedFeed: {},
    pageNumber: 1,
    records: 0,
    pageSize: '10',
    total: 0,
};

export default () => {
    const [feed, setFeed] = useState(initialStates.feed);
    const [type, setType] = useState(initialStates.type);
    const [title, setTitle] = useState(initialStates.title);
    const [showModal, setShowModal] = useState(initialStates.showModal);
    const [selectedFeed, setSelectedFeed] = useState<FeedItem | undefined>();
    const [pageNumber, setPageNumber] = useState(initialStates.pageNumber);
    const [pageSize, setPageSize] = useState(initialStates.pageSize);
    const [total, setTotal] = useState(initialStates.total);
    const debouncedValue = useDebounce<string>(title, 500)

    const maxPageNumber = total / parseInt(pageSize);

    useEffect(() => {
        fetchFeed({
            type,
            title: debouncedValue,
            page: pageNumber,
            pageSize
        })
            .then(({data}: any) => {
                setTotal(data.total)
                setFeed(data.data)
            })
    }, [type, debouncedValue, pageSize, pageNumber])

    return (
        <>
            <section className="border-b py-10">
                <div className="container">
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                        <div className="w-full sm:w-4/12 lg:w-3/12">
                            <Input
                                name="searchText"
                                placeholder='Search By Title'
                                value={title}
                                onChange={(event) => {
                                    setTitle(event.target.value)
                                }}
                            />
                        </div>

                        <div className="w-full sm:w-4/12 lg:w-2/12 z-50">
                            <Select
                                label=''
                                selected={type}
                                onSelect={setType}
                                options={[
                                    {
                                        key: '',
                                        value: 'Filter By Type'
                                    },
                                    ...getContentTypes()
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-10">
                <div className="container">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {feed.map((feedItem: FeedItem, index: number) => {
                            const {title, src, type, createdAt} = feedItem;
                            return (
                                <div className="relative rounded border group cursor-pointer" key={index}
                                     onClick={() => {
                                         setSelectedFeed(feedItem)
                                         setShowModal(true)
                                     }}>
                                    <Media type={type} title={title} src={src}/>
                                    <div
                                        className="absolute z-10 left-0 top-0 w-full h-full bg-gradient-to-t from-black to-transparent group-hover:-z-10"/>
                                    <div className="absolute z-20 bottom-5 left-4 text-white">
                                        <h2 className="text-xl font-bold mt-5">{title}</h2>
                                        <span
                                            className="bg-green-600 py-0.5 px-4 text-xs rounded-full uppercase font-bold">{type}</span>
                                        <p className="mt-2 text-xs text-gray-400">{createdAt}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="mt-10 flex items-center justify-between">
                        <div className="w-2/12">
                            <Select
                                label={''}
                                options={[
                                    {
                                        key: '10',
                                        value: '10'
                                    },
                                    {
                                        key: '20',
                                        value: '20'
                                    },
                                    {
                                        key: '50',
                                        value: '50'
                                    },
                                    {
                                        key: '100',
                                        value: '100'
                                    }
                                ]}
                                selected={pageSize}
                                onSelect={setPageSize}
                            />

                        </div>
                        <nav>
                            <ul className="inline-flex -space-x-px">
                                {pageNumber > 1 && (
                                    <li>
                                        <button
                                            onClick={() => {
                                                setPageNumber(prevState => prevState - 1)
                                            }}
                                            type="button"
                                            className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous
                                        </button>
                                    </li>
                                )}
                                {
                                    Array.from({length: maxPageNumber}).map((item, index) => (
                                            <li key={index}>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setPageNumber(index)
                                                    }}
                                                    className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{index + 1}</button>
                                            </li>
                                        )
                                    )}

                                {pageNumber < maxPageNumber && (
                                    <li>
                                        <button
                                            onClick={() => {
                                                setPageNumber(prevState => prevState + 1)
                                            }}
                                            type="button"
                                            className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next
                                        </button>
                                    </li>
                                )}

                            </ul>
                        </nav>
                    </div>
                </div>
            </section>
            {showModal && selectedFeed && (
                <Modal onClose={setShowModal}>
                    <Media type={selectedFeed.type} title={selectedFeed.title} src={selectedFeed.src} modal/>
                </Modal>
            )}

        </>
    )
}
