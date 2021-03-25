import { Entity } from '@/models/nest/Entity';
import useSWR from 'swr';
const NAPOANCOM_NEST_URL = process.env.NAPOANCOM_NEST_URL ?? 'https://example.com/';
const NAPOANCOM_NEST_SECRET = process.env.NAPOANCOM_NEST_SECRET ?? 'secret';

interface fetchProps {
  useLocal?: boolean;
}

function GetRandomEntity({ useLocal }: fetchProps) {
  const fetcher = (): Promise<Array<Entity>> => {
    let backendUrl: string;
    useLocal ? (backendUrl = 'http://localhost:5000') : (backendUrl = NAPOANCOM_NEST_URL);
    return fetch(`${backendUrl}/entity/random`, {
      body: JSON.stringify({
        // here is query
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${NAPOANCOM_NEST_SECRET}`,
      },
    })
      .then((res) => {
        console.info(`Fetch completed from ${useLocal ? 'localhost' : 'remote'}`);
        return res.json();
      })
      .catch((e) => {
        alert(e);
        console.log(`Gatcha fetcher error: ${e}`);
      });
  };

  const { data, mutate, error } = useSWR(`index`, fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
    onError: (err) => {
      alert(err);
      console.error(`Gacha SWR error: ${err}`);
    },
  });

  if (data?.length == undefined) {
    return {
      /* When too many request sended res become 'ERROR' */
      randomEntity: [
        {
          bedrockId: 'ERROR',
          iconUrl: '/api/ogpgen?text=ERROR',
          pictureUrl: '/api/ogpgen?text=ERROR',
          iconBgPos: 'ERROR',
          name: 'ERROR',
        },
      ],
      mutateEntity: mutate,
      error: error,
    };
  }

  return {
    randomEntity: data,
    mutateEntity: mutate,
    error: error,
  };
}

export default GetRandomEntity;
