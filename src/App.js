import { useState } from "react";
import tweets from "./tweets.json";
import "./styles.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteIcon from "@material-ui/icons/Delete";
import TwitterIcon from "@material-ui/icons/Twitter";

//https://pbs.twimg.com/profile_images/1423900874955395077/zY6JVdJ-_bigger.jpg
function DisplayHandler({ value }) {
  return (
    <div className="content-color">
      <div>
        <img src="https://pbs.twimg.com/profile_images/1423900874955395077/zY6JVdJ-_bigger.jpg" />
      </div>
      <div>
        <div>{value.name}</div>
        <div>{value.location}</div>
        <div>{value.descrtiption}</div>
      </div>
    </div>
  );
}

const PostTweet = ({ addTweet, removeText }) => {
  const [tweetInput, setTweetInput] = useState("");
  //const clickHandler = () => addTweet(tweetInput);
  function clickHandler() {
    addTweet(tweetInput);
    setTweetInput("");
  }
  // const textHandler = () => removeText(tweetInput);
  return (
    <div className="form-group">
      <textarea
        className="content-text"
        placeholder="Start Twitting"
        value={tweetInput}
        onChange={(e) => setTweetInput(e.target.value)}
      />

      <span className="icon-user">
        {" "}
        <TwitterIcon onClick={clickHandler} />{" "}
      </span>
    </div>
  );
};
// const RemoveTweet = ({ removeTweet }) => {
//   return (
//     <>
//       <button onClick={() => removeTweet()}> delete </button>
//     </>
//   );
// };
//<div className="mr">
//<button onClick={clickHandler}> Tweet </button>
//</div>

function Tweet({ data, onLikeChange, activityChecker, deleteHandler }) {
  return (
    <>
      <div className="tweet ">
        <div className="pd text-display text-control">{data.text}</div>
        <div className="mr-1">{data.like}</div>
        <div className="pd1">
          {activityChecker.some((ti) => ti === data.id) ? (
            <FavoriteIcon
              onClick={() => {
                onLikeChange(
                  data.id,
                  !activityChecker.some((ti) => {
                    //console.log(ti, "Hii ti");
                    //console.log(ti, "Hii t");
                    return ti === data.id;
                  })
                );
              }}
            />
          ) : (
            <FavoriteBorderIcon
              onClick={() => {
                onLikeChange(
                  data.id,
                  !activityChecker.some((ti) => {
                    //console.log(ti, "Hii ti");
                    //console.log(ti, "Hii t");
                    return ti === data.id;
                  })
                );
              }}
            />
          )}
        </div>
        <div>
          <DeleteIcon onClick={() => deleteHandler(data.id)} />
        </div>
      </div>
    </>
  );
}
// function Like({ like }) {
//   return
// }

//<img src={`https://twitter.com/fraindz/photo`}  />
function TweetList({ tweets, onLikeChange, activityChecker, deleteHandler }) {
  //console.log(activityChecker);
  // function checker(){

  //  return activityChecker.some(activityChecker.id === tweets.id)
  // }
  //console.log(activityChecker);
  //console.log(onLikeChange(tweets.id))
  //console.log(tweets);
  return (
    <div className="tweet-container">
      {tweets.map((t) => {
        //console.log(activityChecker.some((ti) => t.id === ti.id));
        //console.log(t);
        return (
          <div>
            <Tweet
              data={t}
              activityChecker={activityChecker}
              onLikeChange={onLikeChange}
              deleteHandler={deleteHandler}
            />
          </div>
        );
      })}
    </div>
  );
}

// function TweetOperations({ tweetCount }) {
//   return <div> {tweetCount}</div>;
// }
//<img src={`https://twitter.com/fraindz/photo`} />

/*
For user image: https://twitter.com/fraindz/photo

UserDetailSection
- Name, Image, Descrtiption, Location

New Tweet Section
Text Area & button to save the new tweet

Tweets
List of tweets, like option & delete option for each tweets

array.some()
*/

export default function App() {
  const [likedByUser, setLikedByUser] = useState([""]);
  const [tweets, setTweets] = useState([
    { id: "t1", text: "First Tweeet", like: 3 },
    { id: "t2", text: "Second Tweeet", like: 4 }
  ]);
  const [displayDetails, setDisplayDetails] = useState({
    name: "Harsh Shah",
    location: "Gandhinagar",
    descrtiption: "A strategic gammer finding his way out to learn how to code!"
  });

  // const removeTweet = (delTweet) => {
  //   const reTweets = [...tweets];
  //   reTweets.splice(delTweet, 1);
  //   setTweets(reTweets);
  // };

  // const removeLike = (del) => {
  //   const remLike = [...likedByUser];
  //   remLike.slice(del, 1);
  //   setLikedByUser(remLike);
  // };
  //console.log(likedByUser);
  const addNewTweet = (newTweet) => {
    setTweets([...tweets, { id: newTweet, text: newTweet, like: 0 }]);
  };
  const removeText = (text) => {
    setTweets([...tweets]);
  };
  // const likeChangeHandler = () => {

  //   let newLike = tweets.like + 1;
  //   setTweets(newLike);
  // };
  const deleteHandler = (tweetId) => {
    const deleteTweet = tweets.filter((t) => t.id !== tweetId);

    setTweets(deleteTweet);

    //return del;
  };

  const likeChangeHandler = (tweetID, liked) => {
    //console.log(tweetID);
    //console.log(liked);
    const updatedtweet = tweets.find((t) => t.id === tweetID);

    //console.log("Hii", liked);
    // updatedtweet.like += 1;
    updatedtweet.like =
      liked === true ? (updatedtweet.like += 1) : (updatedtweet.like -= 1);
    //console.log(updatedtweet);
    //if liked
    setTweets(function (prev) {
      const updated = [...prev];
      updated[tweetID] = updatedtweet;
      return updated;
    });
    // liked === true ? upda +=1 : upda -= 1

    if (liked) {
      setLikedByUser(function (prev) {
        return [...prev, updatedtweet.id];
      });
    } else {
      setLikedByUser(likedByUser.filter((t) => t !== updatedtweet.id));
    }
    // console.log(likedByUser);
  };
  // likedbyuser !== updatedtweet.id ? upd.push(updatedtweet.id) : pop();
  //console.log(likeChangeHandler);
  //Add tweetId to likedByUser
  //Update tweet count for the tweet in tweets array
  //else
  //Remove tweetId from likedByUser
  //Decrement tweet count

  return (
    <>
      <div className="pd-1">
        <DisplayHandler value={displayDetails} />
      </div>
      <div className="pd-1">
        <TweetList
          tweets={tweets}
          like={tweets}
          onLikeChange={likeChangeHandler}
          activityChecker={likedByUser}
          deleteHandler={deleteHandler}
        />
      </div>
      <div className="pd-1">
        <PostTweet addTweet={addNewTweet} removeText={removeText} />
      </div>
    </>
  );
}
