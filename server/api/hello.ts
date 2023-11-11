export default defineEventHandler((event) => {
  // handle event here
  const query = getQuery(event)
  return {
    hello: `world from hello.ts ${query.name ?? ''}`,
  }
})
