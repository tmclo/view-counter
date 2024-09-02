addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const PAGEVIEWS_KEY_PREFIX = 'pageviews:';

async function handleRequest(request) {
  const url = new URL(request.url);
  const key = PAGEVIEWS_KEY_PREFIX + url.pathname;

  const storedValue = await websiteviews.get(key, 'json');
  const currentCount = storedValue ? storedValue.count : 0;
  const newCount = currentCount + 1;

  await websiteviews.put(key, JSON.stringify({ count: newCount }));

  return new Response(JSON.stringify({ count: newCount }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200
  });
}
