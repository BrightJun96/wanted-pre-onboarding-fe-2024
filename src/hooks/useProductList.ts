import React, {useEffect} from "react";
import {getMockData, ProductListResponse} from "../api/product/product";

function useProductList(){

    const [productList, setProductList] = React.useState<ProductListResponse>({datas: [], isEnd: false})
    const [loading, setLoading] = React.useState<boolean>(false)
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
        loading
    }
}

export default useProductList;
