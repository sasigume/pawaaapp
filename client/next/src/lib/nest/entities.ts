import { Entity } from '@/models/nest/Entity';
import useSWR from 'swr';
const NAPOANCOM_NEST_SECRET = process.env.NAPOANCOM_NEST_SECRET ?? 'secret';
const NAPOANCOM_NEST_URL = process.env.NAPOANCOM_NEST_URL ?? 'https://ERROR-ENV-NOT-OUND/';
const NAPOANCOM_NEST_URL_STAGING =
  process.env.NAPOANCOM_NEST_URL_STATING ?? 'https://ERROR-STATING-ENV-NOT-OUND/';
interface fetchProps {
  path?: string;
  useStaging?: boolean;
}

const getApiUrl = (useStaging?: boolean) => {
  if (useStaging) {
    return NAPOANCOM_NEST_URL_STAGING;
  } else {
    return NAPOANCOM_NEST_URL;
  }
};

const ReturnDataOrError = async ({ path, useStaging }: fetchProps): Promise<Entity[] | string> => {
  const apiUrl = getApiUrl(useStaging);

  try {
    let response = await fetch(apiUrl + path, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${NAPOANCOM_NEST_SECRET}`,
      },
    });
    if (response.ok) {
      return response.json();
    } else {
      console.error('Failed to fetch: ' + response.status);
      return response.statusText;
    }
  } catch (e) {
    console.error(e);
    return e as string;
  }
};
async function ReturnBool({ path, useStaging }: fetchProps) {
  const apiUrl = getApiUrl(useStaging);

  try {
    let response = await fetch(apiUrl + path, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${NAPOANCOM_NEST_SECRET}`,
      },
    });
    if (response.ok) {
      return true;
    } else {
      console.error(`Check failed: ${response.status}`);
      return false;
    }
  } catch (e) {
    console.error(e);
  }
}

export function CheckApi({ useStaging }: fetchProps) {
  const { data } = useSWR(
    ['/', useStaging],
    (path, useStaging) => ReturnBool({ path, useStaging }),
    {
      //check heroku
      refreshInterval: 30000,
      shouldRetryOnError: true,
    },
  );
  return data;
}

export function GetRandomEntity({ useStaging }: fetchProps) {
  const { data, mutate, error } = useSWR(
    ['/entity/random', useStaging],
    (path, useStaging) => ReturnDataOrError({ path, useStaging }),
    {
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
    },
  );

  // 初回ロード時に返すデータ
  if (data == undefined) {
    return {
      randomEntity: [],
      mutateEntity: mutate,
      error: error,
    };
  } else {
    if (typeof data == 'string') {
      return {
        randomEntity: [],
        mutateEntity: mutate,
        errorEntity: data,
      };
    } else {
      return {
        randomEntity: data,
        mutateEntity: mutate,
        errorEntity: error,
      };
    }
  }
}

export const getAllEntities = async ({ useStaging }: fetchProps): Promise<Entity[]> => {
  const apiUrl = getApiUrl(useStaging);

  try {
    let response = await fetch(apiUrl + '/entity/query', {
      // BE AWARE:POST
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${NAPOANCOM_NEST_SECRET}`,
      },
    });
    if (response.ok) {
      return response.json();
    } else {
      console.error('Failed to fetch: ' + response.status);
      return [];
    }
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getEntity = async (bedrockId: string): Promise<Entity | null> => {
  const apiUrl = getApiUrl(false);

  try {
    let response = await fetch(apiUrl + '/entity/bedrockId/' + bedrockId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${NAPOANCOM_NEST_SECRET}`,
      },
    });
    if (response.ok) {
      return response.json();
    } else {
      console.error('Failed to fetch: ' + response.status);
      return null;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};
