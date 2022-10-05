import Head from "next/head";
import { getAllPosts, getPostById } from "../../services/postService";
import Link from "next/link";
/*
 * Make all necessary imports.
 * Write the function getStaticPaths.
 * Write the function getStaticProps.
 * Pass down your props to the component.
 * Render the data.
 */

export async function getStaticPaths() {
  const posts = await getAllPosts();
  const ids = posts.map((post) => post.id);

  return {
    paths: ids.map((id) => ({ params: { id: id } })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const posts = await getPostById(id);

  return {
    props: { name: posts.name, description: posts.description, id: posts.id },
  };
}

export default function Post({ name, description, id }) {
  return (
    <>
      <Head>
        <title>title</title>
      </Head>
      <h1>{name} of the post</h1>
      <p>ID: {id}</p>
      <h2>{description}</h2>
      <Link href={`/posts`} passHref>
        Back to Posts
      </Link>
    </>
  );
}
