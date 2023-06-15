import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import CustomModal from "./components/CustomModal";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [giftsList, setGiftsList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedGif, setSelectedGif] = useState("");
  const [quantityResults, setQuantityResults] = useState(10);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleInputChange = async (val = "hello") => {
    setSearchValue(val);
    const response = await axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_API_URL}&q=${val}&offset=1&limit=${quantityResults}`
    );
    setGiftsList([...giftsList, ...response.data.data]);
  };

  const handleOpenModal = (selectedGif = "", idx = 0) => {
    setSelectedGif(selectedGif);
    setOpenModal(true);
    setCurrentIndex(idx)
  };

  useEffect(() => {
    handleInputChange();
  }, [quantityResults]);

  const handleNextStep = () => {
    if(currentIndex + 2 < giftsList.length) {
      const nextGif = giftsList.find((_, i) => i === currentIndex + 1)
      setCurrentIndex(currentIndex + 1 )
      setSelectedGif(nextGif.images.original.url)
    } else {
      console.log('ooo');
    }
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => handleInputChange(e.target.value)}
          style={{ margin: "1rem 0" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "2rem",
          flexWrap: "wrap",
        }}
      >
        {giftsList.map((gift, idx) => (
          <div
            key={gift.id}
            onClick={() => handleOpenModal(gift.images.original.url, idx)}
          >
            <img
              src={gift.images.original.url}
              alt=""
              width={100}
              height={100}
            />
          </div>
        ))}
      </div>
      <button onClick={() => setQuantityResults(quantityResults + 10)}>
        Load more...
      </button>
      <CustomModal
        img={selectedGif}
        open={openModal}
        handleClose={() => setOpenModal(false)}
        handleNextStep={handleNextStep}
      />
    </>
  );
}

export default App;
