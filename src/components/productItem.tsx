import React from 'react';
import {MockData} from "../MOCK_DATA";


function ProductItem({
    productId,
    price,
    productName,
    boughtDate
                     }:MockData) {
    const date = new Date(boughtDate);
    const formattedDate = date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });


    return (
        <div className={"Product-Item"}>
            <div>상품명: {productName}</div>
            <div>가격: {price}</div>
            <div>구매일: {formattedDate}</div>
        </div>
    );
}

export default ProductItem;
