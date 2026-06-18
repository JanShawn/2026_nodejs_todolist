-- 作業一：班級為外來鍵
-- 作業二：會將老師名稱放在班級資料表中，並且在學生資料表中使用外來鍵 classroom_id 來連結班級資料表。
   --有個疑惑，為什麼同一個班級老師不同... 

-- 建立班級資料表
CREATE TABLE classroom (
  id SERIAL PRIMARY KEY, -- 班級編號，主鍵
  class_name VARCHAR(50), -- 班級名稱
  teacher_name VARCHAR(50) -- 老師名稱
);

-- 建立國小資料表
CREATE TABLE school (
  id SERIAL PRIMARY KEY, -- 學生編號，主鍵
  name VARCHAR(50), -- 姓名
  sex VARCHAR(10), -- 性別
  age INTEGER, -- 年齡
  classroom_id INTEGER, --班級，外來鍵
  FOREIGN KEY (classroom_id) REFERENCES classroom (id)
);

-- 新增班級資料表
INSERT INTO
  classroom (class_name, teacher_name)
VALUES
  ('三年一班', '張老師'),
  ('三年二班', '李老師');

-- 新增學生資料表
INSERT INTO
  school (name, sex, age, classroom_id)
VALUES
  ('小明', '男', 8, 1),
  ('小華', '女', 9, 2),
  ('小美', '男', 8, 1),
  ('小強', '女', 8, 1),
  ('小智', '男', 9, 2);

-- 查詢學生資料表，並且顯示班級名稱和老師名稱
SELECT
  school.name,
  classroom.class_name AS 班級名稱,
  classroom.teacher_name AS 老師
FROM
  school
  INNER JOIN classroom ON school.classroom_id = classroom.id


-- 作業三：將父母獨立一張表，並且在學生資料表中使用外來鍵 parent_id 來連結父母資料表。

-- 建立父母資料表
CREATE TABLE parent (
  id SERIAL PRIMARY KEY, -- 編號，主鍵
  guardian_name VARCHAR(50), -- 監護人姓名
  guardian_phone VARCHAR(20), -- 監護人電話
  guardian_sex VARCHAR(10) -- 監護人性別
);

-- 小孩資料表新增 parent_id 欄位
CREATE TABLE kids(
    id SERIAL PRIMARY KEY, -- 小孩編號，主鍵
    name VARCHAR(50), -- 姓名
    parent_id INTEGER, -- 父母，外來鍵
    FOREIGN KEY (parent_id) REFERENCES parent (id)
);

-- 新增父母資料
INSERT INTO
  parent (guardian_name, guardian_phone, guardian_sex)
VALUES
  ('王大祥', '0973254254', '男'),
  ('王曉如', '0955717855', '女');

-- 新增小孩資料
INSERT INTO
  kids (name, parent_id)
VALUES
  ('小明', 1),
  ('小華', 2),
  ('小美', 1),
  ('小強', 2),
  ('小智', 1);

-- 查詢小孩資料表，並且顯示父母姓名
SELECT
  kids.name,
  parent.guardian_name AS 父母姓名,
  parent.guardian_phone AS 父母電話,
  parent.guardian_sex AS 父母性別
FROM
  kids
  INNER JOIN parent ON kids.parent_id = parent.id;