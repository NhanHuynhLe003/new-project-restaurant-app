import React, { useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import styles from "../../../styles/cart/discountItemApply.module.css";
import { API, Amplify, Auth } from "aws-amplify";
import IAlert from "../../IComponent/IAlert";
import amplifyConfig from "../../../amplifyconfig.json";
import { useRouter } from "next/router";
const API_GW_NAME = "ag-manage-restaurant-project";
Amplify.configure(amplifyConfig);
export interface discountItemApplyProps {
  cartUserId: string;
  discountCode: string;
  discountValue: string;
  discountName?: string;
}
export default function DiscountItemApply({
  cartUserId,
  discountCode,
  discountValue,
  discountName,
}: discountItemApplyProps) {
  const router = useRouter();
  const btnRef = useRef<HTMLButtonElement>(null);
  const [isDeleteVouncher, setIsDeleteVouncher] = useState(false);
  const [isClickDeletingBtn, setIsClickDeletingBtn] = useState(false);
  async function handleDeleteVouncher() {
    setIsClickDeletingBtn(true);
    try {
      const bodyDiscountDel = {
        cart_userId: cartUserId, //user so huu cart, co the dung userId khi login
        cart_cartId: "cart_001", //tao ngau nhien
        cart_state: "active",
        discount_id: discountCode,
        discount_code: discountCode,
        // "del_discountOpt": "all"
      };

      await API.del(API_GW_NAME, `/carts/discount`, {
        body: bodyDiscountDel,
      }).then(() => router.push(`/cart/${cartUserId}`));
    } catch (err) {
      console.log(err);
    }
    setIsDeleteVouncher(false);
    setIsClickDeletingBtn(false);
  }

  return (
    <>
      <IAlert
        isActiveBtn1={isClickDeletingBtn}
        titleAlert="Hủy Vouncher"
        contentAlert="Bạn có chắc chẳn muốn hủy vouncher này chứ?"
        open={isDeleteVouncher}
        setOpen={setIsDeleteVouncher}
        fcActionBtn1={handleDeleteVouncher}
      />

      <div
        style={{
          width: "100%",
          margin: "0.75rem 0",
          boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.4rem",
          borderRadius: "0.25rem",
        }}
      >
        <span style={{ fontWeight: 500 }}>
          Vouncher{" "}
          <span style={{ fontWeight: "bold", color: "red" }}>
            {discountName}
          </span>{" "}
          - giảm giá{" "}
          <span style={{ fontWeight: "bold", color: "red" }}>
            {discountValue}
          </span>{" "}
          cho tổng đơn hàng{" "}
        </span>
        <button
          ref={btnRef}
          title="Hủy vouncher"
          className={styles.deleteButton}
          onClick={() => setIsDeleteVouncher(true)}
        >
          <FaTrash></FaTrash>
        </button>
      </div>
    </>
  );
}
