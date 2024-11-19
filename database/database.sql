/*
Users
    user_id (INT, Primary Key, Auto Increment)
    username (VARCHAR, Unique, Not Null)
    email (VARCHAR, Unique, Not Null)
    password (VARCHAR, Not Null)
    created_at (DATETIME, Default: CURRENT_TIMESTAMP)
    updated_at (DATETIME, Default: CURRENT_TIMESTAMP)

Posts
    post_id (INT, Primary Key, Auto Increment)
    user_id (INT, Foreign Key referencing Users.user_id)
    title (VARCHAR, Not Null)
    content (TEXT, Not Null)
    created_at (DATETIME, Default: CURRENT_TIMESTAMP)
    updated_at (DATETIME, Default: CURRENT_TIMESTAMP)

Comments
    comment_id (INT, Primary Key, Auto Increment)
    post_id (INT, Foreign Key referencing Posts.post_id)
    user_id (INT, Foreign Key referencing Users.user_id)
    content (TEXT, Not Null)
    created_at (DATETIME, Default: CURRENT_TIMESTAMP)
*/

CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT, -- Unique user ID, auto-incremented
    username VARCHAR(50) NOT NULL UNIQUE,   -- Username, must be unique and not null
    email VARCHAR(100) NOT NULL UNIQUE,     -- Email, must be unique and not null
    password VARCHAR(255) NOT NULL,         -- User's password, cannot be null
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the user is created
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Timestamp updated on user modification
);

-- Table for storing posts made by users
CREATE TABLE Posts (
    post_id INT PRIMARY KEY AUTO_INCREMENT, -- Unique post ID, auto-incremented
    user_id INT NOT NULL,                   -- ID of the user who created the post (Foreign Key)
    title VARCHAR(255) NOT NULL,            -- Title of the post, cannot be null
    content TEXT NOT NULL,                  -- Content of the post, cannot be null
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the post is created
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Timestamp updated on post modification
    FOREIGN KEY (user_id) REFERENCES Users(user_id) -- Foreign Key linking to Users table
        ON DELETE CASCADE                    -- Deletes post if the user is deleted
        ON UPDATE CASCADE                    -- Updates user_id in posts if it changes in Users table
);

-- Table for storing comments on posts
CREATE TABLE Comments (
    comment_id INT PRIMARY KEY AUTO_INCREMENT, -- Unique comment ID, auto-incremented
    post_id INT NOT NULL,                      -- ID of the post being commented on (Foreign Key)
    user_id INT NOT NULL,                      -- ID of the user who made the comment (Foreign Key)
    content TEXT NOT NULL,                     -- Content of the comment, cannot be null
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the comment is created
    FOREIGN KEY (post_id) REFERENCES Posts(post_id) -- Foreign Key linking to Posts table
        ON DELETE CASCADE                      -- Deletes comment if the related post is deleted
        ON UPDATE CASCADE,                     -- Updates post_id in comments if it changes in Posts table
    FOREIGN KEY (user_id) REFERENCES Users(user_id) -- Foreign Key linking to Users table
        ON DELETE CASCADE                      -- Deletes comment if the user is deleted
        ON UPDATE CASCADE                      -- Updates user_id in comments if it changes in Users table
);

-- This query retrieves all posts made by a specific user.
-- Replace [SPECIFIC_USER_ID] with the actual user ID you want to filter by.

SELECT 
    post_id,         -- The unique ID of the post
    title,           -- The title of the post
    content,         -- The content of the post
    created_at       -- The date and time when the post was created
FROM 
    Posts
WHERE 
    user_id = [SPECIFIC_USER_ID]  -- Filter to only get posts from a specific user
ORDER BY 
    created_at DESC;  -- Sort the results by the creation date in descending order (newest first)

-- This query counts the number of comments on a specific post.
-- Replace [SPECIFIC_POST_ID] with the actual post ID you want to filter by.

SELECT 
    COUNT(*) AS comment_count  -- Count the total number of comments for a specific post
FROM 
    Comments
WHERE 
    post_id = [SPECIFIC_POST_ID];  -- Filter to only count comments related to a specific post
