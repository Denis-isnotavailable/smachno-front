'use client';
import { useEffect, useState } from 'react';

const breakpoints = {
    mobile: 320,
    tablet: 768,
    desktop: 1280,
};

export type WindowSize = {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
};

export default function useWindowSize(): WindowSize {
    const isClient = typeof window === 'object';

    const [windowSize, setWindowSize] = useState<WindowSize>({
        isMobile: false,
        isTablet: false,
        isDesktop: false,
    });

    useEffect(() => {
        function changeWindowSize() {
            setWindowSize({
                isMobile: isClient && window.innerWidth < breakpoints.tablet - 0.02,
                isTablet:
                    isClient &&
                    window.innerWidth >= breakpoints.tablet &&
                    window.innerWidth < breakpoints.desktop - 0.02,
                isDesktop: isClient && window.innerWidth >= breakpoints.desktop,
            });
            // console.log("resize");
        }

        changeWindowSize();

        if (isClient) {
            window.addEventListener('resize', changeWindowSize);

            return () => {
                window.removeEventListener('resize', changeWindowSize);
            };
        }
    }, [isClient]);

    return windowSize;
}
