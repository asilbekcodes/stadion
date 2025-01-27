import React, { useState, useEffect } from "react";
import { Modal, Input, Button, message } from "antd";
import axios from "axios";
import { baseUrl } from "../../helpers/api/baseUrl";
import { toast } from "react-toastify";

function ModalComponent({ isOpen, onClose }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userId, setUserId] = useState("");
  const [codeModal, setCodeModal] = useState("");
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isModalNameOpen, setIsModalNameOpen] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [timer, setTimer] = useState();

  useEffect(() => {
    if (isCodeModalOpen && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval); // Tozalash
    }
  }, [isCodeModalOpen, timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleConfirmPhone = () => {
    axios
      .post(`${baseUrl}user/login/`, { phone_number: phoneNumber })
      .then((res) => {
        message.success("Muvaffaqiyatli telefon raqam yuborildi!");
        const data = res.data;
        setUserId(data.user_id);
        setIsCodeModalOpen(true);
        setTimer(res.data.expire_time * 60); // 5 daqiqa hisoblagichni qayta o'rnatish
        onClose();
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  };

  const handleConfirmCode = () => {
    if (timer <= 0) {
      message.error("Kodning amal qilish muddati tugadi.");
      return;
    }

    axios
      .post(`${baseUrl}user/verify/`, { code: codeModal, user_id: userId })
      .then((res) => {
        message.success("Kod muvaffaqiyatli tasdiqlandi!");
        const data = res.data;
        if (data.action_status === "register") {
          setIsCodeModalOpen(false);
          setIsModalNameOpen(true);
        } else {
          setIsCodeModalOpen(false);
          localStorage.setItem("userToken", data.access);
          window.location.reload();
        }
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  };

  const handleConfirmName = () => {
    axios
      .post(`${baseUrl}user/post-user-info/`, {
        name: name,
        surname: surname,
        user_id: userId,
      })
      .then((res) => {
        message.success("Ism muvaffaqiyatli yuborildi!");
        localStorage.setItem("userToken", res.data.access);
        setIsModalNameOpen(false);
        window.location.reload();
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  };

  const resentSms = () => {
    axios
      .post(`${baseUrl}user/resend-sms/`, { phone_number: phoneNumber })
      .then((res) => {
        toast.success(res.data.message);
        setTimer(300); // 5 daqiqa hisoblagichni qayta o'rnatish
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
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
            height: "120px",
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
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="+998901234567"
          defaultValue={"+998"}
          style={{
            height: "40px",
            borderRadius: "5px",
          }}
        />
      </Modal>

      <Modal
        okText="Tasdiqlash"
        open={isCodeModalOpen}
        onOk={handleConfirmCode}
        onCancel={() => setIsCodeModalOpen(false)}
        okButtonProps={{
          disabled: codeModal.length !== 4 || timer <= 0,
          style: {
            backgroundColor: timer > 0 ? "#28a745" : "#ccc",
            color: "#fff",
            border: "none",
            width: "100%",
            height: "40px",
            borderRadius: "5px",
            position: "relative",
            right: "8px",
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
        <div className="flex justify-between items-center mt-3">
          <span className="text-lg">{formatTime(timer)}</span>
          <button
            onClick={resentSms}
            disabled={timer > 0} // Vaqt tugamaguncha disable bo'ladi
            className={`px-2 py-1 rounded-md text-white ${timer > 0 ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-500"
              }`}
          >
            Kodni qayta yuborish
          </button>
        </div>
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
