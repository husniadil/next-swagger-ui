import SwaggerUI from 'swagger-ui-react';
import Topbar from '../components/Topbar';
import Head from 'next/head';
import { Context } from '../lib/Context';
import { useState } from 'react';

export async function getServerSideProps(context) {
  const host = context.req.headers.host;
  const enableHTTPS = process.env.ENABLE_HTTPS !== 'false';
  const protocol = enableHTTPS ? 'https' : 'http';
  const baseURL = protocol + '://' + host + '/?url=';
  const initialURL =
    context.query.url || 'https://petstore.swagger.io/v2/swagger.json';
  return {
    props: { baseURL, initialURL },
  };
}

export default function Home(props) {
  const [url, setURL] = useState(props.initialURL);
  return (
    <>
      <Head>
        <title>Swagger</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Context.Provider value={[url, setURL]}>
        <Topbar baseURL={props.baseURL} />
        <SwaggerUI url={url} />
      </Context.Provider>
    </>
  );
}
