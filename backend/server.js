import express, { response } from "express";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import cors from "cors";
import pg from "pg";

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
//app.use(cors());
app.use(cookieParser());
app.use(express.json());

const client = new pg.Pool({
  user: "postgres",
  password: "admin", //replace with postgre password
  host: "localhost",
  port: 5433, //replace with postgre port
  database: "estate",
});

// const user = [
//   {
//     id: 1,
//     username: "nick",
//     password: "nick123",
//     email: "nick@gmail.com",
//     avatar: "avatar.png",
//   },
// ];
//Add this to env file
const JWT_SECRET_KEY = "SecretKayReplaceWithEnv";

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/api/auth/register", async (req, res) => {
  const { username, email, password } = req.body;
  //hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed password: " + hashedPassword);
  const result = await client
    .query(
      `INSERT INTO "User" (email, username, password)
VALUES ('${email}','${username}','${hashedPassword}');`
    )
    .then(() => {
      res.send("Registering user");
    });
  //create new user and save to database
  console.log(req.body);
});

app.post("/api/auth/login", async (req, res) => {
  console.log(req.body);
  const currentUsername = req.body.username;
  // const encryptedPassword = async () => {
  //     return (
  //         await bcrypt.hash(user[0].password,10)
  //     )
  // }

  const result = await client.query(
    `select * from "User" where username='${currentUsername}';`
  );
  if (result.rowCount > 0) {
    const user = result.rows;
    console.log("Hashed password from DB:", user[0].password);

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user[0].password
    );
    if (currentUsername == user[0].username && isPasswordValid) {
      //replace username and password with database when you create it !
      console.log("Password matches ! ");

      const age = 1000 * 60 * 60 * 24 * 7;

      const token = jwt.sign(
        {
          id: user.id,
        },
        JWT_SECRET_KEY,
        { expiresIn: age }
      );

      const { password: userPassword, ...userInfo } = user[0];

      res
        .cookie("token", token, {
          httpOnly: true,
          //secure:true enable if you deploy
          maxAge: age,
        })
        .status(200)
        .json(userInfo);
    } else {
      console.log("Passwords doesnt match");
      // res.status(500).json({message: "Failed to log in!"});
      res.json({ message: "No valid user" });
    }
  }
});

app.post("/api/auth/logout", (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful!" });
});

app.get("/api/auth/shouldBeLoggedIn", async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });
  jwt.verify(token, JWT_SECRET_KEY, async (err, payload) => {
    if (err) return res.status(403).json({ message: "Token not Valid!" });
  });

  res.status(200).json({ message: "You are authenticated" });
});

