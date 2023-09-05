export const queryReportsProduct = `
  SELECT
    c.id as categoryId,
    c.name as categoryName,
    p.id as productId,
    p.name as productName,
    p.stock
  FROM
    products p
  INNER JOIN
    categories c
  ON
    p.category_id = c.id
  WHERE
    p.created_at BETWEEN ? AND ?;
`