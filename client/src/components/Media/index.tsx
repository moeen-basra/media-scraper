import React from "react";
import {contentTypes} from "../../types";

type MediaType = {
    title: string;
    type: string;
    src: string;
    modal?: boolean;
}

export default ({title, type, src, modal = false}: MediaType) => (
    <>
        {type === contentTypes.VIDEO && (
            <video muted className={`${modal ? ':w-[385px] sm:min-w-[40vw] min-w-[80vw] min-h-[50vh]' : 'h-72 object-cover w-full'}`} controls={modal} autoPlay={modal}>
                <source
                    src={src}
                    type="video/mp4"/>
            </video>
        )}

        {type === contentTypes.IMAGE && (
            <img src={src} className={`${modal ? ':w-[385px] sm:min-w-[40vw] min-w-[80vw] min-h-[50vh]' : 'h-72 object-cover w-full'}`} alt={title}/>
        )}
    </>
)