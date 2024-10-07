import React, {useEffect, useMemo} from "react";
import {getMockData, ProductListResponse} from "../api/product/product";

function useProductList(){

    // 상품 목록 데이터 정보
    const [productList, setProductList] = React.useState<ProductListResponse>({datas: [], isEnd: false})
    // 로딩 상태
    const [loading, setLoading] = React.useState<boolean>(false)
    // 상품 총 가격
    const totalProductAmount = useMemo(() => productList.datas.reduce((acc, cur) => acc + cur.price, 0),[productList.datas])
    // console.log("productList", productList)
    /**
     * 상품 목록
     */
    async function getProductListApi(page:number){
        setLoading(true)
        const data = await getMockData(page)
        setProductList(prev => ({
            isEnd: data.isEnd,
            datas: [...prev.datas, ...data.datas],
        }))
        setLoading(false)
    }
    useEffect(() => {


        getProductListApi(0)

    },[])

    return {
        productList,
        getProductListApi,
        loading,
        totalProductAmount
    }
}

export default useProductList;
