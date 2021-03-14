Simple GraphQL project which replicates Reddit style posts. Created for my GraphQL class in BCIT.


**RUNNING THE SERVER**

    node index.js


**QUERIES**
-

**GET POST BY TOPIC**

    query {
      getPostByTopic(topic: "School"){
        topic
        id
      }
    }

**GET POST BY ID**

    query {
      getPostByID(id: "bsh7v9"){
        id
        topic
        comments
      }
    }


**MUTATIONS**
-


**CREATE POST**

    mutation {
      createPost(created_by: "Kraz", topic: "School", id:"" body: "TEST123", comments: []) {
        created_by
        topic
        id
        body
        comments
      }
    }

**CREATE COMMENT (BE SURE TO PASTE THE ID GENERATED FROM createPost INTO THE "idpost" FIELD TO ATTACH A COMMENT TO A POST)**

    mutation {
      createComment(user: "Krazzers", msg: "123", id: "", response: [], idpost: "") {
        user
        msg
        id
        idpost
      }
    }

**CREATE RESPONSE (BE SURE TO PASTE THE ID GENERATED FROM createComment INTO THE "idcomment" FIELD TO ATTACH A RESPONSE TO A COMMENT)**

    mutation {
      createResponse (idcomment: "", msg: "123123123123123123") {
        msg
      }
    }


**SUBSCRIPTION**
-

Subscribe to a post when you create it (replicates reddit system where post author gets automatically subscribed to their own posts)

After the subscription is listening, create a new post and go back to the subscription tab on apollo client to see the results.

    subscription {
      newPost {
        id
        topic
        created_by
        body
        comments
      }
    }


**VIEWING ATTACHED COMMENTS TO POST**
-

After creating a post, creating a comment that attaches to a post, and creating a response that attaches to the comment you can view the result by going back and running
the getPostByID query for the speicifc post ID which has the comments and reply already attached to it.

For example: I create a post with ID "123". I then create a comment with ID "999" which attaches to post id "123".

To view the comments all I would have to go is run the getPostByID query for post ID "123" and I would get the following results:

    "data": {
        "getPostByID": [
          {
            "id": "123",
            "topic": "School",
            "comments": [
              "Hello"
            ]
          }
        ]
      }
    }


