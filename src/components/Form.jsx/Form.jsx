import React, { useState } from "react";
import "./Form.css";
import memeData from "../../memeData";
const Form = () => {
  // const { data } = memeData;
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  // const [memeImage, setMemeImage] = useState("");
  const [allMemeImages, setAllMemeImages] = useState(memeData);

  React.useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemeImages(data.data.memes);
    }
    getMemes();
  }, []);

  function dataLog() {
    const randomNumber = Math.floor(Math.random() * allMemeImages.length);
    const url = allMemeImages[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  // function dataLog() {
  //   const memeArr = allMemeImages.data.memes;
  //   const random = Math.floor(Math.random() * memeArr.length);
  //   const url = memeArr[random].url;
  //   setMeme((prevMeme) => ({
  //     ...prevMeme,
  //     randomImage: url,
  //   }));
  // }
  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }
  return (
    <div className="form">
      <h2 className="meme-h2">Memes para los pibes del henry</h2>

      <div className="input-box">
        <input
          type="text"
          placeholder="Shut up"
          className="form--input"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        ></input>
        <input
          type="text"
          placeholder="And take my money"
          name="bottomText"
          className="form--input"
          value={meme.bottomText}
          onChange={handleChange}
        ></input>
      </div>
      <button className="button" onClick={dataLog} type="submit">
        Get a new meme image
      </button>
      {/* <img className="img-meme" src={meme.randomImage} alt="" /> */}
      <div className="meme ">
        <img src={meme.randomImage} className="meme--image img-meme" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </div>
  );
};

export default Form;
