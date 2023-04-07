import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react'
import { ClipLoader } from 'react-spinners';
import Form from '../../components/Form';
import Header from '../../components/Header';
import CommentFeed from '../../components/posts/CommentFeed';
import PostItem from '../../components/posts/PostItem';
import usePost from '../../hooks/usePost';

const PostView = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: fetchedPost, isLoading } = usePost(postId as string);

  if (isLoading || !fetchedPost) {
    return (
      <div className='flex justify-center items-center h-full'>
        <ClipLoader color="lightblue" size={80} />
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Buzznet</title>
      </Head>
      <Header label="Tweet" showBackArrow />
      <PostItem data={fetchedPost} />
      <Form
        postId={postId as string}
        isComment
        placeholder="Tweet your Reply"
      />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  );
}

export default PostView;