async function QueryMaker(
  searchParams: URLSearchParams | Record<string, string>
) {
  // Convert non-URLSearchParams objects to URLSearchParams
  const params =
    searchParams instanceof URLSearchParams
      ? searchParams
      : new URLSearchParams(searchParams);

  // Convert URLSearchParams to a plain JavaScript object
  const queryParamsObject: { [key: string]: string } = {};

  params.forEach((value, key) => {
    queryParamsObject[key] = value;
  });

  return queryParamsObject;
}

export default QueryMaker;
