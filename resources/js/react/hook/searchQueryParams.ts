

export default function searchQueryParams({params, location}: any) {
  const queryParams = new URLSearchParams(location.search); // создаем объект URLSearchParams
  const s = queryParams.get(params);
  
  return s
}