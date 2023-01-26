import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import EventModal from "./EventModal";

export default () => {
  const [eData, setEdata]= useState([]);
  useEffect(()=>{
    axios.get("/eventGet").then((res)=>{console.log(res); setEdata(res.data)}).catch(err=>console.log(err));
  },[])
  console.log(eData);
  const [openModal, setOpenModal] = useState(true);
  const [hasCookie, setHasCookie] = useState(true);
  const [appCookies, setAppCookies] = useCookies(); 

  const getExpiredDate = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  };

  const closeModalUntilExpires = () => {
    if (!appCookies) return;

    const expires = getExpiredDate(1);
    setAppCookies("MODAL_EXPIRES", true, { path: "/", expires });

    setOpenModal(false);
  };

  useEffect(() => {
    if (appCookies["MODAL_EXPIRES"]) return;
    console.log(appCookies["MODAL_EXPIRES"]);
    setHasCookie(false);
  }, []);
  

  return (
    <div>
      {openModal && !hasCookie && <EventModal closeModal={() => setOpenModal(false)} closeModalUntilExpires={closeModalUntilExpires} eData={eData} />}
    </div>
  );
}