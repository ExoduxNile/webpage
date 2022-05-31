import type { FC } from "react";
import { CustomImage } from "@components/Utils/CustomImage";
import { Tippy } from "@components/Utils/Tippy";
import { Link } from "@components/Utils/Link";
import { useCopyToClipboard } from "react-use";
import { toast } from "react-toastify";
import Tilt from "react-parallax-tilt";
import moment from "moment";
import { useRouter } from "next/router";
import { LocaleParser } from "@libs/localeParser";

export interface IBookmark {
	id: number;
	url: string;
	title: string;
	description: string;
	imageUrl: string;
	createdAt: string;
}

export const Bookmark: FC<IBookmark> = ({
	createdAt,
	description,
	imageUrl,
	title,
	url,
}) => {
	const router = useRouter();
	const parser = new LocaleParser(router.locale);
	const [, copyToClipboard] = useCopyToClipboard();

	const onCopy = () => {
		copyToClipboard(url);
		toast.success(parser.get("url_copied"));
	};

	const Card: FC = () => (
		<div
			onClick={onCopy}
			className="max-w-md py-4 px-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg my-20"
		>
			<div className="flex justify-center md:justify-end -mt-16">
				<CustomImage
					className="w-20 h-20 object-cover rounded-full border-2 border-purple-500"
					src={imageUrl}
					alt={title}
				/>
			</div>
			<div>
				<h2 className="text-gray-800 dark:text-white text-3xl font-semibold">
					{title}
				</h2>
				<p className="mt-2 text-gray-600 dark:text-gray-500">
					{description}
				</p>
			</div>
			<div className="flex justify-end mt-4">
				<span className="text-xl font-medium text-indigo-500">
					{parser.get("bookmarked", {
						date: moment(createdAt).calendar(),
					})}
				</span>
			</div>
		</div>
	);

	return (
		<Tippy tooltip={parser.get("click_me") as string}>
			<div>
				<Tilt scale={1.05} tiltMaxAngleX={10} tiltMaxAngleY={10}>
					<Link href={url}>
						<Card />
					</Link>
				</Tilt>
			</div>
		</Tippy>
	);
};
