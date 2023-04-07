import Head from "next/head";
import Form from "../components/Form";
import Header from "../components/Header";
import PostFeed from "../components/posts/PostFeed";

export default function Home() {
  return (
    <>
      <Head>
        <title>Buzznet</title>
      </Head>
      <Header label="Home" />
      <Form placeholder="What's happening" />
      <PostFeed />
    </>
  );
}
