USE quick_commerce;
DESCRIBE users;
desc users;
-- SELECT
SELECT * FROM users;
SELECT * FROM products;
-- SELECT


--
-- Step 1: Create a new column with the correct ENUM values
-- ALTER TABLE users ADD COLUMN new_role ENUM('ADMIN', 'CUSTOMER', 'DELIVERY_PERSON') NOT NULL DEFAULT 'CUSTOMER';

-- Step 2: Copy existing values to the new column (Replacing 'USER' with 'CUSTOMER')
-- UPDATE users SET new_role = 'CUSTOMER' WHERE role = 'USER';
-- UPDATE users SET new_role = role WHERE role IN ('ADMIN', 'CUSTOMER', 'DELIVERY_PERSON');

-- Step 3: Drop the old column
-- ALTER TABLE users DROP COLUMN role;

-- Step 4: Rename the new column to 'role'
-- ALTER TABLE users CHANGE new_role role ENUM('ADMIN', 'CUSTOMER', 'DELIVERY_PERSON') NOT NULL;

--