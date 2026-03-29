import { cn } from '@/lib/utils';
import Image, { type ImageProps } from 'next/image';

type LogoImageProps = Omit<ImageProps, 'fill' | 'width' | 'height' | 'sizes'> & {
	boxWidth: number;
	boxHeight: number;
	sizes: string;
	containerClassName?: string;
	imageClassName?: string;
};

export function LogoImage({
	boxWidth,
	boxHeight,
	sizes,
	containerClassName,
	imageClassName,
	alt,
	...props
}: LogoImageProps) {
	return (
		<div
			className={cn('relative shrink-0', containerClassName)}
			style={{ width: `${boxWidth}px`, height: `${boxHeight}px` }}>
			<Image
				fill
				sizes={sizes}
				alt={alt}
				className={cn('object-contain', imageClassName)}
				{...props}
			/>
		</div>
	);
}