app.post("/api/auth/updateProfile", async (req, res) => {
  const id = req.body.id;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const avatar = req.body.avatar;
  console.log(
    "Trying to update the user,new info : " + username,
    email,
    password,
    avatar
  );
  if (username) {
    const result = await client
      .query(
        `UPDATE "User"
        SET username = '${username}'
        WHERE id = '${id}';`
      )
      .then(() => {
        console.log("Updated username");
        res.json({ message: "ok" });
      })
      .catch((error) => res.json({ message: "error" }));
  }
  if (email) {
    console.log("Update email" + email);
    const result = await client
      .query(
        `UPDATE "User"
        SET email = '${email}'
        WHERE id = '${id}';`
      )
      .then(() => {
        res.json({ message: "ok" });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  if (password) {
    console.log("Update password");
  }
  if (avatar) {
    console.log("Chaning avatar");
    const result = await client
      .query(
        `UPDATE "User"
        SET avatar = '${avatar}'
        WHERE id = '${id}';`
      )
      .then(() => {
        res.json({ message: "ok" });
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

app.get("/api/auth/getDetails/:id", async (req, res) => {
  const postId = req.body.postId;
  const params = req.params;
  console.log("id given" + params.id);
  const query = `SELECT 
    "PostDetail".*,                 -- All columns from PostDetail
    "User".username,
    "User".avatar                 -- Username from User table
FROM 
    "PostDetail"
JOIN 
    "Post" ON "PostDetail".postId = "Post".id  -- Join PostDetail with Post
JOIN 
    "User" ON "Post".userId = "User".id        -- Join Post with User
WHERE 
    "PostDetail".postId ='${params.id}' ;  `;

  const result = await client
    .query(query)
    .then((response) => {
      console.log(response.rows[0]);
      if (response.rowCount > 0) {
        res.send(response.rows[0]);
      } else {
        res.json({ message: "no details found" });
      }
    })
    .catch((error) => console.log(error));
  console.log("ID GIVEN TO GET DESC: " + params.id);
});

app.get("/api/auth/getPosts", async (req, res) => {
  const result = await client
    .query('select * from "Post"')
    .then((response) => {
      res.send(response.rows);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/api/auth/addPost", async (req, res) => {
  const {
    title,
    price,
    images,
    address,
    city,
    bedroom,
    bathroom,
    latitude,
    longitude,
    type,
    property,
    userId,
  } = req.body;

  try {
    const result = await client.query(
      `
      INSERT INTO "Post" (title, price, images, address, city, bedroom, bathroom, latitude, longitude, type, property, userId)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING id;
    `,
      [
        title,
        price,
        images,
        address,
        city,
        bedroom,
        bathroom,
        latitude,
        longitude,
        type,
        property,
        userId,
      ]
    );

    res.status(201).json({ id: result.rows[0].id });
  } catch (error) {
    console.error("Error inserting post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/auth/addPostDetails", async (req, res) => {
  const { desc, utilities, pet, income, size, school, postId } = req.body;

  try {
    await client.query(
      `
      INSERT INTO "PostDetail" (description, utilities, pet, income, size, school, postId)
      VALUES ($1, $2, $3, $4, $5, $6, $7);
    `,
      [desc, utilities, pet, income, size, school, postId]
    );

    res.status(201).json({ message: "Post details inserted successfully" });
  } catch (error) {
    console.error("Error inserting post details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/auth/getUserPost/:id", async (req, res) => {
  const id = req.params.id;
  console.log("test" + id);
  await client
    .query(`select * from "Post" where userId='${id}'`)
    .then((response) => {
      if (response.rowCount > 0) {
        res.json(response.rows);
      }
    })
    .catch((error) => console.log(error));
});

app.post("/api/auth/savePost", async (req, res) => {
  const { userId, postId, action } = req.body;

  try {
    if (action === "save") {
      console.log(
        "User with id : " +
          userId +
          " is trying to save post with Id : " +
          postId
      );

      await client.query(
        `INSERT INTO "SavedPost" (userId, postId)
        VALUES ($1, $2) ON CONFLICT DO NOTHING;`,
        [userId, postId]
      );

      res.json({ success: true, message: "Post saved" });
    } else if (action === "remove") {
      console.log(
        "User with id " +
          userId +
          " is trying to remove post with Id: " +
          postId
      );

      await client.query(
        `DELETE FROM "SavedPost"
        WHERE userId = $1
        AND postId = $2;`,
        [userId, postId]
      );

      res.json({ success: true, message: "Post removed" });
    } else {
      res.status(400).json({ success: false, message: "Invalid action" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/api/auth/checkIfSaved", async (req, res) => {
  const { userId, postId } = req.body;

  console.log(
    "Checking if user with id " + userId + " has saved post with id: " + postId
  );

  try {
    const response = await client.query(
      `SELECT * FROM "SavedPost" 
       WHERE userId = $1 AND postId = $2;`,
      [userId, postId]
    );

    if (response.rowCount > 0) {
      console.log("Post is saved to list");
      res.json({ message: "saved" });
    } else {
      console.log("Post is not saved");
      res.json({ message: "notSaved" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/api/auth/getSavedPosts", async (req, res) => {
  const id = req.body.id;
  console.log("---id : " + id);

  try {
    const response = await client.query(
      `SELECT * FROM "SavedPost" WHERE userId = $1`,
      [id]
    );

    let postsId = response.rows.map((item) => item.postid);

    if (postsId.length === 0) {
      return res.json([]);
    }
    const postQueries = postsId.map((postId) => {
      return client.query(`SELECT * FROM "Post" WHERE id = $1`, [postId]);
    });

    const postResults = await Promise.all(postQueries);

    const posts = postResults.flatMap((result) => result.rows);

    res.json(posts);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving saved posts" });
  }
});

app.post("/api/auth/createChat", async (req, res) => {
  const sender = req.body.sender;
  const receiver = req.body.receiver;
  const message = req.body.message;

  const result = await client.query(`
      SELECT id FROM "Chat"
      WHERE (user1 = '${sender}' AND user2 = '${receiver}') OR (user1 = '${sender}' AND user2 = '${receiver}')
    `);

  if (result.rows.length > 0) {
    console.log("Chat exists with id : " + result.rows[0].id);
    res.json({ message: "Exists", chatid: result.rows[0].id });
  } else {
    console.log("Chat doesnt exists need to create one");
    const newChat = await client.query(
      `
        INSERT INTO "Chat" (user1, user2, seenBy, lastMessage)
        VALUES ('${sender}', '${receiver}', NULL, '${message}')
        returning id;
      `
    );
    console.log("Created a new chat with id : " + newChat.rows[0].id);
    res.send(newChat.rows[0].id);
  }
});

app.post("/api/auth/addMessage", async (req, res) => {
  const message = req.body.message;
  const userid = req.body.userid;
  const chatid = req.body.chatid;

  try {
    const result = await client.query(`
        insert into "Message" (text,userid,chatid)
        values ('${message}','${userid}','${chatid}')
      `);

    await client.query(`
          update "Chat"
          set lastMessage = '${message}'
          where id = '${chatid}'
        `);
    console.log("Message added");
  } catch (err) {
    console.log(err);
    throw err;
  }
});

app.get("/api/auth/getCities", async (req, res) => {
  const result = await client
    .query('select distinct city from "Post"')
    .then((response) => res.send(response.rows))
    .catch((err) => console.log(err));
});

app.listen(8000, () => {
  console.log("Server listening to port 8000");
});
