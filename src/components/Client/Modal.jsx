import React, { useState } from "react";
import { Modal, Input, Button, message } from "antd";
import axios from "axios";
import { baseUrl } from "../../helpers/api/baseUrl";

function ModalComponent({ isOpen, onClose }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userId, setUserId] = useState("");
  const [codeModal, setCodeModal] = useState(""); // Kod uchun state
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false); // Kod modali uchun state

  const handleConfirmPhone = () => {
    axios
      .post(`${baseUrl}user/login/`, { phone_number: phoneNumber })
      .then((res) => {
        message.success("Muvaffaqiyatli telefon raqam yuborildi!");
        const data = res.data;
        setUserId(data.user_id); // user_id ni saqlash
        setIsCodeModalOpen(true); // Keyingi modalni ochish
        onClose(); // Birinchi modalni yopish
      })
      .catch((err) => {
        console.log(err);
        message.error("Telefon raqam yuborilmadi.");
      });
  };

  const handleConfirmCode = () => {
    axios
      .post(`${baseUrl}user/verify/`, { code: codeModal, user_id: userId })
      .then((res) => {
        message.success("Kod muvaffaqiyatli tasdiqlandi!");
        const data = res.data;
        if(data.action_status === "register") {
          setIsCodeModalOpen(false); // Kod modali yopiladi
          setIsModalNameOpen(true);
        }else{
          setIsCodeModalOpen(false); // Kod modali yopiladi
          localStorage.setItem('userToken', data.access);
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Kod noto‘g‘ri.");
      });
  };

  const [isModalNameOpen, setIsModalNameOpen] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const handleConfirmName = () => {
    axios
      .post(
        `${baseUrl}user/post-user-info/`,
        { name: name, surname: surname, user_id: userId },
      )
      .then((res) => {
        message.success("Ism muvaffaqiyatli yuborildi!");
        localStorage.setItem('userToken', res.data.access);
        setIsModalNameOpen(false);
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        message.error("Xatolik yuz berdi.");
      });
  };

  return (
    <div>
      {/* Telefon raqami uchun modal */}
      <Modal
        open={isOpen}
        onOk={handleConfirmPhone}
        onCancel={onClose}
        okText="Kodni olish"
        cancelText="Bekor qilish"
        maskClosable={false}
        okButtonProps={{
          disabled: phoneNumber.length !== 13,
          style: {
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
          },
        }}
        styles={{
          body: {
            textAlign: "center",
            height: "120px"
          },
        }}
        width={450}
        centered
      >
        <p
          style={{
            fontSize: "17px",
            color: "#000",
            marginBottom: "20px",
            marginTop: "20px",
          }}
        >
          Tasdiqlash kodini SMS orqali yuboramiz
        </p>
        <Input
          //   value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="+998901234567"
          defaultValue={"+998"}
          style={{
            height: "40px",
            borderRadius: "5px",
          }}
        />
      </Modal>

      {/* Kodni kiritish uchun modal */}
      <Modal
        okText="Tasdiqlash"
        open={isCodeModalOpen}
        onOk={handleConfirmCode}
        onCancel={() => setIsCodeModalOpen(false)}
        okButtonProps={{
          disabled: codeModal.length !== 4,
          style: {
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            width: "100%",
            height: "40px",
            borderRadius: "5px",
          },
        }}
        cancelButtonProps={{ style: { display: "none" } }}
        centered
        styles={{
          body: {
            textAlign: "center",
            borderRadius: "10px",
            paddingBottom: "20px",
          },
        }}
        width={400}
      >
        <h3 style={{ fontSize: "20px", marginBottom: "25px" }}>
          Kodni kiriting
        </h3>
        <Input
          value={codeModal}
          onChange={(e) => setCodeModal(e.target.value)}
          placeholder="Kodni kiriting"
          style={{ height: "40px", borderRadius: "5px" }}
        />
      </Modal>
      <Modal
        okText="Saqlash"
        open={isModalNameOpen}
        onOk={handleConfirmName}
        okButtonProps={{
          disabled: !name || !surname,
          style: {
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            width: "100%",
            height: "40px",
            borderRadius: "5px",
            position: "relative",
            left: "-10px",
          },
        }}
        cancelButtonProps={{ style: { display: "none" } }}
        centered
        width={400}
        onCancel={() => setIsModalNameOpen(false)}
        styles={{
          body: {
            textAlign: "center",
            borderRadius: "10px",
            paddingBottom: "20px",
          },
        }}
      >
        <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>
          Ism va familiyangizni kiriting
        </h3>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ismingiz"
          style={{
            height: "40px",
            borderRadius: "5px",
            marginBottom: "20px",
            marginTop: "20px",
            border: "1px solid #ddd",
          }}
        />
        <Input
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          placeholder="Familiyangiz"
          style={{
            height: "40px",
            borderRadius: "5px",
            border: "1px solid #ddd",
          }}
        />
      </Modal>
    </div>
  );
}

export default ModalComponent;
