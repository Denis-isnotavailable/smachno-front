import Image from 'next/image';
import { memo } from 'react';

interface ArrowBtnProps {
    hovered?: boolean;
    active?: boolean;
    svgDefault: string;
    svgHover: string;
    svgPress: string;
}
export const ArrowBtn = memo((props: ArrowBtnProps) => {
    const { hovered, active, svgDefault, svgHover, svgPress } = props;
    return (
        <>
            {!hovered && !active && (
                <Image
                    src={svgDefault}
                    alt={''}
                    loading='lazy'
                    width={24}
                    height={40}
                />
            )}
            {hovered && !active && (
                <Image
                    src={svgHover}
                    alt={''}
                    loading='lazy'
                    width={24}
                    height={40}
                />
            )}
            {hovered && active && (
                <Image
                    src={svgPress}
                    alt={''}
                    loading='lazy'
                    width={24}
                    height={40}
                />
            )}
        </>
    );
});
