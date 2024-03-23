// index.tsx
import { useUser } from "@clerk/nextjs";
import Head from "next/head";
import FileStructure from "~/components/fileStructure"; // Make sure this is the correct path
import RepoInput from "~/components/repoInputForm"; // Make sure this is the correct path
import ReportBar from "~/components/reportBar";
import TopBar from "~/components/topBar";
import fakeData from "../../one_file_analysis_report.json";

import IssueBlock from "~/components/issueBlock";
import TopMenu from "~/components/topMenu";
import { api } from "~/utils/api";

// const fileData: FileItem[] = [
//   {
//     name: "src",
//     type: "folder",
//     highestSeverity: "critical",
//     children: [
//       { name: "index.tsx", type: "file", highestSeverity: "moderate" },
//       // Add more files or folders as needed
//     ],
//   },
//   // Add more folders or files as needed
// ];

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });

  const { isLoaded: userLoaded, isSignedIn, user } = useUser();

  api.user.createUser.useQuery({
    id: user?.id,
    email: user?.primaryEmailAddress?.emailAddress ?? null,
    name: user?.fullName
  });

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopBar />
      {/* <ReportBar /> */}
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-black to-[#15162c]">
        {/* Sidebar for reports */}
        {/* <aside className="w-1/4 h-full overflow-y-auto bg-[#2e026d] p-4">
          {fakeData.map((report, index) => (
            <button key={index} className="w-full mb-2 rounded p-2 text-left text-white bg-purple-600 hover:bg-purple-700">
              {report.title || `Report ${index + 1}`}
            </button>
          ))}
        </aside> */}
        <TopMenu />

        {/* Main content area */}
        <div className="w-3/4 p-4">
          <h1 className="text-3xl font-bold text-white">Welcome {user?.fullName}</h1>
          {/* <RepoInput /> */}
          <IssueBlock filename="main.py" descriptions={fakeData} />
          {/* <FileStructure structure={fileData} /> */}
        </div>
      </main>
    </>
  );
}
