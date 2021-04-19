import Link from 'next/link';

export default function Index() {
  return (
    <>
      <div>hello</div>
      <Link href="/hello">
        <a>Goto /hello</a>
      </Link>
    </>
  );
}
