import React, { useEffect, useState } from 'react'
import mockData from './data.json';
import './style.css'
function Pagination() {
    const PER_PAGE = 100;
    const MAX_BUTTONS_TO_SHOW = 5
    const totalRecords = mockData.length;
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [pagesData, setPagesData] = useState({})
    const [visibleButtons, setVisibleButtons] = useState([])
    useEffect(() => {
        if (totalRecords > 0) {
            const firstPageData = mockData.slice(0, PER_PAGE)
            setData(mockData)
            const totalPagesCount = Math.ceil(totalRecords / PER_PAGE)
            setTotalPages(totalPagesCount)
            const pagesDataCopy = {}
            if (firstPageData.length > 0) {
                setCurrentPage(1)
                for (let i = 1; i <= totalPagesCount; i++) {
                    pagesDataCopy[i] = []
                }
                // setPagesData(pagesDataCopy)
                setPagesData({ ...pagesDataCopy, '1': firstPageData })
            }
            const pagesLength = Object.keys(pagesDataCopy).length
            console.log('here', pagesDataCopy)
            const pageButtons = []
            if(pagesLength <= MAX_BUTTONS_TO_SHOW ){
                for(let i = 1; i<=pagesLength; i++)
                {
                    pageButtons.push(i)
                }
                setVisibleButtons(pageButtons)
            }else{
                 for(let i = 1; i<=5; i++)
                {
                    pageButtons.push(i)
                }
                setVisibleButtons(pageButtons)
            }
        }
    }, [])
    console.log('data', visibleButtons)
    const onNext = () => {
        let pageButtons = [...visibleButtons]
        const buttonsCount = Object.keys(pagesData).length
        const lastPageButtonNumber = (visibleButtons[visibleButtons.length-1])
        if(currentPage < buttonsCount){
            setCurrentPage(currentPage+1)
            if(lastPageButtonNumber < buttonsCount){
            pageButtons.splice(0,1)
            pageButtons = [...pageButtons,lastPageButtonNumber+1]
            setVisibleButtons(pageButtons)
            }
        }
    }
    const onPrev = () => {
        let pageButtons = [...visibleButtons]
        const buttonsCount = Object.keys(pagesData).length
        const leastPageButtonNumber = (visibleButtons[0])
        if(currentPage > 1){
            setCurrentPage(currentPage-1)
             if(leastPageButtonNumber < buttonsCount && (pageButtons[0]) >= 0 && (currentPage) === (pageButtons[0])){
            pageButtons.splice(pageButtons.length-1,1)
            pageButtons = [leastPageButtonNumber-1, ...pageButtons,]
            setVisibleButtons(pageButtons)
            }
        }
    }
    return (
        <div className='pagination'>
            pagination
            {/* <div>
                {
                    Object.keys(pagesData).map((el, i) => <button key={el}
                        className={currentPage === i + 1 ? 'active-button' : 'inactive-button'}
                        onClick={() => { setCurrentPage(i + 1) }}
                    >                        
                    {el}
                    </button>)
                }
            </div> */}

            <div>
                <button onClick={onPrev}>{"<"}</button>
                {
                    visibleButtons.map((el, i) => <button key={el}
                        className={currentPage === el ? 'active-button' : 'inactive-button'}
                        onClick={() => { setCurrentPage(el) }}
                    >                        
                    {el}
                    </button>)
                }
                <button onClick={onNext}>{">"}</button>
            </div>
        </div>
    )
}

export default Pagination