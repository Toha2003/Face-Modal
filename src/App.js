import { useEffect, useState } from "react";
import Facemodale from "./component/Facemodale";


function App() {
  const [text, setText] = useState("");

  const [data, setData] = useState([]);


  function inputTextFunc(event) {
    const value = event.target.value
    setText(value)
  }

  function handleClick(e) {
    e.preventDefault()

    if (text.trim().length > 0) {
      setData((prev) => [...prev, text]);
      setText("");
    } else {
      console.log("Ma'lumotni kiritishingiz kerak!");
    }
  }

  // localStorage'dan ma'lumotlarni olish
  useEffect(() => {
    const storedData = localStorage.getItem("chatData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  // inputdan kiritilgan ma'lumotlarni localStorage'ga saqlash
  useEffect(() => {
    localStorage.setItem("chatData", JSON.stringify(data));
  }, [data]);


  return (
    <div style={{ height: "100vh" }} className="App">
      <div className="h-100 container w-50 d-flex flex-column justify-content-center align-items-center">
        <h1 className="text-primary pb-2">Online Chat</h1>

        {
          data && data.map((item, index) => {
            return (<div key={index} style={{ width: "40%" }} className="d-block pt-1 px-2">
              <p className="d-inline-block data-paragrif" >{item}</p>
            </div>)
          })
        }

        <form className="pt-4" onSubmit={handleClick}>
          <input onChange={inputTextFunc} type="text" value={text} className="form-control p-2" placeholder="Message" />
          <button className="btn btn-primary w-100 my-3 p-3" type="submit">Button</button>
        </form>

      </div>

      <Facemodale/>
    </div>
  );
}

export default App;
