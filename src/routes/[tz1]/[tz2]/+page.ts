/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  return {
    tz1: params.tz1,
    tz2: params.tz2,
  };
}