import { Layout } from "@components/Layout";
import { useLocaleParser } from "@libs/localeParser";
import { getRepos } from "@libs/rest";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";

export interface IGitPage {
	repos: string[];
}

const GitPage: NextPage<IGitPage> = ({ repos }) => {
	const parser = useLocaleParser();

	return (
		<Layout title={parser.get("repos")}>
			<div className="min-h-screen leading-normal tracking-normal">
				<div className="container mx-auto w-full md:max-w-3xl">
					<div className="w-full text-xl leading-normal text-gray-800">
						<div className="font-sans">
							<h1 className="break-normal pb-2 pt-6 font-sans text-3xl font-bold text-black dark:text-white md:text-4xl">
								<Link href="/git">
									<span className="cursor-pointer text-purple-600 hover:text-purple-500 hover:underline">
										{parser.get("repos")}
									</span>
								</Link>
							</h1>
						</div>
						<div className="container prose text-black dark:text-white">
							<p>{parser.get("repos_description")}</p>
							<ul>
								{repos.map((repo, idx) => (
									<li key={idx}>
										<Link href={`/git/${repo}`}>
											<span className="cursor-pointer text-purple-600 hover:text-purple-500 hover:underline">
												{repo}
											</span>
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default GitPage;

export const getServerSideProps: GetServerSideProps<IGitPage> = async () => {
	const repos = await getRepos();

	return {
		props: {
			repos,
		},
	};
};
