SELECT subdivision_id FROM collaborators WHERE id = 710253;

;WITH RecursiveSubs AS (
  SELECT id, name, parent_id, 0 AS level
  FROM subdivisions
  WHERE id = (
    SELECT subdivision_id FROM collaborators WHERE id = 710253
  )

  UNION ALL

  SELECT s.id, s.name, s.parent_id, rs.level + 1
  FROM subdivisions s
  JOIN RecursiveSubs rs ON s.parent_id = rs.id
),
FilteredSubs AS (
  SELECT * FROM RecursiveSubs
  WHERE id NOT IN (100055, 100059)
),
FilteredCollaborators AS (
  SELECT c.id, c.name, c.subdivision_id, c.age, fs.name AS sub_name, fs.level AS sub_level
  FROM collaborators c
  JOIN FilteredSubs fs ON c.subdivision_id = fs.id
  WHERE c.age < 40
),
CollCounts AS (
  SELECT subdivision_id, COUNT(*) AS colls_count
  FROM collaborators
  GROUP BY subdivision_id
)

SELECT
  fc.id,
  fc.name,
  fc.subdivision_id AS sub_id,
  fc.sub_name,
  fc.sub_level,
  ISNULL(cc.colls_count, 0) AS colls_count
FROM FilteredCollaborators fc
LEFT JOIN CollCounts cc ON fc.subdivision_id = cc.subdivision_id
ORDER BY fc.sub_level ASC;
