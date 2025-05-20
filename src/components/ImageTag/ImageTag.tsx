"use client";
import { useState } from "react";
import LoadingImg from "../LoadingImg/LoadingImg";
type ImageType = {
    src: any;
    alt: string | null;
    className?: string;
    classPlus?: string;
    figureClass?: string;
    onClick?: (value: any) => void
};
export default function ImgTag({
    src,
    alt,
    className,
    classPlus,
    figureClass,
    onClick
}: ImageType) {
    const [load, setLoad] = useState<boolean>(true);
    const [error, setError] = useState<null | string>(null)
    const classImage = className ? className : classPlus ? `${classPlus} rounded-md  table mx-auto` : "rounded-md shadow-md w-full h-auto table mx-auto object-fill"
    return (
        <figure className={figureClass || "w-full relative"}>
            <img

                loading="lazy"
                onClick={onClick}
                // placeholder="blur"
                // blurDataURL="data:image/gif;base64,..."
                onLoad={() => setLoad(false)}
                src={error ? error : src || '/notfound.webp'}
                alt={alt || "error"}
                className={classImage}
                onError={() => setError('/notfound.webp')}
            />
            {load && <LoadingImg />}
        </figure>
    );
}
