-- create a table to start
CREATE TABLE tasks (
	"id" serial PRIMARY KEY,
	"task" varchar(180),
	"complete" boolean default false
	);
	

    -- add rows and columns to the table
	INSERT INTO "tasks" ( "task", "complete")
VALUES ('task to do', false);

-- sql to target data in my table
SELECT tasks FROM "tasks";
-- sql for my delete request
DELETE * FROM "tasks" WHERE "id" = 1;
-- sql for my put request
UPDATE tasks SET "complete" = true WHERE id=1;