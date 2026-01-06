'use client';

import * as React from 'react';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider as DefaultCacheProvider } from '@emotion/react';

const customCache = createCache({ key: 'mui' });
customCache.compat = true; 

export default function EmotionRegistry({ children }: { children: React.ReactNode }) {
  const [cache] = React.useState(customCache);

  useServerInsertedHTML(() => {
    return (
      <style
        data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: Object.values(cache.inserted).join(' '),
        }}
      />
    );
  });

  return <DefaultCacheProvider value={cache}>{children}</DefaultCacheProvider>;
}