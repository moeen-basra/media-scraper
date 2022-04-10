import React, {ReactChild} from "react";

export type ModalType = {
    children: ReactChild | ReactChild[];
    onClose: any;
};

export default ({
    children,
    onClose,
}: ModalType) => (
    <>
        <div className="fixed left-0 top-0 z-50 w-full h-full">
            <div className='w-full h-full bg-black bg-opacity-70 top-0 absolute z-50' onClick={()=> onClose()}/>
            <div className='sm:w-[385px] sm:min-w-[40vw] min-w-[80vw] min-h-[50vh] flex flex-col items-center gap-2 -translate-y-1/2 bg-white rounded-lg top-1/2 left-1/2 -translate-x-1/2 absolute z-50'>
                {children}
            </div>
        </div>
    </>
)
