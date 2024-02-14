import React from 'react'

function Loader({percent, color}:any) {
  const circumference = 30 * 2 * Math.PI;

    return (
        <div
            x-data="scrollProgress"
            className="absolute inline-flex items-center justify-center overflow-hidden rounded-full bottom-0 right-5"
        >
            <svg className="w-20 h-20 rotate-[270deg]">
                <circle
                    className="text-gray-300"
                    strokeWidth="5"
                    stroke="currentColor"
                    fill="transparent"
                    r="30"
                    cx="40"
                    cy="40"
                />
                <circle
                    className={color?"text-"+color+"-500":"text-blue-500"}
                    strokeWidth="5"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - percent / 100 * circumference}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="30"
                    cx="40"
                    cy="40"
                />
            </svg>
            <span className={color?"absolute text-lg text-"+color+"-500":"absolute text-xl text-blue-500"}>{Math.round(percent)} %</span>
        </div>
    )
}

export default Loader