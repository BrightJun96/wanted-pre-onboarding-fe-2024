import React, {useEffect} from 'react';
import './App.css';
import ProductItem from "./components/productItem";
import useProductList from "./hooks/useProductList";



function App() {

 const {
     productList,
     getProductListApi,
     loading,
     totalProductAmount
 } = useProductList()

      const scrollContainerRef = React.useRef<HTMLDivElement>(null)
    const scrollEndRef = React.useRef<HTMLDivElement>(null)



    /**
     * 궁금한 사항
     * 1. IntersectionObserver를 왜 useEffect에서 사용하였는가?
     * 2. observer disconnect가 무엇인가?
     * 3. isFetching이란 변수를 왜 사용하였는가?
     * 4. scrollContainerRef를 왜 만들었는가?
     */

    useEffect(() => {
        if(scrollEndRef.current&&scrollContainerRef.current) {
            let page=1
            // 중복 호출 방지
            let isFetching = false;

            const observer = new IntersectionObserver(async (entries, observer) => {

                for (let entry of entries) {
                    // 교차 지점일 때 && 중복 호출 방지 && 데이터가 더 있을 때
                    if (entry.isIntersecting && !isFetching && !productList.isEnd) {
                        isFetching = true;
                        try {
                            await getProductListApi(page);  // API 호출이 완료될 때까지 기다림
                            page++;
                        } catch (error) {
                            console.error("Error fetching product list:", error);
                        } finally {
                            isFetching = false;  // API 호출이 완료되면 플래그 해제
                        }
                    }
                }
            }, {
                root: scrollContainerRef.current,
                rootMargin: "0px",
                threshold: 1.0
            });
            observer.observe(scrollEndRef.current)
            // Clean up observer on unmount
            return () => observer.disconnect();
        }

    }, [scrollEndRef.current,scrollContainerRef.current,productList.isEnd]);



  return (
      <div className="App">
          <span>노출된 상품 총 가격 :{totalProductAmount.toLocaleString()}원</span>
          <div
              className={"Product-List"}
              ref={scrollContainerRef}
          >
              {productList
                  .datas
                  .map(({
                            productId,
                            price,
                            productName,
                            boughtDate
                        }) =>
                      <ProductItem
                          key={productId}
                          productId={productId}
                          productName={productName}
                          price={price}
                          boughtDate={boughtDate}
                      />
                  )}
              {loading && <div>데이터 불러오는 중..</div>}
              <div
                  id={"scrollEnd"}
                  ref={scrollEndRef}
              ></div>

          </div>
      </div>
  );
}

export default App;
