export function processPaginationParams(
  queryLimit: number,
  queryPage: number,
  querySelect: string[],
) {
  const take = Number(queryLimit || 10);
  const page = Number(queryPage || 1);
  const skip = Number((page - 1) * take);

  const selectValue = querySelect?.length ? querySelect : [];
  const selectArray = Array.isArray(selectValue) ? selectValue : [selectValue];

  const select =
    selectArray.length > 0
      ? selectArray.reduce((acc: any, item: any) => {
          acc[item] = true;
          return acc;
        }, {})
      : undefined;

  return { take, skip, select };
}
