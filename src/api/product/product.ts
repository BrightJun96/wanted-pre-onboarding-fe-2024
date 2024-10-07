import {MOCK_DATA, MockData} from "../../MOCK_DATA";

export interface ProductListResponse{
    datas: MockData[]
    isEnd: boolean
}
// 한 페이지에 보여줄 상품 개수
const PER_PAGE = 10;

/**
 * 상품 목록 데이터를 가져오는 API
 */
// 페이지는 1부터 시작함
export const getMockData = (pageNum: number):Promise<ProductListResponse> => {
    return new Promise((resolve,reject) => {

        function mockDataCall(){
            const datas: MockData[] = MOCK_DATA.slice(
                PER_PAGE * pageNum,
                PER_PAGE * (pageNum + 1)
            );
            const isEnd = PER_PAGE * (pageNum + 1) >= MOCK_DATA.length;

            resolve({datas, isEnd});
        }


        if(pageNum===0){
            mockDataCall()
        }else if(pageNum>0){
            setTimeout(() => {
                mockDataCall()
            }, 1500);
        }else{
            reject("get MockData List error > pageNum is invalid");
        }



    });
};
