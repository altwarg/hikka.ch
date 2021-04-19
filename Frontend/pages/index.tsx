import Head from 'next/head';
import { InferGetServerSidePropsType } from 'next';
import { Emoji } from '@components/shared';
import { imageboardName } from '@utils/consts';

export const getServerSideProps = async () => {
  //   const data = (await getPageData('/', false)).data;

  return {
    props: {
      //   data,
    },
  };
};

export default function Index({}: //   data,
InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>{imageboardName} – Free speech for everyone</title>
      </Head>

      <h1>
        <Emoji symbol="🔰" /> {imageboardName}
      </h1>
      <h2>Welcome. Once again.</h2>

      <h3 className="text-center">What is {imageboardName}?</h3>
      <p>
        {imageboardName} is a simple image-based bulletin board where anyone can
        post comments and share images. There are boards dedicated to a variety
        of topics, from Japanese animation and culture to videogames, music and
        photography. Users not need to register an account before participating
        in the commutiny. Fell free to click on a board below that interests you
        and jump right in!
      </p>
    </>
  );
}
