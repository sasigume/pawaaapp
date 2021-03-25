import { Entity } from '@/models/nest/Entity';
import useSWR from 'swr';
const NAPOANCOM_NEST_URL = process.env.NAPOANCOM_NEST_URL ?? 'https://ERROR-ENV-NOT-OUND/';
const NAPOANCOM_NEST_URL_STAGING =
  process.env.NAPOANCOM_NEST_URL_STATING ?? 'https://ERROR-STATING-ENV-NOT-OUND/';
const NAPOANCOM_NEST_SECRET = process.env.NAPOANCOM_NEST_SECRET ?? 'secret';

interface fetchProps {
  useStating?: boolean;
}

function GetRandomEntity({ useStating }: fetchProps) {
  if (process.env.NODE_ENV !== 'production') {
    console.debug(
      `DEBUG: \n\nNAPOANCOM_NEST_URL: ${NAPOANCOM_NEST_URL}\n\nNAPOANCOM_NEST_URL_STAGING: ${NAPOANCOM_NEST_URL_STAGING}`,
    );
  }
  let apiUrl = NAPOANCOM_NEST_URL;

  const fetcher = (): Promise<Array<Entity>> => {
    if (useStating) {
      console.info(`Fetching stating api`);
      apiUrl = NAPOANCOM_NEST_URL_STAGING;
    } else {
      console.info(`Fetching production api`);
    }
    return fetch(`${apiUrl}/entity/random`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${NAPOANCOM_NEST_SECRET}`,
      },
    })
      .then((res) => {
        console.info(`Fetch completed`);
        return res.json();
      })
      .catch((e) => {
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
      randomEntity: [],
      mutateEntity: mutate,
      error: error,
    };
  } else {
    return {
      randomEntity: data,
      mutateEntity: mutate,
      error: error,
    };
  }
}

export default GetRandomEntity;
